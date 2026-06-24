
'use client';

import { Twitter, Facebook, Linkedin, Instagram, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SocialShareProps {
  url: string;
  title: string;
  image?: string;
  layout?: 'default' | 'compact';
}

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width="16"
    height="16"
    {...props}
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.988-5.367 11.988-11.987C24.005 5.367 18.637 0 12.017 0z" />
  </svg>
);

export function SocialShare({ url, title, image, layout = 'default' }: SocialShareProps) {
  const fullUrl = `https://arrdublu.us${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedImage = image ? encodeURIComponent(image) : '';

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`,
    instagram: 'https://www.instagram.com/arrdublu',
  };

  if (layout === 'compact') {
    return (
      <TooltipProvider>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-3.5 w-3.5" />
                  <span className="sr-only">X</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share on X</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-3.5 w-3.5" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share on Facebook</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer">
                  <PinterestIcon />
                  <span className="sr-only">Pinterest</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Pin it</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Share2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold text-muted-foreground">Amplify this project:</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="icon" asChild title="Share on X">
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Share on X</span>
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild title="Share on Facebook">
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Share on Facebook</span>
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild title="Share on LinkedIn">
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">Share on LinkedIn</span>
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild title="Pin this">
          <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer">
            <PinterestIcon />
            <span className="sr-only">Share on Pinterest</span>
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild title="Follow us on Instagram">
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
