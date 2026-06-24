
'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { FooterLogo } from './FooterLogo';

// Store social media links and developer info in constants for easier updates
const SOCIAL_MEDIA_LINKS = {
  instagram: 'https://www.instagram.com/arrdublu',
  facebook: 'https://www.facebook.com/arrdublu',
  twitter: 'https://twitter.com/arrdublu',
  linkedin: 'https://www.linkedin.com/company/arrdublu',
  youtube: 'https://www.youtube.com/@arrdublu',
  vimeo: 'https://vimeo.com/arrdublu',
};

const DEVELOPER_INFO = {
  name: 'Ramone C. Wynter',
  linkedin: 'https://www.linkedin.com/in/ramone-wynter-a783053b/',
};

const VimeoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M14.53 3.11a4.5 4.5 0 0 1-2.9 5.42c-1.32.65-2.31.56-3-.41-.5-.73.23-1.68 1.2-2.35C10.73 5.11 11 5 11 5s-2.92 2.6-4.5 4.54A5.5 5.5 0 0 0 8.7 13c.43 1.9 2.5 2.4 4.14 1.42a4.2 4.2 0 0 0 2.4-3.81c.14-2.52-1.35-4.2-3.44-4.95-1.5-.55-2.58.1-2.58.1s2.12-2.32 4.25-2.54a3.2 3.2 0 0 1 1.08.24Z" />
    </svg>
);


const Footer = () => {
  return (
    <footer className="bg-muted/50 py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-foreground/80">
          <div>
            <div className="mb-4">
              <FooterLogo />
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-foreground">Legal</h3>
            <ul>
              <li className="mb-2 hover:text-primary transition-colors">
                <Link href="/privacy-policy">Privacy Policy & Opt-Out</Link>
              </li>
              <li className="mb-2 hover:text-primary transition-colors">
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>
              <li className="mb-2 hover:text-primary transition-colors">
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
              </li>
              <li className="mb-2 hover:text-primary transition-colors">
                <Link href="/terms-arrdublu-rig-agent">
                  Terms & Conditions for ARRDUBLU™ Rig/agent (the “Rig/Agent”)
                </Link>
              </li>
              <li className="mb-2 hover:text-primary transition-colors">
                <Link href="/cookie-policy">Cookie Policy</Link>
              </li>
              <li className="mb-2 hover:text-primary transition-colors">
                <Link href="/modern-slavery-act">Modern Slavery Act Statement</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-foreground">Support</h3>
            <ul>
              <li className="mb-2 hover:text-primary transition-colors">
                <Link href="/faq">FAQ</Link>
              </li>
              <li className="mb-2 hover:text-primary transition-colors">
                <Link href="/contact">Contact</Link>
              </li>
              <li className="mb-2 hover:text-primary transition-colors">
                <Link href="/careers">Career</Link>
              </li>
               <li className="mb-2 hover:text-primary transition-colors">
                <Link href="/donation">Donation</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-foreground">Follow Us [@arrdublu]</h3>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_MEDIA_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href={SOCIAL_MEDIA_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href={SOCIAL_MEDIA_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href={SOCIAL_MEDIA_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={SOCIAL_MEDIA_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={24} />
              </a>
              <a
                href={SOCIAL_MEDIA_LINKS.vimeo}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Vimeo"
              >
                <VimeoIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-foreground/60">
          <p>© {new Date().getFullYear()} Arrdublu. All rights reserved.</p>
          <p>
            Developed by{' '}
            <a
              href={DEVELOPER_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              {DEVELOPER_INFO.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer as SiteFooter };
