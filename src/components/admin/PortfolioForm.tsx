'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PortfolioItem } from '@/lib/portfolio-actions';

interface PortfolioFormProps {
  initialData?: PortfolioItem;
  onSubmit: (data: Omit<PortfolioItem, 'id' | 'createdAt'>) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function PortfolioForm({ initialData, onSubmit, onCancel, isLoading }: PortfolioFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [client, setClient] = useState(initialData?.client || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [videoEmbed, setVideoEmbed] = useState(initialData?.videoEmbed || '');
  const [videoCaption, setVideoCaption] = useState(initialData?.videoCaption || '');
  const [services, setServices] = useState(initialData?.services?.join(', ') || '');
  const [status, setStatus] = useState<'Live' | 'Archived'>(initialData?.status || 'Live');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const servicesArray = services.split(',').map(s => s.trim()).filter(s => s);
    await onSubmit({
      title,
      client,
      description,
      imageUrl,
      videoEmbed,
      videoCaption,
      services: servicesArray,
      status,
    });
    if (!initialData) {
      setTitle('');
      setClient('');
      setDescription('');
      setImageUrl('');
      setVideoEmbed('');
      setVideoCaption('');
      setServices('');
      setStatus('Live');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Project Title</label>
        <input
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-100"
          placeholder="e.g. Neon Genesis Production"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Client Name</label>
        <input
          required
          type="text"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-100"
          placeholder="e.g. Acme Corp"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Description</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-100 min-h-[100px]"
          placeholder="Brief description of the project..."
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Image URL</label>
        <input
          required
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-100"
          placeholder="https://images.unsplash.com/photo-..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Video Link / Embed URL</label>
        <input
          type="text"
          value={videoEmbed}
          onChange={(e) => setVideoEmbed(e.target.value)}
          className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-100"
          placeholder="e.g. https://www.instagram.com/p/.../embed"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Video Caption</label>
        <input
          type="text"
          value={videoCaption}
          onChange={(e) => setVideoCaption(e.target.value)}
          className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-100"
          placeholder="Brief context or technical description..."
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Services (Comma separated)</label>
        <input
          type="text"
          value={services}
          onChange={(e) => setServices(e.target.value)}
          className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-100"
          placeholder="e.g. Virtual Production, CGI, Lighting"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Live' | 'Archived')}
          className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-100 cursor-pointer"
        >
          <option value="Live">Live</option>
          <option value="Archived">Archived</option>
        </select>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading} className="border-slate-700 text-slate-300">
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white">
          {isLoading ? 'Saving...' : initialData ? 'Update Case Study' : 'Add Case Study'}
        </Button>
      </div>
    </form>
  );
}
