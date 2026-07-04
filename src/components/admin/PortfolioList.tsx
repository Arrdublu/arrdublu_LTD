'use client';

import { useState } from 'react';
import { PortfolioItem } from '@/lib/portfolio-actions';
import { Button } from '@/components/ui/button';
import { 
  deletePortfolioItem, 
  updatePortfolioItem, 
  addPortfolioItem, 
  updatePortfolioOrders, 
  setInlineEditMode 
} from '@/lib/portfolio-actions';
import { PortfolioForm } from './PortfolioForm';
import { VideoEmbed } from '@/components/ui/video-embed';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, ChevronUp, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PortfolioListProps {
  initialItems: PortfolioItem[];
  initialInlineEditMode?: boolean;
}

export function PortfolioList({ initialItems, initialInlineEditMode }: PortfolioListProps) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [inlineEditMode, setInlineEditModeState] = useState(initialInlineEditMode || false);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleToggleInlineEdit = async (checked: boolean) => {
    setInlineEditModeState(checked);
    try {
      const result = await setInlineEditMode(checked);
      if (result.success) {
        toast({
          title: 'Success',
          description: `Case study inline editing ${checked ? 'enabled' : 'disabled'}.`
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update inline editing mode.',
          variant: 'destructive'
        });
        setInlineEditModeState(!checked);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to update inline editing mode.',
        variant: 'destructive'
      });
      setInlineEditModeState(!checked);
    }
  };

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
      const nextSortOrder = items.length;
      const dataWithSort = { ...data, sortOrder: nextSortOrder };
      const result = await addPortfolioItem(dataWithSort);
      if (result.success && result.id) {
        setItems([...items, { ...dataWithSort, id: result.id }]);
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

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    
    const reordered = newItems.map((item, idx) => ({ ...item, sortOrder: idx }));
    setItems(reordered);
    await saveNewOrder(reordered);
  };

  const handleMoveDown = async (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    
    const reordered = newItems.map((item, idx) => ({ ...item, sortOrder: idx }));
    setItems(reordered);
    await saveNewOrder(reordered);
  };

  const saveNewOrder = async (orderedList: PortfolioItem[]) => {
    setIsLoading(true);
    try {
      const ids = orderedList.map(item => item.id).filter(Boolean) as string[];
      await updatePortfolioOrders(ids);
      toast({ title: 'Success', description: 'New order saved.' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to save new order.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Inline Edit Mode Toggle Switch */}
      <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Case Study Inline Edit Mode</h3>
          <p className="text-xs text-slate-400 mt-1">
            When enabled, authenticated administrators can edit text fields directly on individual case study pages and save on blur.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono font-medium ${inlineEditMode ? 'text-cyan-400' : 'text-slate-500'}`}>
            {inlineEditMode ? 'ENABLED' : 'DISABLED'}
          </span>
          <button
            type="button"
            onClick={() => handleToggleInlineEdit(!inlineEditMode)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${inlineEditMode ? 'bg-cyan-500' : 'bg-slate-700'}`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${inlineEditMode ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </div>
      </div>

      {!isAdding && (
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

      {/* Structured Edit Modal */}
      <Dialog open={editingId !== null} onOpenChange={(open) => { if (!open) setEditingId(null); }}>
        <DialogContent className="max-w-2xl bg-slate-950 border border-slate-800 text-white overflow-y-auto max-h-[90vh] p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold text-white">Edit Case Study</DialogTitle>
          </DialogHeader>
          <PortfolioForm
            initialData={items.find(i => i.id === editingId)}
            onSubmit={handleUpdate}
            onCancel={() => setEditingId(null)}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      {!isAdding && (
        <div className="grid gap-4">
          {items.length === 0 ? (
            <div className="p-8 text-center text-slate-400 bg-slate-900/30 border border-slate-800 rounded-lg">
              No case studies found. Click "Add New Case Study" to create one.
            </div>
          ) : (
            items.map((item, index) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-6 p-4 bg-slate-900/30 border border-slate-800 rounded-lg items-center">
                {/* Rearrange Controls */}
                <div className="flex flex-row md:flex-col gap-1 flex-shrink-0 items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 pb-2 md:pb-0 md:pr-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20"
                    disabled={index === 0 || isLoading}
                    onClick={() => handleMoveUp(index)}
                    title="Move Up"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </Button>
                  <span className="font-mono text-xs text-slate-500 select-none px-2 py-1">
                    {index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20"
                    disabled={index === items.length - 1 || isLoading}
                    onClick={() => handleMoveDown(index)}
                    title="Move Down"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </Button>
                </div>

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
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <span 
                      className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-mono border ${item.status === 'Live' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
                    >
                      {item.status || 'Live'}
                    </span>
                  </div>
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
