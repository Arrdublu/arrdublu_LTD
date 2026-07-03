
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Terminal, Globe } from 'lucide-react';

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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/toaster';
import { useLanguage } from '@/context/LanguageProvider';

import { CurrencySwitcher } from '@/components/layout/CurrencySwitcher';

const serviceItems: { title: string; href: string; description: string }[] = [
    {
        title: "Holographic Production",
        href: '/service/holographic-production',
        description: 'Immersive WebGL and cinematic reality engineering.',
    },
    {
        title: 'Cognitive SEO',
        href: '/service/cognitive-seo',
        description: 'Algorithmic dominance and advanced search structures.',
    },
    {
        title: 'Luxury Identity',
        href: '/service/luxury-identity',
        description: 'Elite brand curation and storytelling.',
    },
    {
        title: 'Virtual Production',
        href: '/service/virtual-production',
        description: 'Unreal Engine 5 and curved LED stages.',
    },
]

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { language, setLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    const langs: ('EN' | 'ES' | 'PAT')[] = ['EN', 'ES', 'PAT'];
    const currentIndex = langs.indexOf(language);
    setLanguage(langs[(currentIndex + 1) % langs.length]);
  };

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-cyan-950/40 hover:text-cyan-400 focus:bg-cyan-950/40 focus:text-cyan-400",
              className
            )}
            {...props}
          >
            <div className="text-sm font-mono tracking-wider font-semibold leading-none">{title}</div>
            <p className="line-clamp-2 text-xs leading-snug text-slate-400 mt-2 font-sans">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  })
  ListItem.displayName = "ListItem"

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-cyan-500/10 bg-[#020304]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-1 rounded bg-slate-950/60 border border-cyan-400/20 shadow-[0_0_10px_rgba(0,240,255,0.05)] group-hover:border-cyan-400/50 transition-colors">
              <span className="font-mono text-sm font-black tracking-tighter text-cyan-400">AA</span>
            </div>
            <div>
              <h1 className="text-sm font-sans font-medium tracking-[0.18em] uppercase text-slate-100">ARRDUBLU</h1>
              <p className="text-[9px] font-mono text-cyan-400/70 tracking-wider font-semibold uppercase leading-none">Creative Agency</p>
            </div>
          </Link>
          
          <NavigationMenu className="hidden md:flex mx-auto">
            <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-cyan-950/30 hover:text-cyan-400 data-[state=open]:bg-cyan-950/30 data-[state=open]:text-cyan-400 font-mono uppercase tracking-wider text-xs">Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#020304] border border-cyan-500/20 rounded-xl">
                        {serviceItems.map((component) => (
                        <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                        >
                            {component.description}
                        </ListItem>
                        ))}
                    </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-cyan-950/30 hover:text-cyan-400 font-mono uppercase tracking-wider text-xs cursor-pointer")}>
                    <Link href="/discover/case-studies">Portfolio</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-cyan-950/30 hover:text-cyan-400 font-mono uppercase tracking-wider text-xs cursor-pointer")}>
                      <Link href="/contact">Contact</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
             <button
               onClick={handleLanguageToggle}
               className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-slate-950/80 border border-slate-900 rounded font-mono text-[10px] text-slate-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
               aria-label="Toggle language"
             >
               <Globe className="w-3 h-3" />
               {language}
             </button>
             <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-950/80 border border-slate-900 rounded font-mono text-[10px] text-slate-500">
               <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
               SYS_ONLINE
             </div>
             <Link
               href="/contact"
               className="hidden md:inline-flex px-4 py-2 rounded border border-cyan-400/30 hover:border-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/40 font-mono text-xs text-cyan-400 tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.05)] cursor-pointer"
             >
               Start Project
             </Link>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-cyan-400 hover:bg-cyan-950/30">
                  <Menu />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs border-l border-cyan-500/20 bg-[#020304]/95 backdrop-blur p-6">
                <SheetHeader className="text-left mb-8">
                  <SheetTitle className="text-cyan-400 font-mono uppercase tracking-widest text-xs flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> System Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 font-mono uppercase tracking-wider text-sm">
                     <div className="space-y-4">
                        <p className="text-[10px] text-slate-500 mb-2">SERVICES</p>
                        {serviceItems.map((item) => (
                           <SheetClose asChild key={item.href}>
                                <Link
                                   href={item.href}
                                   className="block text-slate-300 hover:text-cyan-400 transition-colors"
                               >
                                   {item.title}
                               </Link>
                           </SheetClose>
                       ))}
                     </div>
                     <div className="h-px w-full bg-cyan-500/10" />
                     <SheetClose asChild>
                         <Link href="/discover/case-studies" className="text-slate-300 hover:text-cyan-400 transition-colors">
                             Portfolio
                         </Link>
                     </SheetClose>
                     <SheetClose asChild>
                         <Link href="/contact" className="text-slate-300 hover:text-cyan-400 transition-colors">
                             Contact Engineering
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
