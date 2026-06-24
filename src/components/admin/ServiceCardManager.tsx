'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const initialServices = [
  { id: 1, title: 'Virtual Production', description: 'Real-time immersive sets.', icon: 'monitor' },
  { id: 2, title: 'Creative Direction', description: 'Advanced brand strategy.', icon: 'palette' },
];

export function ServiceCardManager() {
  const [services, setServices] = useState(initialServices);

  return (
    <Card className="bg-slate-950/40 backdrop-blur shadow-xl border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-800">
        <CardTitle className="text-xl font-sans font-medium text-slate-100">Service Card Management</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white">
              <Plus className="h-4 w-4 mr-2" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map(service => (
            <div key={service.id} className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col gap-2">
              <h3 className="font-sans text-lg font-medium text-white">{service.title}</h3>
              <p className="font-sans text-sm text-slate-400">{service.description}</p>
              <div className="flex gap-2 mt-4 pt-2 border-t border-slate-800">
                <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                  <Edit2 className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="destructive" className="bg-red-900/40 text-red-300 hover:bg-red-900/60">
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
