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
    src: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_01.png?alt=media&token=7883a21a-472d-4876-8f36-391f17387431',
    dataAiHint: 'coastal landscape',
  },
  {
    id: 'free-video-1',
    type: 'video',
    title: 'City Night View',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_02.png?alt=media&token=f074a381-8742-498c-8519-7589d891636c',
    dataAiHint: 'city night',
  },
  {
    id: 'free-photo-2',
    type: 'photo',
    title: 'Forest Path',
    src: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
    dataAiHint: 'forest path',
  },
  {
    id: 'free-photo-3',
    type: 'photo',
    title: 'Abstract Texture',
    src: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
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
