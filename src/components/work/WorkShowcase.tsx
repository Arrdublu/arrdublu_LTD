'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Activity, Archive, Edit } from 'lucide-react';
import { caseStudies } from '@/lib/data';
import { PortfolioItem, getPortfolioItems, updatePortfolioItem } from '@/lib/portfolio-actions';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { PortfolioForm } from '@/components/admin/PortfolioForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ADMIN_EMAILS = ['arrdublu@gmail.com', 'hi@arrdublu.us'];

interface WorkShowcaseProps {
  initialItems?: PortfolioItem[];
}

export function WorkShowcase({ initialItems }: WorkShowcaseProps) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems || []);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!initialItems) {
      getPortfolioItems().then(fetched => {
        if (fetched && fetched.length > 0) {
          setItems(fetched);
        }
      });
    }
  }, [initialItems]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && ADMIN_EMAILS.includes(currentUser.email || '')) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleUpdate = async (data: Omit<PortfolioItem, 'id' | 'createdAt'>) => {
    if (!editingItem || !editingItem.id) return;
    setIsSaving(true);
    try {
      await updatePortfolioItem(editingItem.id, data);
      
      // Update local state items so the UI is updated instantly!
      const updatedList = items.map(item => 
        item.id === editingItem.id ? { ...item, ...data } : item
      );
      setItems(updatedList);
      
      setEditingItem(null);
      toast({ title: 'Success', description: 'Project details updated successfully.' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to update project data.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const displayItems = items.length > 0
    ? items.map(item => ({
        id: item.id || '',
        title: item.title,
        category: item.services[0] || 'Creative',
        image: item.imageUrl || 'https://picsum.photos/seed/placeholder/800/600',
        description: item.description,
        link: `/discover/case-studies/${item.id}`,
        status: item.status || 'Live',
        dataAiHint: 'case study'
      }))
    : caseStudies.map(study => ({
        id: study.id,
        title: study.title,
        category: study.category,
        image: study.image,
        description: study.description,
        link: study.link,
        status: study.status || 'Live',
        dataAiHint: study.dataAiHint
      }));

  if (displayItems.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      {/* Structured Edit Modal */}
      <Dialog open={editingItem !== null} onOpenChange={(open) => { if (!open) setEditingItem(null); }}>
        <DialogContent className="max-w-2xl bg-slate-950 border border-slate-800 text-white overflow-y-auto max-h-[90vh] p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold text-white">Edit Portfolio Item</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <PortfolioForm
              initialData={editingItem}
              onSubmit={handleUpdate}
              onCancel={() => setEditingItem(null)}
              isLoading={isSaving}
            />
          )}
        </DialogContent>
      </Dialog>

      {displayItems.map((project) => (
        <Card key={project.id} className="group overflow-hidden relative">
          <Link href={project.link}>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={project.dataAiHint}
                referrerPolicy="no-referrer"
              />
              
              {/* EDIT Button overlay for Admins */}
              {isAdmin && (
                <div className="absolute top-4 left-4 z-20">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const origItem = items.find(i => i.id === project.id);
                      if (origItem) setEditingItem(origItem);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[10px] uppercase tracking-wider font-semibold shadow-lg backdrop-blur-md transition-all border border-cyan-400"
                  >
                    <Edit className="w-3.5 h-3.5" /> EDIT PROJECT
                  </button>
                </div>
              )}

              {project.status && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge 
                    variant={project.status === 'Live' ? 'default' : 'secondary'}
                    className={`flex items-center gap-1.5 px-2.5 py-1 backdrop-blur-md font-mono text-[10px] uppercase tracking-wider ${project.status === 'Live' ? 'bg-cyan-500/80 text-white border-cyan-400' : 'bg-slate-900/80 text-slate-400 border-slate-700'}`}
                  >
                    {project.status === 'Live' ? (
                      <><Activity className="w-3 h-3" /> LIVE</>
                    ) : (
                      <><Archive className="w-3 h-3" /> ARCHIVED</>
                    )}
                  </Badge>
                </div>
              )}
            </div>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">{project.category}</Badge>
              <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex items-center text-sm font-semibold text-primary">
                View Project <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
