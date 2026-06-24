
import { getDashboardData } from '@/lib/dashboard-actions';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { ServiceCardManager } from '@/components/admin/ServiceCardManager';
import { ProductManager } from '@/components/admin/ProductManager';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const dashboardData = await getDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Admin Dashboard</h1>
      </div>
      
      <div className="w-full">
        <DashboardCharts initialData={dashboardData} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ServiceCardManager />
        <ProductManager />
      </div>
    </div>
  );
}
