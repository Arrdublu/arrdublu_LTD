'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { Plus, Trash2, Image as ImageIcon, Loader2, Save } from 'lucide-react';
import Image from 'next/image';

interface SiteImage {
  id: string; // The key used in the site, e.g. "hero_background"
  url: string;
  description: string;
  updatedAt: string;
}

export default function WebsiteImageManager() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // New image form state
  const [newImageId, setNewImageId] = useState('');
  const [newImageDesc, setNewImageDesc] = useState('');
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'website_images'));
      const fetchedImages: SiteImage[] = [];
      querySnapshot.forEach((doc) => {
        fetchedImages.push({ id: doc.id, ...doc.data() } as SiteImage);
      });
      setImages(fetchedImages);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Failed to load website images.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            setNewImagePreview(dataUrl);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageId || !newImageFile || !newImagePreview) {
      setError("Please provide an Image Key and select a file.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const newImageData: SiteImage = {
        id: newImageId,
        url: newImagePreview,
        description: newImageDesc,
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'website_images', newImageId), newImageData);
      
      setImages(prev => {
        const exists = prev.findIndex(img => img.id === newImageId);
        if (exists >= 0) {
          const updated = [...prev];
          updated[exists] = newImageData;
          return updated;
        }
        return [...prev, newImageData];
      });

      // Reset form
      setNewImageId('');
      setNewImageDesc('');
      setNewImageFile(null);
      setNewImagePreview(null);
      
      // Reset file input value
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    if (!window.confirm(`Are you sure you want to delete the image key "${id}"?`)) return;

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'website_images', id));
      
      setImages(prev => prev.filter(img => img.id !== id));
    } catch (err) {
      console.error("Error deleting image:", err);
      setError("Failed to delete image.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-cyan-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight font-sans">Website Images Configuration</h2>
          <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider">Update global static imagery</p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-950/30 border border-red-500/30 rounded text-red-400 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider font-mono">Add / Update Image</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                  Image Key Identifier
                </label>
                <input
                  type="text"
                  required
                  value={newImageId}
                  onChange={(e) => setNewImageId(e.target.value)}
                  placeholder="e.g. The_Hands_On_Approach"
                  className="w-full px-3 py-2 bg-slate-950/50 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-[10px] text-slate-500 font-mono uppercase self-center">Quick Presets:</span>
                  <button
                    type="button"
                    onClick={() => { setNewImageId('The_Hands_On_Approach'); setNewImageDesc('Home Page - Founder Portrait (Ramone Wynter)'); }}
                    className="px-2 py-0.5 bg-slate-950 hover:bg-cyan-950/40 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/50 rounded text-[10px] text-slate-400 font-mono transition-all cursor-pointer"
                  >
                    The_Hands_On_Approach
                  </button>
                  <button
                    type="button"
                    onClick={() => { setNewImageId('about_director_image'); setNewImageDesc('About Page - Director Portrait (Ramone Wynter)'); }}
                    className="px-2 py-0.5 bg-slate-950 hover:bg-cyan-950/40 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/50 rounded text-[10px] text-slate-400 font-mono transition-all cursor-pointer"
                  >
                    about_director_image
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                  Description / Alt Text
                </label>
                <input
                  type="text"
                  value={newImageDesc}
                  onChange={(e) => setNewImageDesc(e.target.value)}
                  placeholder="Brief description of where this is used"
                  className="w-full px-3 py-2 bg-slate-950/50 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                  Upload Image File
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-cyan-950/30 file:text-cyan-400 hover:file:bg-cyan-950/50 font-mono"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center bg-slate-950/50 border border-slate-800 border-dashed rounded-lg p-2 min-h-[200px]">
              {newImagePreview ? (
                <div className="relative w-full h-full min-h-[180px]">
                  <Image
                    src={newImagePreview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="text-center text-slate-500">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-mono uppercase tracking-wider">No image selected</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving || !newImageFile || !newImageId}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-black font-semibold rounded text-xs flex items-center gap-2 transition-all disabled:opacity-50 uppercase tracking-wider font-mono"
            >
              {saving ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
              ) : (
                <><Save className="w-3.5 h-3.5" /> Save Image</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Existing Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden group">
            <div className="relative h-48 w-full bg-slate-950">
              <Image
                src={img.url}
                alt={img.description || img.id}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
              
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(img.id, img.url)}
                  className="p-1.5 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-red-400 rounded transition-colors"
                  title="Delete image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-mono text-cyan-400 text-sm font-semibold uppercase tracking-wider break-all" title={img.id}>
                  {img.id}
                </h4>
              </div>
              {img.description && (
                <p className="text-xs text-slate-400 font-sans line-clamp-2 mb-3 break-words">
                  {img.description}
                </p>
              )}
              <div className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">
                Updated: {new Date(img.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-lg">
            <ImageIcon className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p className="text-sm font-mono uppercase tracking-wider">No website images configured.</p>
          </div>
        )}
      </div>
    </div>
  );
}
