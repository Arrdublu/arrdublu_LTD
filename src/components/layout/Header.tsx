
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Globe } from 'lucide-react';

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

const serviceItems: { title: string; href: string; description: string }[] = [
    {
        title: "Cinematic Production",
        href: '/service/cinematic-production',
        description: 'High-end commercial video and photography.',
    },
    {
        title: 'Virtual Production',
        href: '/service/virtual-production',
        description: 'Unreal Engine 5 and curved LED stages.',
    },
    {
        title: 'Luxury Identity',
        href: '/service/luxury-identity',
        description: 'Elite brand curation and storytelling.',
    },
    {
        title: 'Cognitive SEO',
        href: '/service/cognitive-seo',
        description: 'Search architecture for premium brands.',
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
              "block select-none space-y-1.5 rounded-sm p-4 leading-none no-underline outline-none transition-colors bg-slate-900/40 hover:bg-slate-900/80 focus:bg-slate-900/80",
              className
            )}
            {...props}
          >
            <div className="text-sm font-sans tracking-wide font-medium leading-tight text-white">{title}</div>
            <p className="line-clamp-2 text-xs leading-relaxed text-slate-400 font-sans font-light mt-1">
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
      <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-[#020304]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-1.5 rounded-sm bg-white group-hover:bg-slate-200 transition-colors">
              <span className="font-sans text-sm font-bold tracking-tighter text-slate-950">AA</span>
            </div>
            <div>
              <h1 className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-slate-100">ARRDUBLU</h1>
              <p className="text-[9px] font-sans text-slate-400 tracking-[0.1em] uppercase leading-none mt-1">Director-Led Studio</p>
            </div>
          </Link>
          
          <NavigationMenu className="hidden md:flex mx-auto">
            <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-slate-900 hover:text-white data-[state=open]:bg-slate-900 data-[state=open]:text-white font-sans uppercase tracking-widest text-xs font-medium">Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#020304] border border-slate-800 rounded-sm">
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
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-slate-900 hover:text-white font-sans uppercase tracking-widest text-xs cursor-pointer font-medium")}>
                    <Link href="/discover/case-studies">Selected Works</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-slate-900 hover:text-white font-sans uppercase tracking-widest text-xs cursor-pointer font-medium")}>
                    <Link href="/about">The Director</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
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
                        <p className="text-[10px] text-slate-500 mb-2 font-medium">DISCIPLINES</p>
                        {serviceItems.map((item) => (
                           <SheetClose asChild key={item.href}>
                                <Link
                                   href={item.href}
                                   className="block text-slate-300 hover:text-white transition-colors"
                               >
                                   {item.title}
                               </Link>
                           </SheetClose>
                       ))}
                     </div>
                     <div className="h-px w-full bg-slate-900" />
                     <SheetClose asChild>
                         <Link href="/discover/case-studies" className="text-slate-300 hover:text-white transition-colors">
                             Selected Works
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

