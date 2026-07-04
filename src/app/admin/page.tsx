
import { getDashboardData } from '@/lib/dashboard-actions';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Database } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  try {
    const dashboardData = await getDashboardData();

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Admin Dashboard</h1>
        </div>
        
        <div className="w-full">
          <DashboardCharts initialData={dashboardData} />
        </div>
      </div>
    );
  } catch (error: any) {
    console.error('Error rendering AdminPage:', error);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Admin Dashboard</h1>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-zinc-950 p-6 md:p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-lg mx-auto">
            <div className="rounded-full bg-red-500/10 p-3 text-red-500">
              <AlertCircle className="h-10 w-10" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Dashboard Initialization Error</h2>
              <p className="text-sm text-zinc-400">
                The application encountered an issue while retrieving real-time metrics and historical database charts.
              </p>
            </div>

            <Alert variant="destructive" className="border-red-500/30 bg-red-500/5 text-left text-red-400">
              <Database className="h-4 w-4" />
              <AlertTitle className="font-semibold text-white">Technical Details</AlertTitle>
              <AlertDescription className="mt-1 font-mono text-xs break-all text-red-300">
                {error?.message || String(error) || 'Unknown error: Database connection or query processing issue'}
              </AlertDescription>
            </Alert>

            <div className="pt-2 text-xs text-zinc-500">
              Please verify your Firebase environment configuration or check the database initialization exports.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
