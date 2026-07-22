'use server';

import { revalidatePath } from 'next/cache';
import { getAdminDb, FieldValue } from './firebase-admin';
import type { Order, OrderItem } from './types';

export interface MonthlySalesData {
  month: string;
  revenue: number;
  orders: number;
}

export interface DailySalesData {
  date: string;
  revenue: number;
}

export interface InventoryData {
  id: string;
  name: string;
  category: string;
  stock: number;
  initialStock: number;
  solidSold: number;
}

export interface TopProductData {
  name: string;
  value: number; // number sold
  revenue: number;
}

export interface SearchTrend {
  query: string;
  count: number;
  resultsCount: number;
  resultsFound: boolean;
}

export interface DashboardSummary {
  totalRevenue: number;
  revenueChangePercent: number;
  totalOrders: number;
  ordersChangePercent: number;
  averageOrderValue: number;
  lowStockItemsCount: number;
  salesData: MonthlySalesData[];
  dailySales30Days: DailySalesData[];
  inventoryData: InventoryData[];
  topProducts: TopProductData[];
  liveOrdersCount: number;
  searchTrends: SearchTrend[];
}

// Initial stock settings for item types
const INITIAL_INVENTORY: Record<string, { id: string; name: string; category: string; stock: number }> = {
  'used-gear-1': { id: 'used-gear-1', name: 'Canon EOS R5', category: 'Used Equipment', stock: 1 },
  'used-gear-2': { id: 'used-gear-2', name: 'DJI Mavic 3 Drone', category: 'Used Equipment', stock: 2 },
  'used-gear-3': { id: 'used-gear-3', name: 'Sony FE 24-70 f/2.8', category: 'Used Equipment', stock: 1 },
  'used-gear-4': { id: 'used-gear-4', name: 'Aputure LS C300d', category: 'Used Equipment', stock: 3 },
  'print-1': { id: 'print-1', name: 'Serenity Bridge', category: 'Prints', stock: 45 },
  'print-2': { id: 'print-2', name: 'Urban Geometry', category: 'Prints', stock: 24 },
  'print-3': { id: 'print-3', name: 'Golden Hour Peaks', category: 'Prints', stock: 12 },
  'print-4': { id: 'print-4', name: 'Ocean\'s Breath', category: 'Prints', stock: 30 },
};

// Base historical statistics leading up to June 2026
const HISTORICAL_MONTHS: MonthlySalesData[] = [];

const HISTORICAL_PROD_SALES: Record<string, { name: string; value: number; revenue: number }> = {};

const BASELINE_SEARCH_TRENDS: SearchTrend[] = [];

