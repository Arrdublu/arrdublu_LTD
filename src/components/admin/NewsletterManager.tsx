'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Download } from 'lucide-react';
import { format } from 'date-fns';

interface Subscriber {
  id: string;
  email: string;
  status: string;
  createdAt: string | null;
}

export default function NewsletterManager({ initialSubscribers }: { initialSubscribers: Subscriber[] }) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);

  const handleExport = () => {
    const csvContent = [
      ['Email', 'Status', 'Date Subscribed'].join(','),
      ...subscribers.map(sub => [
        sub.email,
        sub.status,
        sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className="bg-slate-950 border-slate-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Mail className="w-6 h-6 text-cyan-400" />
            Newsletter Subscribers
          </CardTitle>
          <CardDescription className="text-slate-400">
            View and export your mailing list subscribers.
          </CardDescription>
        </div>
        <Button onClick={handleExport} variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="rounded-md border border-slate-800">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-300">
              <tr>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-slate-800/50 hover:bg-slate-900/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{subscriber.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {subscriber.createdAt ? format(new Date(subscriber.createdAt), 'MMM d, yyyy h:mm a') : 'Unknown'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
