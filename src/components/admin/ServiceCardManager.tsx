'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getServices, updateServiceCardImages, resetServiceCardImages } from '@/lib/service-actions';
import type { Service } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Edit2, Image as ImageIcon, Plus, Trash2, RotateCcw, Check, RefreshCw, Eye, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const PRESET_IMAGES = [
  { label: 'Studio Production 1', url: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_06.jpg?alt=media&token=b317a006-5cfb-4591-83fb-6f0a2f61f80b' },
  { label: 'Studio Production 2', url: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9' },
  { label: 'Waterfront Aesthetic', url: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4' },
];

export function ServiceCardManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [coverImage, setCoverImage] = useState<string>('');
  const [previews, setPreviews] = useState<string[]>([]);
  const [newPreviewUrl, setNewPreviewUrl] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchServicesData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.error('Error loading services:', err);
      toast({
        title: 'Error',
        description: 'Failed to load service cards.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchServicesData();
  }, [fetchServicesData]);

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setCoverImage(service.image || '');
    setPreviews(service.previews && service.previews.length > 0 ? service.previews : [service.image]);
    setNewPreviewUrl('');
  };

  const handleAddPreview = (urlToAdd?: string) => {
    const targetUrl = (urlToAdd || newPreviewUrl).trim();
    if (!targetUrl) return;
    if (previews.includes(targetUrl)) {
      toast({ title: 'Notice', description: 'Image URL is already in preview list.' });
      return;
    }
    setPreviews([...previews, targetUrl]);
    if (!urlToAdd) setNewPreviewUrl('');
  };

  const handleRemovePreview = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
  };

  const handleSave = async () => {
    if (!editingService) return;
    if (!coverImage.trim()) {
      toast({ title: 'Validation Error', description: 'Cover image URL cannot be empty.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const finalPreviews = previews.length > 0 ? previews : [coverImage];
      const result = await updateServiceCardImages(editingService.id, {
        image: coverImage.trim(),
        previews: finalPreviews,
      });

      if (result.success) {
        toast({
          title: 'Service Card Updated',
          description: `Successfully updated preview images for "${editingService.name}".`,
        });
        setEditingService(null);
        await fetchServicesData();
      } else {
        toast({
          title: 'Update Failed',
          description: result.error || 'Failed to update service card.',
          variant: 'destructive',
        });
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err?.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async (serviceId: string, serviceName: string) => {
    setResetting(serviceId);
    try {
      const result = await resetServiceCardImages(serviceId);
      if (result.success) {
        toast({
          title: 'Reset Completed',
          description: `Reset "${serviceName}" images to default.`,
        });
        await fetchServicesData();
      } else {
        toast({
          title: 'Reset Failed',
          description: result.error || 'Could not reset service card.',
          variant: 'destructive',
        });
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err?.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setResetting(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-950/60 border-slate-800 text-slate-100 shadow-xl backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <CardTitle className="text-xl font-sans font-medium text-white flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-cyan-400" /> Service Card Image Manager
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs mt-1">
              Update cover images and gallery previews for services displayed across the main catalog and search results.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchServicesData}
            disabled={loading}
            className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-cyan-400" /> Loading service cards...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-950 border border-slate-800">
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-600 text-xs">No Cover Image</div>
                      )}
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-slate-950/80 text-cyan-300 border border-cyan-900/40 backdrop-blur-sm text-[10px] font-sans">
                          {service.category}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-sans text-base font-semibold text-white">{service.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{service.description}</p>
                    </div>

                    {/* Previews Strip */}
                    <div>
                      <p className="text-[10px] font-sans uppercase tracking-widest text-slate-500 mb-1.5 flex items-center gap-1">
                        Preview Images ({service.previews?.length || 1})
                      </p>
                      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                        {(service.previews && service.previews.length > 0 ? service.previews : [service.image]).map((imgUrl, i) => (
                          <div key={i} className="relative h-10 w-12 flex-shrink-0 rounded border border-slate-800 overflow-hidden bg-slate-950">
                            <Image src={imgUrl} alt={`Preview ${i + 1}`} fill className="object-cover" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleOpenEdit(service)}
                      className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-sans text-xs"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" /> Edit Images
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReset(service.id, service.name)}
                      disabled={resetting === service.id}
                      className="border-slate-700 bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
                      title="Reset to default images"
                    >
                      <RotateCcw className={`h-3.5 w-3.5 ${resetting === service.id ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Image Modal */}
      <Dialog open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
        <DialogContent className="max-w-2xl bg-slate-950 border-slate-800 text-slate-100 p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-sans font-medium text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              Edit Images: {editingService?.name}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400">
              Update the primary cover image and list of preview gallery thumbnails for this service card.
            </DialogDescription>
          </DialogHeader>

          {editingService && (
            <div className="space-y-6 my-2">
              {/* Cover Image Input */}
              <div className="space-y-2">
                <Label className="text-xs text-slate-300 font-sans uppercase tracking-wider">Primary Cover Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://..."
                    className="bg-slate-900 border-slate-800 text-xs text-white placeholder:text-slate-600 focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Preset Image Options */}
              <div className="space-y-2">
                <Label className="text-[11px] text-slate-400 font-sans">Quick Presets</Label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <Button
                      key={idx}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCoverImage(preset.url);
                        handleAddPreview(preset.url);
                      }}
                      className="border-slate-800 bg-slate-900 text-[11px] text-slate-300 hover:text-cyan-400 hover:border-cyan-800"
                    >
                      <Plus className="h-3 w-3 mr-1" /> {preset.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Previews List */}
              <div className="space-y-3">
                <Label className="text-xs text-slate-300 font-sans uppercase tracking-wider flex items-center justify-between">
                  <span>Gallery Preview Images ({previews.length})</span>
                </Label>

                <div className="flex gap-2">
                  <Input
                    value={newPreviewUrl}
                    onChange={(e) => setNewPreviewUrl(e.target.value)}
                    placeholder="Add preview image URL..."
                    className="bg-slate-900 border-slate-800 text-xs text-white placeholder:text-slate-600 focus:border-cyan-500"
                  />
                  <Button
                    type="button"
                    onClick={() => handleAddPreview()}
                    size="sm"
                    className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-sans"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add
                  </Button>
                </div>

                {/* Preview Cards */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-48 overflow-y-auto p-1 bg-slate-900/40 rounded-lg border border-slate-800">
                  {previews.map((url, index) => (
                    <div key={index} className="relative group rounded-md border border-slate-800 overflow-hidden bg-slate-950 aspect-video">
                      <Image src={url} alt={`Preview ${index}`} fill className="object-cover" referrerPolicy="no-referrer" />
                      <button
                        type="button"
                        onClick={() => handleRemovePreview(index)}
                        className="absolute top-1 right-1 bg-red-950/90 text-red-400 hover:text-red-200 hover:bg-red-900 p-1 rounded backdrop-blur transition-opacity"
                        title="Remove image"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                      {url === coverImage && (
                        <span className="absolute bottom-1 left-1 bg-cyan-950/90 text-cyan-300 border border-cyan-800/80 text-[9px] px-1 rounded font-sans">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Card Preview Box */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="text-xs font-sans uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-cyan-400" /> Live Card Preview
                </div>
                <div className="flex gap-4 items-center">
                  <div className="relative h-20 w-32 rounded-lg border border-slate-800 overflow-hidden bg-slate-950 flex-shrink-0">
                    {coverImage ? (
                      <Image src={coverImage} alt="Preview" fill className="object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="h-full flex items-center justify-center text-[10px] text-slate-600">No Image</div>
                    )}
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-white">{editingService.name}</p>
                    <p className="text-slate-400">${editingService.price} / {editingService.unit || 'project'}</p>
                    <p className="text-[11px] text-cyan-400 font-medium">{previews.length} Gallery Preview Images Attached</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0 pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingService(null)}
              className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white text-xs"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-sans text-xs"
            >
              {saving ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5 mr-1.5" /> Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
