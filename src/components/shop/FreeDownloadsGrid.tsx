'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Download } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const freeMedia = [
  {
    id: 'free-photo-1',
    type: 'photo',
    title: 'Coastal Drone Shot',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    dataAiHint: 'coastal landscape',
  },
  {
    id: 'free-video-1',
    type: 'video',
    title: 'City Night View',
    thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800',
    dataAiHint: 'city night',
  },
  {
    id: 'free-photo-2',
    type: 'photo',
    title: 'Forest Path',
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
    dataAiHint: 'forest path',
  },
  {
    id: 'free-photo-3',
    type: 'photo',
    title: 'Abstract Texture',
    src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
    dataAiHint: 'abstract texture',
  }
];

export function FreeDownloadsGrid() {
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleLike = (id: string) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = (title: string) => {
    navigator.clipboard.writeText(`Check out this free media from Arrdublu: ${title}`);
    toast({
      title: 'Link Copied!',
      description: 'The share link has been copied to your clipboard.',
    });
  };
  
  const handleDownload = (src: string, title: string) => {
    window.open(src, '_blank');
    toast({
      title: 'Download Started',
      description: `Your download of "${title}" should begin shortly.`,
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {freeMedia.map((media) => (
        <Card key={media.id} className="group overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src={(media.type === 'photo' ? media.src : media.thumbnail) || ""}
              alt={media.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={media.dataAiHint}
            />
            {media.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Download className="h-12 w-12 text-white" />
              </div>
            )}
          </div>
          <CardContent className="p-4 flex justify-between items-center">
            <p className="font-semibold text-sm">{media.title}</p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => toggleLike(media.id)}>
                <Heart className={`h-5 w-5 ${likedItems.includes(media.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare(media.title)}>
                <Share2 className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDownload(media.src || '#', media.title)}>
                <Download className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