export async function getDashboardData(): Promise<DashboardSummary> {
  const defaultSummary: DashboardSummary = {
    totalRevenue: 0,
    revenueChangePercent: 0,
    totalOrders: 0,
    ordersChangePercent: 0,
    averageOrderValue: 0,
    lowStockItemsCount: Object.values(INITIAL_INVENTORY).filter(item => item.stock <= 3).length,
    salesData: [],
    dailySales30Days: [],
    inventoryData: Object.values(INITIAL_INVENTORY).map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      stock: item.stock,
      initialStock: item.stock,
      solidSold: 0
    })),
    topProducts: [],
    liveOrdersCount: 0,
    searchTrends: []
  };

  try {
    const db = getAdminDb();
    if (!db) {
      console.warn('getDashboardData: DB is not initialized. Returning zeroed base data.');
      return defaultSummary;
    }

    // Try to fetch real search logs for trends
    let finalSearchTrends: SearchTrend[] = [];
    try {
      const searchLogsSnapshot = await db.collection('search_logs').get();
      if (!searchLogsSnapshot.empty) {
        const queryCounts: Record<string, { count: number; resultsCount: number; resultsFound: boolean }> = {};
        searchLogsSnapshot.docs.forEach((docSnap: any) => {
          const d = docSnap.data() as any;
          const q = (d.query || '').toLowerCase().trim();
          if (!q) return;
          if (!queryCounts[q]) {
            queryCounts[q] = { count: 0, resultsCount: Number(d.resultsCount) || 0, resultsFound: !!d.resultsFound };
          }
          queryCounts[q].count += 1;
        });

        const realTrends = Object.entries(queryCounts).map(([query, info]) => ({
          query,
          count: info.count,
          resultsCount: info.resultsCount,
          resultsFound: info.resultsFound,
        })).sort((a, b) => b.count - a.count);

        if (realTrends.length > 0) {
          finalSearchTrends = realTrends;
        }
      }
    } catch (err) {
      console.error('Error fetching search logs in getDashboardData:', err);
    }

    const snapshot = await db.collection('orders').get();
    if (snapshot.empty) {
      return {
        ...defaultSummary,
        searchTrends: finalSearchTrends
      };
    }

    // Process real orders from Firestore
    let realRevenueTotal = 0;
    let realOrdersCount = 0;
    
    // Map to keep track of sales count and revenue per item ID
    const liveProductSales: Record<string, { name: string; value: number; revenue: number }> = {};
    // Map to track order dates
    const monthlyAgg: Record<string, { revenue: number; orders: number }> = {};

    snapshot.docs.forEach((docSnap: any) => {
      const data = docSnap.data() as any;
      const status = data.status || 'pending';
      const items = data.items || [];
      const totalAmount = Number(data.totalAmount) || 0;
      
      // We process both 'paid' and 'pending' configurations for dashboard statistics
      const isCountable = status === 'paid' || status === 'pending';
      if (!isCountable) return;

      realOrdersCount++;
      realRevenueTotal += totalAmount;

      // Extract month label from createdAt
      let monthLabel = 'Jun 2026';
      if (data.createdAt) {
        try {
          // data.createdAt can be a Timestamp
          const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          monthLabel = `${months[date.getMonth()]} ${date.getFullYear()}`;
        } catch (e) {
          // ignore date parsing errors, default to current sandbox month
        }
      }

      if (!monthlyAgg[monthLabel]) {
        monthlyAgg[monthLabel] = { revenue: 0, orders: 0 };
      }
      monthlyAgg[monthLabel].revenue += totalAmount;
      monthlyAgg[monthLabel].orders += 1;

      // Aggregate product totals
      items.forEach((item: any) => {
        const itemId = item.itemId || 'unknown';
        const name = item.name || 'Unknown Product';
        const qty = Number(item.quantity) || 1;
        const price = Number(item.price) || 0;
        const subtotal = qty * price;

        if (!liveProductSales[itemId]) {
          liveProductSales[itemId] = { name, value: 0, revenue: 0 };
        }
        liveProductSales[itemId].value += qty;
        liveProductSales[itemId].revenue += subtotal;
      });
    });

    // New: Calculate Daily Sales for last 30 days
    const dailyAgg: Record<string, number> = {};
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    
    for (let i = 0; i <= 30; i++) {
        const d = new Date(thirtyDaysAgo);
        d.setDate(thirtyDaysAgo.getDate() + i);
        dailyAgg[d.toISOString().split('T')[0]] = 0;
    }

    snapshot.docs.forEach((docSnap: any) => {
        const data = docSnap.data() as any;
        const status = data.status || 'pending';
        const totalAmount = Number(data.totalAmount) || 0;
        const isCountable = status === 'paid' || status === 'pending';
        if (!isCountable) return;
        
        const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
        const dateStr = date.toISOString().split('T')[0];
        
        if (dailyAgg.hasOwnProperty(dateStr)) {
            dailyAgg[dateStr] += totalAmount;
        }
    });

    const finalDailySalesData: DailySalesData[] = Object.entries(dailyAgg).map(([date, revenue]) => ({ date, revenue }));

    // 1. Compile Monthly Sales Timeline purely from Firestore
    const finalSalesData: MonthlySalesData[] = Object.entries(monthlyAgg).map(([month, info]) => ({
      month,
      revenue: info.revenue,
      orders: info.orders
    })).sort((a, b) => {
      try {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA.getTime() - dateB.getTime();
      } catch {
        return 0;
      }
    });

    // 2. Adjust Inventory Stock levels based on products successfully sold
    const finalInventoryData: InventoryData[] = Object.keys(INITIAL_INVENTORY).map(itemId => {
      const baseItem = INITIAL_INVENTORY[itemId];
      const liveSales = liveProductSales[itemId]?.value || 0;
      
      // Stock goes down, sales go up
      // Set lower-bound of stock to 0 to prevent negative stock numbers
      const currentStock = Math.max(0, baseItem.stock - liveSales);
      
      return {
        id: itemId,
        name: baseItem.name,
        category: baseItem.category,
        stock: currentStock,
        initialStock: baseItem.stock,
        solidSold: liveSales
      };
    });

    // 3. Aggregate Top Selling Products
    const finalTopProducts: TopProductData[] = Object.values(liveProductSales).map(item => ({
      name: item.name,
      value: item.value,
      revenue: item.revenue
    }));

    // 4. Calculate Final Unified Stats
    const totalRevenue = realRevenueTotal;
    const totalOrders = realOrdersCount;
    const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;
    
    // Low stock count: Any physical item with stock <= 3
    const lowStockItemsCount = finalInventoryData.filter(item => item.category !== 'Services' && item.stock <= 3).length;

    return {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      revenueChangePercent: 0,
      totalOrders,
      ordersChangePercent: 0,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      lowStockItemsCount,
      salesData: finalSalesData,
      dailySales30Days: finalDailySalesData,
      inventoryData: finalInventoryData,
      topProducts: finalTopProducts.sort((a, b) => b.value - a.value),
      liveOrdersCount: realOrdersCount,
      searchTrends: finalSearchTrends
    };

  } catch (error) {
    console.error('getDashboardData: general handler failure, returning zeroed fallback grid.', error);
    return defaultSummary;
  }
}


// Administrative action to clear all orders in the Database (useful helper for resetting demo states)
export async function clearDemoOrders(): Promise<{ success: boolean }> {
  try {
    const db = getAdminDb();
    if (!db) {
      throw new Error('Database connection is not available.');
    }

    const snapshot = await db.collection('orders').get();
    const batch = db.batch();
    snapshot.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    revalidatePath('/admin');
    return { success: true };

  } catch (error) {
    console.error('Failed to clear demo orders:', error);
    throw error;
  }
}
