'use client';

import { useState } from 'react';
import { PortfolioItem } from '@/lib/portfolio-actions';
import { Button } from '@/components/ui/button';
import { deletePortfolioItem, updatePortfolioItem, addPortfolioItem } from '@/lib/portfolio-actions';
import { PortfolioForm } from './PortfolioForm';
import { VideoEmbed } from '@/components/ui/video-embed';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit } from 'lucide-react';
import Image from 'next/image';

interface PortfolioListProps {
  initialItems: PortfolioItem[];
}

export function PortfolioList({ initialItems }: PortfolioListProps) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    
    setIsLoading(true);
    try {
      await deletePortfolioItem(id);
      setItems(items.filter((item) => item.id !== id));
      toast({ title: 'Success', description: 'Case study deleted.' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to delete case study.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: Omit<PortfolioItem, 'id' | 'createdAt'>) => {
    if (!editingId) return;
    setIsLoading(true);
    try {
      await updatePortfolioItem(editingId, data);
      setItems(items.map(item => item.id === editingId ? { ...item, ...data } : item));
      setEditingId(null);
      toast({ title: 'Success', description: 'Case study updated.' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to update case study.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (data: Omit<PortfolioItem, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      const result = await addPortfolioItem(data);
      if (result.success && result.id) {
        setItems([{ ...data, id: result.id }, ...items]);
        setIsAdding(false);
        toast({ title: 'Success', description: 'Case study added.' });
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to add case study.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!isAdding && !editingId && (
        <div className="flex justify-end">
          <Button onClick={() => setIsAdding(true)} className="bg-cyan-600 hover:bg-cyan-500 text-white">
            Add New Case Study
          </Button>
        </div>
      )}

      {isAdding && (
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Add New Case Study</h2>
          <PortfolioForm
            onSubmit={handleAdd}
            onCancel={() => setIsAdding(false)}
            isLoading={isLoading}
          />
        </div>
      )}

      {editingId && (
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Edit Case Study</h2>
          <PortfolioForm
            initialData={items.find(i => i.id === editingId)}
            onSubmit={handleUpdate}
            onCancel={() => setEditingId(null)}
            isLoading={isLoading}
          />
        </div>
      )}

      {!isAdding && !editingId && (
        <div className="grid gap-4">
          {items.length === 0 ? (
            <div className="p-8 text-center text-slate-400 bg-slate-900/30 border border-slate-800 rounded-lg">
              No case studies found. Click "Add New Case Study" to create one.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-6 p-4 bg-slate-900/30 border border-slate-800 rounded-lg items-center">
                {item.imageUrl && (
                  <div className="relative w-full md:w-48 h-32 flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className="flex-grow space-y-2">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-cyan-400">{item.client}</p>
                  <p className="text-sm text-slate-300 line-clamp-2">{item.description}</p>
                  {item.videoEmbed && (
                    <div className="mt-4">
                      <VideoEmbed 
                        embedUrl={item.videoEmbed} 
                        caption={item.videoCaption} 
                        thumbnailUrl={item.imageUrl}
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.services.map((service, idx) => (
                      <span key={idx} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row md:flex-col gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                    onClick={() => setEditingId(item.id!)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id!)}
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
