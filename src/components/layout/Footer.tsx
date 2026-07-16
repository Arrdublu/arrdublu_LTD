
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
    <footer className="bg-[#020304] border-t border-slate-900 py-16 text-slate-400 font-sans font-light text-sm">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="mb-6">
              <FooterLogo />
            </div>
            <p className="text-slate-500 mb-6 max-w-xs">
              A boutique creative studio engineering elite digital experiences and cinematic production.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-6 uppercase tracking-widest text-xs">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/modern-slavery-act" className="hover:text-white transition-colors">Modern Slavery Act</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-6 uppercase tracking-widest text-xs">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-6 uppercase tracking-widest text-xs">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_MEDIA_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SOCIAL_MEDIA_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={SOCIAL_MEDIA_LINKS.vimeo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="Vimeo"
              >
                <VimeoIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-slate-900 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Arrdublu. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Director-Led Studio by{' '}
            <a
              href={DEVELOPER_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
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
