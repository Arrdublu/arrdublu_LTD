'use client';

import React, { useState, useEffect } from 'react';
import { HeroSlide, getHeroSlides, addHeroSlide, updateHeroSlide, deleteHeroSlide } from '@/lib/firebase/hero-slides';
import { Loader2, Plus, Edit2, Trash2, GripVertical, Check, X } from 'lucide-react';

export default function HeroSlideManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<HeroSlide>>({});

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    const fetched = await getHeroSlides();
    setSlides(fetched);
    setLoading(false);
  };

  const handleEdit = (slide: HeroSlide) => {
    setIsEditing(slide.id);
    setEditForm(slide);
  };

  const handleSave = async () => {
    if (isEditing && editForm) {
      if (isEditing === 'new') {
        const newSlide: Omit<HeroSlide, 'id'> = {
          title: editForm.title || '',
          subtitle: editForm.subtitle || '',
          description: editForm.description || '',
          videoUrlMobile: editForm.videoUrlMobile || '',
          videoUrlDesktop: editForm.videoUrlDesktop || '',
          backgroundImage: editForm.backgroundImage || '',
          order: slides.length,
        };
        await addHeroSlide(newSlide);
      } else {
        await updateHeroSlide(isEditing, editForm);
      }
      setIsEditing(null);
      setEditForm({});
      fetchSlides();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      await deleteHeroSlide(id);
      fetchSlides();
    }
  };

  const handleAdd = () => {
    if (slides.length >= 3) {
      alert('You can only have up to 3 hero slides.');
      return;
    }
    setIsEditing('new');
    setEditForm({
      title: '',
      subtitle: '',
      description: '',
      videoUrlMobile: '',
      videoUrlDesktop: '',
      backgroundImage: '',
    });
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-cyan-400" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Hero Slides ({slides.length}/3)</h2>
        <button
          onClick={handleAdd}
          disabled={slides.length >= 3 || isEditing !== null}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Slide
        </button>
      </div>

      <div className="space-y-4">
        {slides.map(slide => (
          <div key={slide.id} className="bg-slate-900 border border-slate-800 rounded p-4">
            {isEditing === slide.id ? (
              <SlideForm form={editForm} setForm={setEditForm} onSave={handleSave} onCancel={() => setIsEditing(null)} />
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{slide.subtitle}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{slide.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{slide.description}</p>
                  <div className="text-xs text-slate-500 flex flex-col gap-1">
                    {slide.videoUrlDesktop && <span className="truncate w-[300px]" title={slide.videoUrlDesktop}>Desktop: {slide.videoUrlDesktop}</span>}
                    {slide.videoUrlMobile && <span className="truncate w-[300px]" title={slide.videoUrlMobile}>Mobile: {slide.videoUrlMobile}</span>}
                    {slide.backgroundImage && <span className="truncate w-[300px]" title={slide.backgroundImage}>Background Image: {slide.backgroundImage}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(slide)} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(slide.id)} className="p-2 text-red-400 hover:text-red-300 bg-red-900/30 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
        {isEditing === 'new' && (
          <div className="bg-slate-900 border border-slate-800 rounded p-4">
            <h3 className="text-white font-medium mb-4">New Slide</h3>
            <SlideForm form={editForm} setForm={setEditForm} onSave={handleSave} onCancel={() => setIsEditing(null)} />
          </div>
        )}
      </div>
    </div>
  );
}

function SlideForm({ form, setForm, onSave, onCancel }: { form: Partial<HeroSlide>, setForm: any, onSave: () => void, onCancel: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Subtitle (e.g. Kingston, Jamaica)</label>
          <input type="text" value={form.subtitle || ''} onChange={e => setForm({...form, subtitle: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white text-sm focus:border-cyan-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Title</label>
          <input type="text" value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white text-sm focus:border-cyan-500 outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-slate-400 mb-1">Description</label>
        <textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white text-sm h-24 focus:border-cyan-500 outline-none" />
      </div>
      <div>
        <label className="block text-xs text-slate-400 mb-1">Background Image URL (used if videos aren't loaded or as fallback)</label>
        <input type="text" value={form.backgroundImage || ''} onChange={e => setForm({...form, backgroundImage: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white text-sm focus:border-cyan-500 outline-none" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Desktop Video URL</label>
          <input type="text" value={form.videoUrlDesktop || ''} onChange={e => setForm({...form, videoUrlDesktop: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white text-sm focus:border-cyan-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Mobile Video URL</label>
          <input type="text" value={form.videoUrlMobile || ''} onChange={e => setForm({...form, videoUrlMobile: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white text-sm focus:border-cyan-500 outline-none" />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={onCancel} className="px-4 py-2 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><X className="w-4 h-4" /> Cancel</button>
        <button onClick={onSave} className="px-4 py-2 flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors"><Check className="w-4 h-4" /> Save</button>
      </div>
    </div>
  );
}
