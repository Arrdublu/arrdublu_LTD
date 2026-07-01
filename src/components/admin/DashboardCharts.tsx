'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCurrency } from '@/context/CurrencyProvider';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Package,
  Layers,
  ArrowUpRight,
  Search,
} from 'lucide-react';
import {
  seedDemoOrders,
  clearDemoOrders,
  getDashboardData,
  type DashboardSummary,
  type MonthlySalesData,
  type InventoryData,
  type TopProductData,
  type SearchTrend,
} from '@/lib/dashboard-actions';

interface DashboardChartsProps {
  initialData: DashboardSummary;
}

// Chart color configurations
const COLORS = [
  '#0f172a', // deep slate (primary)
  '#2563eb', // royal blue
  '#10b981', // emerald green
  '#f59e0b', // amber yellow
  '#ec4899', // rose pink
  '#8b5cf6', // violet
];

export function DashboardCharts({ initialData }: DashboardChartsProps) {
  const [data, setData] = useState<DashboardSummary>(initialData);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getFormattedPrice } = useCurrency();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSeedDemo = async () => {
    try {
      setLoading(true);
      const res = await seedDemoOrders();
      if (res.success) {
        toast({
          title: 'Success!',
          description: `Successfully seeded ${res.count} mock sales and updated the dashboard.`,
        });
        // Fetch fresh parsed stats
        const freshData = await getDashboardData();
        setData(freshData);
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Something went wrong while seeding.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearDemo = async () => {
    try {
      setLoading(true);
      const res = await clearDemoOrders();
      if (res.success) {
        toast({
          title: 'Database Reset',
          description: 'Cleared all orders. Dashboard is now displaying default high-fidelity baseline metrics.',
        });
        const freshData = await getDashboardData();
        setData(freshData);
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Something went wrong while clearing.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="space-y-6">
        {/* KPI Skeleton Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32 mb-1" />
                <Skeleton className="h-3 w-40" />
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Charts Skeleton Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[320px] w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header and Seeds Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Executive Dashboard Overview</h2>
          <p className="text-sm text-muted-foreground">
            Analyze business performance, verify stock levels, and coordinate services.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-dashed"
            disabled={loading}
            onClick={handleClearDemo}
            id="btn-clear-demo"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-2" />
            Reset Orders
          </Button>
          <Button
            size="sm"
            className="bg-slate-900 hover:bg-slate-800 text-white"
            disabled={loading}
            onClick={handleSeedDemo}
            id="btn-seed-demo"
          >
            <Sparkles className="h-3.5 w-3.5 mr-2" />
            Seed Demo Sales
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <div className="p-2 bg-slate-100 rounded-md dark:bg-slate-800">
                <DollarSign className="h-4 w-4 text-slate-800 dark:text-slate-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">
                {getFormattedPrice(data.totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-emerald-600 font-semibold flex items-center">
                  +{data.revenueChangePercent}%
                </span>
                since last semester
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 2: Sales Number */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              <div className="p-2 bg-slate-100 rounded-md dark:bg-slate-800">
                <ShoppingBag className="h-4 w-4 text-slate-800 dark:text-slate-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">
                {data.totalOrders}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-emerald-600 font-semibold">
                  +{data.ordersChangePercent}%
                </span>
                organic month-over-month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 3: AOV */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Order Value</CardTitle>
              <div className="p-2 bg-slate-100 rounded-md dark:bg-slate-800">
                <TrendingUp className="h-4 w-4 text-slate-800 dark:text-slate-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">
                {getFormattedPrice(data.averageOrderValue)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Highly premium brand value profile
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 4: Low Stock warning */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card className={`shadow-sm transition-all duration-300 ${data.lowStockItemsCount > 0 ? 'border-amber-200 bg-amber-50/20' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Inventory</CardTitle>
              <div className={`p-2 rounded-md ${data.lowStockItemsCount > 0 ? 'bg-amber-100' : 'bg-slate-100 dark:bg-slate-800'}`}>
                <AlertTriangle className={`h-4 w-4 ${data.lowStockItemsCount > 0 ? 'text-amber-600' : 'text-slate-500'}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold tracking-tight ${data.lowStockItemsCount > 0 ? 'text-amber-800' : ''}`}>
                {data.lowStockItemsCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {data.lowStockItemsCount > 0 ? 'Critical items require restocking' : 'All warehouse stock levels optimal'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Visualization Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Monthly Sales Performance (Composed Chart) */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="h-full shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between pb-4">
              <div>
                <CardTitle className="text-base font-semibold">Monthly Sales Trend</CardTitle>
                <CardDescription>
                  Visualization of client revenue (USD) and completed invoice volumes.
                </CardDescription>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                Timeline Track
              </Badge>
            </CardHeader>
            <CardContent className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={data.salesData}
                  margin={{ top: 10, right: 10, bottom: 0, left: -10 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} className="stroke-slate-200 dark:stroke-slate-800" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                    className="fill-slate-500 font-sans"
                  />
                  <YAxis
                    yAxisId="left"
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    className="fill-slate-500"
                    tickFormatter={(val) => `$${val}`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    className="fill-slate-500"
                    tickFormatter={(val) => `${val} ord`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.96)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                    }}
                    formatter={(value: any, name: any) => {
                      if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Monthly Income'];
                      return [`${value} Sales`, 'Invoices'];
                    }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    name="revenue"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="orders"
                    name="orders"
                    fill="#0f172a"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top-Selling Products Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="h-full shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Top-Selling Products</CardTitle>
              <CardDescription>
                Breakdown of items ranked by order quantity to date.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-0 h-[260px]">
              <div className="w-full h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.topProducts.slice(0, 5)}
                      cx="50%"
                      cy="48%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                      nameKey="name"
                    >
                      {data.topProducts.slice(0, 5).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        fontSize: '11px',
                      }}
                      formatter={(value: any, name: any, props: any) => {
                        return [`${value} sold ($${props.payload.revenue.toLocaleString()})`, name];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Visual Accent in the Donut center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                    {data.topProducts.slice(0, 5).reduce((sum, item) => sum + item.value, 0)}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    Units Sold
                  </span>
                </div>
              </div>
            </CardContent>
            {/* Custom List Legend */}
            <CardFooter className="flex-col gap-1.5 items-stretch p-4 pt-0 border-t bg-muted/20 text-xs">
              <div className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                Top Products Key
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {data.topProducts.slice(0, 4).map((item, index) => (
                  <div key={item.name} className="flex items-center gap-1.5 truncate">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="truncate text-muted-foreground">{item.name}</span>
                    <span className="font-medium shrink-0 ml-auto font-mono text-[11px]">({item.value})</span>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Inventory Levels & Stock Alert Health Monitor */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold">Inventory Level Checker</CardTitle>
              <CardDescription>
                Physical and rental stock tracking. Automatically decreases with each paid customer invoice.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                Physical Catalog
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Split layout: Bar chart + Detailed interactive grid */}
            <div className="grid gap-6 md:grid-cols-5 items-stretch">
              <div className="md:col-span-3 h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.inventoryData}
                    layout="vertical"
                    margin={{ top: 0, right: 20, bottom: 0, left: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.2} />
                    <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} className="fill-slate-500" />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                      className="fill-slate-700 dark:fill-slate-300 font-sans font-medium"
                      width={100}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '11px',
                      }}
                      formatter={(val, name, props: any) => {
                        return [`${val} Units Remaining (Sold: ${props.payload.solidSold})`, 'Stock Level'];
                      }}
                    />
                    <Bar
                      dataKey="stock"
                      name="Units Remaining"
                      radius={[0, 4, 4, 0]}
                      maxBarSize={20}
                    >
                      {data.inventoryData.map((entry, index) => {
                        // Color condition based on stock level limit
                        let barColor = '#475569'; // Slate deep
                        if (entry.stock === 0) {
                          barColor = '#ef4444'; // Bright Red
                        } else if (entry.stock <= 3) {
                          barColor = '#f59e0b'; // Alarm Orange
                        } else if (entry.stock >= 20) {
                          barColor = '#10b981'; // Emerald Healthy
                        }
                        return <Cell key={`cell-${index}`} fill={barColor} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Grid lists with fine control */}
              <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col justify-between bg-muted/10">
                <div className="p-3 border-b bg-muted/30 font-semibold text-xs text-muted-foreground flex items-center justify-between">
                  <span>Stock Alerts & Details</span>
                  <span className="font-normal font-mono text-[10px]">Real-Time Sync</span>
                </div>
                <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[220px]">
                  {data.inventoryData.map((item) => {
                    const isLow = item.stock <= 3;
                    const isOut = item.stock === 0;
                    return (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <div className="space-y-0.5 truncate pr-2">
                          <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-2shrink-0">
                          {isOut ? (
                            <Badge className="bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-400">
                              SOLD OUT
                            </Badge>
                          ) : isLow ? (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-400">
                              LOW ({item.stock})
                            </Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" variant="outline">
                              Healthy ({item.stock})
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-3 border-t bg-muted/40 text-[10px] text-muted-foreground flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> Out of stock
                    <span className="w-2 h-2 rounded-full bg-amber-500 ml-1" /> Low Stock
                    <span className="w-2 h-2 rounded-full bg-emerald-500 ml-1" /> Healthy
                  </div>
                  {data.liveOrdersCount > 0 && (
                    <span className="font-medium text-emerald-700 dark:text-emerald-400">
                      Syncing {data.liveOrdersCount} Active DB transactions!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search Query Trends & User Interest Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold">Search Query Trend Tracker</CardTitle>
              <CardDescription>
                Auditing customer search intent, query frequency, and fulfillment success.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Search className="h-3 w-3 text-cyan-500" />
                Query Intent Analytics
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {data.searchTrends && data.searchTrends.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {data.searchTrends.slice(0, 8).map((trend, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-muted/5 hover:bg-muted/15 transition-all duration-200 flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 truncate pr-2">
                        <p className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                          "{trend.query}"
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase font-mono">
                          {trend.resultsCount} catalog match{trend.resultsCount === 1 ? '' : 'es'}
                        </p>
                      </div>
                      <Badge className={`font-mono text-[10px] uppercase shrink-0 ${
                        trend.count >= 10 
                          ? 'bg-blue-100 text-blue-800 border-blue-200' 
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`} variant="outline">
                        {trend.count} search{trend.count === 1 ? '' : 'es'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-muted-foreground">Fulfillment Status:</span>
                      {trend.resultsFound ? (
                        <span className="text-emerald-500 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> MATCHED
                        </span>
                      ) : (
                        <span className="text-amber-500 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> DEMAND_UNMET
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm font-sans">
                No search queries registered yet. Searches on the public service finder will appear here in real-time.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
