
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Globe, Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Logo } from '@/components/layout/Logo';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/toaster';
import { useLanguage } from '@/context/LanguageProvider';

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { language, setLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    const langs: ('EN' | 'ES' | 'PAT')[] = ['EN', 'ES', 'PAT'];
    const currentIndex = langs.indexOf(language);
    setLanguage(langs[(currentIndex + 1) % langs.length]);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-[#020304]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo />
          </Link>
          
          <NavigationMenu className="hidden md:flex mx-auto">
            <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-slate-900 hover:text-white font-sans uppercase tracking-widest text-xs cursor-pointer font-medium", pathname === '/service' && "text-cyan-400 bg-slate-900")}>
                    <Link href="/service">Services</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-slate-900 hover:text-white font-sans uppercase tracking-widest text-xs cursor-pointer font-medium", pathname?.startsWith('/discover') && "text-cyan-400 bg-slate-900")}>
                    <Link href="/discover/case-studies">Selected Works</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-slate-900 hover:text-white font-sans uppercase tracking-widest text-xs cursor-pointer font-medium", pathname === '/shop' && "text-cyan-400 bg-slate-900")}>
                    <Link href="/shop">Shop</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-slate-900 hover:text-white font-sans uppercase tracking-widest text-xs cursor-pointer font-medium", pathname === '/about' && "text-cyan-400 bg-slate-900")}>
                    <Link href="/about">The Director</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
             <Link
               href="/search"
               className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-full font-sans text-xs text-slate-300 hover:text-white transition-all"
               aria-label="Search catalog"
             >
               <Search className="w-3.5 h-3.5 text-cyan-400" />
               <span className="text-[11px] uppercase tracking-wider font-medium">Search</span>
             </Link>

             <button
               onClick={handleLanguageToggle}
               className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-transparent rounded font-sans text-[10px] uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
               aria-label="Toggle language"
             >
               <Globe className="w-3 h-3" />
               {language}
             </button>
             <Link
               href="/contact"
               className="hidden md:inline-flex px-5 py-2.5 rounded-sm bg-white hover:bg-slate-200 font-sans text-xs text-slate-950 font-medium tracking-widest uppercase transition-all duration-300 cursor-pointer"
             >
               Inquire Now
             </Link>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-slate-900">
                  <Menu />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs border-l border-slate-900 bg-[#020304]/95 backdrop-blur p-6">
                <SheetHeader className="text-left mb-8">
                  <SheetTitle className="text-white font-sans uppercase tracking-widest text-xs font-medium">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 font-sans uppercase tracking-widest text-xs">
                     <div className="space-y-4">
                        <SheetClose asChild>
                            <Link href="/service" className="block text-slate-300 hover:text-white transition-colors">
                                Services
                            </Link>
                        </SheetClose>
                     </div>
                     <div className="h-px w-full bg-slate-900" />
                     <SheetClose asChild>
                         <Link href="/discover/case-studies" className="text-slate-300 hover:text-white transition-colors">
                             Selected Works
                         </Link>
                     </SheetClose>
                     <SheetClose asChild>
                         <Link href="/shop" className="text-slate-300 hover:text-white transition-colors">
                             Shop
                         </Link>
                     </SheetClose>
                     <SheetClose asChild>
                         <Link href="/search" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2">
                             <Search className="w-3.5 h-3.5" /> Search Catalog
                         </Link>
                     </SheetClose>
                     <SheetClose asChild>
                         <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                             The Director
                         </Link>
                     </SheetClose>
                     <SheetClose asChild>
                         <Link href="/contact" className="text-white font-medium hover:text-slate-300 transition-colors">
                             Inquire Now
                         </Link>
                     </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <Toaster />
    </>
  );
}

