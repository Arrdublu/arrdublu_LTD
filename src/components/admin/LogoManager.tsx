'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Link as LinkIcon, Image as ImageIcon, Save, AlertCircle } from 'lucide-react';
import { getClientLogos, addClientLogo, updateClientLogo, deleteClientLogo, ClientLogo } from '@/lib/logo-actions';
import Image from 'next/image';

export function LogoManager() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [newLogo, setNewLogo] = useState({ name: '', imageUrl: '', link: '', order: 0 });

  const fetchLogos = async () => {
    try {
      setLoading(true);
      const data = await getClientLogos();
      setLogos(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch logos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleAdd = async () => {
    if (!newLogo.name || !newLogo.imageUrl) {
      setError('Name and Image URL are required.');
      return;
    }
    try {
      setError(null);
      const order = logos.length > 0 ? Math.max(...logos.map(l => l.order)) + 1 : 0;
      const added = await addClientLogo({ ...newLogo, order });
      setLogos([...logos, added]);
      setIsAdding(false);
      setNewLogo({ name: '', imageUrl: '', link: '', order: 0 });
    } catch (err: any) {
      setError(err.message || 'Failed to add logo');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this logo?')) {
      try {
        setError(null);
        await deleteClientLogo(id);
        setLogos(logos.filter(l => l.id !== id));
      } catch (err: any) {
        setError(err.message || 'Failed to delete logo');
      }
    }
  };

  const handleUpdate = async (id: string, field: keyof ClientLogo, value: string) => {
    try {
      setError(null);
      // Optimistic update
      setLogos(logos.map(l => l.id === id ? { ...l, [field]: value } : l));
      await updateClientLogo(id, { [field]: value });
    } catch (err: any) {
      setError(err.message || 'Failed to update logo');
      fetchLogos(); // Revert on failure
    }
  };

  if (loading) {
    return <div className="text-slate-400 font-mono text-sm animate-pulse">Loading logos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-sans font-semibold text-white">Client Logos</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded text-sm font-bold font-mono tracking-wider transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {isAdding ? 'Cancel' : 'Add Logo'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-950/50 border border-red-500/50 rounded flex items-center gap-3 text-red-200">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {isAdding && (
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700/50 space-y-4">
          <h3 className="text-lg font-medium text-slate-200 mb-4">Add New Logo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase">Brand Name</label>
              <input
                type="text"
                value={newLogo.name}
                onChange={e => setNewLogo({ ...newLogo, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm text-slate-200 focus:border-cyan-500/50 outline-none"
                placeholder="e.g. Acme Corp"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase">Image URL</label>
              <input
                type="text"
                value={newLogo.imageUrl}
                onChange={e => setNewLogo({ ...newLogo, imageUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm text-slate-200 focus:border-cyan-500/50 outline-none"
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-mono text-slate-400 uppercase">External Link (Optional)</label>
              <input
                type="text"
                value={newLogo.link}
                onChange={e => setNewLogo({ ...newLogo, link: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm text-slate-200 focus:border-cyan-500/50 outline-none"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleAdd}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2 rounded text-sm font-bold font-mono tracking-wider transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Logo
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {logos.length === 0 && !isAdding ? (
          <div className="text-center p-8 bg-slate-900/30 border border-slate-800 rounded-lg text-slate-400 font-mono text-sm">
            No logos found. Add some to display them on the homepage.
          </div>
        ) : (
          logos.map((logo) => (
            <div key={logo.id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-16 relative bg-slate-950 rounded border border-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                {logo.imageUrl ? (
                  <Image src={logo.imageUrl} alt={logo.name} fill referrerPolicy="no-referrer" className="object-contain p-2" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-700" />
                )}
              </div>
              
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">Brand Name</label>
                  <input
                    type="text"
                    value={logo.name}
                    onChange={e => handleUpdate(logo.id, 'name', e.target.value)}
                    className="w-full bg-slate-950/50 border border-transparent hover:border-slate-800 focus:border-cyan-500/50 rounded px-2 py-1 text-sm text-slate-200 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" /> Image URL
                  </label>
                  <input
                    type="text"
                    value={logo.imageUrl}
                    onChange={e => handleUpdate(logo.id, 'imageUrl', e.target.value)}
                    className="w-full bg-slate-950/50 border border-transparent hover:border-slate-800 focus:border-cyan-500/50 rounded px-2 py-1 text-sm text-slate-200 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                    <LinkIcon className="w-3 h-3" /> Link (Optional)
                  </label>
                  <input
                    type="text"
                    value={logo.link || ''}
                    onChange={e => handleUpdate(logo.id, 'link', e.target.value)}
                    className="w-full bg-slate-950/50 border border-transparent hover:border-slate-800 focus:border-cyan-500/50 rounded px-2 py-1 text-sm text-slate-200 outline-none transition-colors"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex-shrink-0 self-start md:self-center">
                <button
                  onClick={() => handleDelete(logo.id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/30 rounded transition-colors"
                  title="Delete Logo"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
