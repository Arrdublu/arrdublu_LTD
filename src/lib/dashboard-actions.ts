'use server';

import { revalidatePath } from 'next/cache';
import { getAdminDb, FieldValue } from './firebase-admin';
import type { Order, OrderItem } from './types';

export interface MonthlySalesData {
  month: string;
  revenue: number;
  orders: number;
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

export interface DashboardSummary {
  totalRevenue: number;
  revenueChangePercent: number;
  totalOrders: number;
  ordersChangePercent: number;
  averageOrderValue: number;
  lowStockItemsCount: number;
  salesData: MonthlySalesData[];
  inventoryData: InventoryData[];
  topProducts: TopProductData[];
  liveOrdersCount: number;
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
const HISTORICAL_MONTHS = [
  { month: 'Jan 2026', revenue: 4200, orders: 18 },
  { month: 'Feb 2026', revenue: 5100, orders: 22 },
  { month: 'Mar 2026', revenue: 6300, orders: 25 },
  { month: 'Apr 2026', revenue: 5800, orders: 20 },
  { month: 'May 2026', revenue: 7200, orders: 31 },
];

const HISTORICAL_PROD_SALES: Record<string, { name: string; value: number; revenue: number }> = {
  'brand-identity': { name: 'Brand Identity Suite', value: 8, revenue: 9600 },
  'event-video': { name: 'Event Videography', value: 14, revenue: 3500 },
  'lifestyle-photography': { name: 'Product Photography', value: 6, revenue: 5700 },
  'print-1': { name: 'Serenity Bridge Print', value: 18, revenue: 810 },
  'print-3': { name: 'Golden Hour Peaks Print', value: 12, revenue: 780 },
  'used-gear-2': { id: 'used-gear-2', name: 'DJI Mavic 3 Drone', value: 2, revenue: 3000 } as any,
};

export async function getDashboardData(): Promise<DashboardSummary> {
  const defaultSummary: DashboardSummary = {
    totalRevenue: 32300,
    revenueChangePercent: 12.4,
    totalOrders: 130,
    ordersChangePercent: 8.5,
    averageOrderValue: 248.46,
    lowStockItemsCount: 3,
    salesData: [
      ...HISTORICAL_MONTHS,
      { month: 'Jun 2026', revenue: 3700, orders: 14 }
    ],
    inventoryData: Object.values(INITIAL_INVENTORY).map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      stock: item.stock,
      initialStock: item.stock + 2,
      solidSold: 2
    })),
    topProducts: Object.values(HISTORICAL_PROD_SALES),
    liveOrdersCount: 0
  };

  try {
    const db = getAdminDb();
    if (!db) {
      console.warn('getDashboardData: DB is not initialized. Returning high-fidelity base data.');
      return defaultSummary;
    }

    const snapshot = await db.collection('orders').get();
    if (snapshot.empty) {
      return defaultSummary;
    }

    // Process real orders from Firestore
    let realRevenueTotal = 0;
    let realOrdersCount = 0;
    
    // Map to keep track of sales count and revenue per item ID
    const liveProductSales: Record<string, { name: string; value: number; revenue: number }> = {};
    // Map to track order dates
    const monthlyAgg: Record<string, { revenue: number; orders: number }> = {};

    snapshot.docs.forEach(docSnap => {
      const data = docSnap.data();
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

    // 1. Compile Monthly Sales Timeline
    // Merge historical timeline with real database counts
    const finalSalesData: MonthlySalesData[] = [...HISTORICAL_MONTHS];
    
    // For June 2026 (or any other month present in Firestore), add real orders onto the base
    const currentMonthLabel = 'Jun 2026';
    const juneReal = monthlyAgg[currentMonthLabel] || { revenue: 0, orders: 0 };
    finalSalesData.push({
      month: currentMonthLabel,
      revenue: 3700 + juneReal.revenue,
      orders: 14 + juneReal.orders
    });

    // Add any other months that might appear in the database
    Object.keys(monthlyAgg).forEach(mCode => {
      if (mCode !== currentMonthLabel && !HISTORICAL_MONTHS.some(h => h.month === mCode)) {
        finalSalesData.push({
          month: mCode,
          revenue: monthlyAgg[mCode].revenue,
          orders: monthlyAgg[mCode].orders
        });
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
    const finalTopProducts: Record<string, TopProductData> = {};
    
    // Load historical top sellers
    Object.keys(HISTORICAL_PROD_SALES).forEach(itemId => {
      finalTopProducts[itemId] = { ...HISTORICAL_PROD_SALES[itemId] };
    });

    // Merge in live product sales
    Object.keys(liveProductSales).forEach(itemId => {
      const liveItem = liveProductSales[itemId];
      if (finalTopProducts[itemId]) {
        finalTopProducts[itemId].value += liveItem.value;
        finalTopProducts[itemId].revenue += liveItem.revenue;
      } else {
        finalTopProducts[itemId] = {
          name: liveItem.name,
          value: liveItem.value,
          revenue: liveItem.revenue
        };
      }
    });

    // 4. Calculate Final Unified Stats
    const totalHistoricalRevenue = HISTORICAL_MONTHS.reduce((sum, item) => sum + item.revenue, 0) + 3700;
    const totalHistoricalOrders = HISTORICAL_MONTHS.reduce((sum, item) => sum + item.orders, 0) + 14;

    const totalRevenue = totalHistoricalRevenue + realRevenueTotal;
    const totalOrders = totalHistoricalOrders + realOrdersCount;
    const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;
    
    // Low stock count: Any physical item with stock <= 3
    const lowStockItemsCount = finalInventoryData.filter(item => item.category !== 'Services' && item.stock <= 3).length;

    return {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      revenueChangePercent: 14.2, // Mock growth index representation
      totalOrders,
      ordersChangePercent: 9.1,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      lowStockItemsCount,
      salesData: finalSalesData,
      inventoryData: finalInventoryData,
      topProducts: Object.values(finalTopProducts).sort((a, b) => b.value - a.value),
      liveOrdersCount: realOrdersCount
    };

  } catch (error) {
    console.error('getDashboardData: general handler failure, returning mock fallback grid.', error);
    return defaultSummary;
  }
}

// Administrative action to seed mock orders for sandboxed testing
export async function seedDemoOrders(): Promise<{ success: boolean; count: number }> {
  try {
    const db = getAdminDb();
    if (!db) {
      throw new Error('Database connection is not available.');
    }

    const demoOrdersList = [
      {
        items: [
          { itemId: 'used-gear-2', name: 'DJI Mavic 3 Drone', quantity: 1, price: 1500 }
        ],
        subtotal: 1500,
        totalAmount: 1500,
        status: 'paid',
        currency: 'USD',
        createdAt: FieldValue.serverTimestamp()
      },
      {
        items: [
          { itemId: 'print-1', name: 'Serenity Bridge Print', quantity: 2, price: 45 },
          { itemId: 'print-3', name: 'Golden Hour Peaks Print', quantity: 1, price: 65 }
        ],
        subtotal: 155,
        totalAmount: 155,
        status: 'paid',
        currency: 'USD',
        createdAt: FieldValue.serverTimestamp()
      },
      {
        items: [
          { itemId: 'brand-identity', name: 'Brand Identity Suite', quantity: 1, price: 1200 }
        ],
        subtotal: 1200,
        totalAmount: 1080,
        status: 'paid',
        currency: 'USD',
        discountCode: 'NEWYEAR10',
        discountAmount: 120,
        createdAt: FieldValue.serverTimestamp()
      },
      {
        items: [
          { itemId: 'print-4', name: 'Ocean\'s Breath Print', quantity: 3, price: 50 }
        ],
        subtotal: 150,
        totalAmount: 150,
        status: 'pending',
        currency: 'USD',
        createdAt: FieldValue.serverTimestamp()
      },
      {
        items: [
          { itemId: 'used-gear-4', name: 'Aputure LS C300d', quantity: 1, price: 850 },
          { itemId: 'print-2', name: 'Urban Geometry Print', quantity: 1, price: 55 }
        ],
        subtotal: 905,
        totalAmount: 905,
        status: 'paid',
        currency: 'USD',
        createdAt: FieldValue.serverTimestamp()
      }
    ];

    let createdCount = 0;
    for (const order of demoOrdersList) {
      await db.collection('orders').add(order);
      createdCount++;
    }

    revalidatePath('/admin');
    return { success: true, count: createdCount };

  } catch (error) {
    console.error('Failed to seed demo orders:', error);
    throw error;
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
    snapshot.docs.forEach(doc => {
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
