'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Database,
  CreditCard,
  Mail,
  Server,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Info
} from 'lucide-react';
import { runSystemDiagnostics, type DiagnosticReport, type DiagnosticItem } from '@/lib/diagnostic-actions';

export function SystemDiagnosticCard() {
  const [report, setReport] = useState<DiagnosticReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchDiagnostics = async () => {
    setLoading(true);
    try {
      const result = await runSystemDiagnostics();
      setReport(result);
    } catch (err) {
      console.error('Failed to run diagnostics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  const getCategoryIcon = (category: DiagnosticItem['category']) => {
    switch (category) {
      case 'database':
        return <Database className="h-4 w-4 text-blue-400" />;
      case 'payments':
        return <CreditCard className="h-4 w-4 text-emerald-400" />;
      case 'email':
        return <Mail className="h-4 w-4 text-purple-400" />;
      case 'environment':
      default:
        return <Server className="h-4 w-4 text-amber-400" />;
    }
  };

  const getStatusBadge = (status: DiagnosticItem['status']) => {
    switch (status) {
      case 'operational':
        return (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 flex items-center gap-1 font-medium">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Operational
          </Badge>
        );
      case 'degraded':
        return (
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20 flex items-center gap-1 font-medium">
            <AlertTriangle className="h-3 w-3 text-amber-400" /> Degraded
          </Badge>
        );
      case 'not_configured':
        return (
          <Badge className="bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700 flex items-center gap-1 font-medium">
            <Info className="h-3 w-3 text-zinc-400" /> Unconfigured
          </Badge>
        );
      case 'error':
      default:
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 flex items-center gap-1 font-medium">
            <XCircle className="h-3 w-3 text-red-400" /> Error
          </Badge>
        );
    }
  };

  const getOverallBadge = (status: DiagnosticReport['overallStatus']) => {
    switch (status) {
      case 'healthy':
        return (
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
            All Systems Operational
          </Badge>
        );
      case 'degraded':
        return (
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
            Partially Degraded
          </Badge>
        );
      case 'unhealthy':
      default:
        return (
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
            Connection Action Required
          </Badge>
        );
    }
  };

  return (
    <Card className="border-zinc-800 bg-zinc-950 text-white shadow-xl overflow-hidden">
      <CardHeader className="border-b border-zinc-800/80 bg-zinc-900/40 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-400" />
              <CardTitle className="text-lg font-bold tracking-tight text-white">
                Backend System Diagnostics
              </CardTitle>
              {report && getOverallBadge(report.overallStatus)}
            </div>
            <CardDescription className="text-xs text-zinc-400">
              Real-time verification of Firestore Admin connection, database query latency, and service availability.
            </CardDescription>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchDiagnostics}
            disabled={loading}
            className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all text-xs h-8 self-start sm:self-auto gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            {loading ? 'Testing...' : 'Run Diagnostics'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-4">
        {loading && !report && (
          <div className="space-y-3 py-6">
            <div className="flex items-center justify-center gap-2 text-zinc-400 text-sm">
              <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
              <span>Verifying Firestore Admin DB and environment status...</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 rounded-lg bg-zinc-900/60 animate-pulse border border-zinc-800/50" />
              ))}
            </div>
          </div>
        )}

        {report && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {report.items.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-lg border transition-all p-3.5 ${
                      item.status === 'error'
                        ? 'border-red-500/30 bg-red-500/5'
                        : item.status === 'degraded'
                        ? 'border-amber-500/30 bg-amber-500/5'
                        : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-1.5 rounded-md bg-zinc-800/80 shrink-0">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-zinc-200 truncate">{item.name}</p>
                          <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{item.message}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {getStatusBadge(item.status)}
                        {item.details && (
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : item.id)}
                            className="p-1 text-zinc-400 hover:text-white transition-colors"
                            title="Toggle technical details"
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {item.latencyMs !== undefined && (
                      <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500 pt-1.5 border-t border-zinc-800/50">
                        <span>Response Time</span>
                        <span className="font-mono text-zinc-300">{item.latencyMs} ms</span>
                      </div>
                    )}

                    {isExpanded && item.details && (
                      <div className="mt-2.5 p-2 rounded bg-zinc-950/80 border border-zinc-800/80 font-mono text-[11px] text-zinc-300 overflow-x-auto">
                        <pre className="whitespace-pre-wrap leading-relaxed">
                          {JSON.stringify(item.details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px] text-zinc-500 border-t border-zinc-800/60">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Last verified: {new Date(report.timestamp).toLocaleTimeString()}</span>
              </div>
              <span className="font-mono text-zinc-400">Database ID: ai-studio-ea34...</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
