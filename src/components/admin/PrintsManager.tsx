'use client';

import { useState, useEffect } from 'react';
import { getPrints, addPrint, updatePrint, deletePrint, Print } from '@/lib/firebase/prints';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export function PrintsManager() {
  const [prints, setPrints] = useState<Print[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPrint, setCurrentPrint] = useState<Partial<Print>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchPrints = async () => {
    setIsLoading(true);
    const fetched = await getPrints();
    setPrints(fetched);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPrints();
  }, []);

  const handleSave = async () => {
    if (!currentPrint.name || !currentPrint.price || !currentPrint.image) {
        toast({
            title: "Validation Error",
            description: "Please fill in all required fields (Name, Price, Image URL)",
            variant: "destructive"
        });
        return;
    }

    setIsLoading(true);
    try {
      if (isEditing && currentPrint.id) {
        await updatePrint(currentPrint.id, currentPrint as Partial<Print>);
        toast({ title: "Print updated successfully" });
      } else {
        await addPrint(currentPrint as Omit<Print, 'id'>);
        toast({ title: "Print added successfully" });
      }
      setIsDialogOpen(false);
      fetchPrints();
    } catch (error) {
        console.error(error);
        toast({
            title: "Error saving print",
            description: "There was a problem saving your changes.",
            variant: "destructive"
        });
    } finally {
        setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this print?')) {
      setIsLoading(true);
      try {
        await deletePrint(id);
        toast({ title: "Print deleted successfully" });
        fetchPrints();
      } catch (error) {
        console.error(error);
        toast({
            title: "Error deleting print",
            description: "There was a problem deleting the print.",
            variant: "destructive"
        });
        setIsLoading(false);
      }
    }
  };

  const openNewDialog = () => {
    setIsEditing(false);
    setCurrentPrint({ name: '', price: 0, image: '', paymentLink: '' });
    setIsDialogOpen(true);
  };

  const openEditDialog = (print: Print) => {
    setIsEditing(true);
    setCurrentPrint(print);
    setIsDialogOpen(true);
  };

  if (isLoading && prints.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Manage Prints</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Print
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Print' : 'Add New Print'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={currentPrint.name || ''}
                  onChange={(e) => setCurrentPrint({ ...currentPrint, name: e.target.value })}
                  placeholder="e.g. Serenity Bridge"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price ($)</label>
                <Input
                  type="number"
                  value={currentPrint.price || ''}
                  onChange={(e) => setCurrentPrint({ ...currentPrint, price: parseFloat(e.target.value) })}
                  placeholder="e.g. 45.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={currentPrint.image || ''}
                  onChange={(e) => setCurrentPrint({ ...currentPrint, image: e.target.value })}
                  placeholder="https://firebasestorage..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prints.map((print) => (
          <Card key={print.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={print.image}
                alt={print.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{print.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-primary">${print.price?.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 bg-muted/50 p-4">
              <Button variant="outline" size="sm" onClick={() => openEditDialog(print)}>
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(print.id)}>
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
        {prints.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
            No prints found. Add one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
