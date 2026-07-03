'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  embedUrl: string;
  caption?: string;
  thumbnailUrl?: string;
}

export function VideoEmbed({ embedUrl, caption, thumbnailUrl }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Fallback thumbnail if none is provided
  const thumbnail = thumbnailUrl || "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-900 border border-slate-800">
        {!isPlaying ? (
          <div 
            className="absolute inset-0 cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <Image
              src={thumbnail}
              alt={caption || "Video thumbnail"}
              fill
              className="object-cover transition-opacity group-hover:opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-cyan-600/80 text-white p-4 rounded-full transition-transform transform group-hover:scale-110">
                <Play className="w-8 h-8 fill-current" />
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      {caption && (
        <p className="text-sm text-slate-400 italic">
          {caption}
        </p>
      )}
    </div>
  );
}
