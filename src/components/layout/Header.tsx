
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

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
import { Logo } from './Logo';
import { Search } from './Search';
import { ThemeToggle } from './ThemeToggle';
import { CurrencySwitcher } from './CurrencySwitcher';
import { Cart } from './Cart';

import { Toaster } from '@/components/ui/toaster';


const discoverItems: { title: string; href: string; description: string }[] = [
    {
        title: "What's New",
        href: '/discover/whats-new',
        description: 'The latest services, projects, and announcements from our creative studio.',
    },
    {
        title: 'Case Studies',
        href: '/discover/case-studies',
        description: 'See how we have helped our clients achieve their goals with our successful partnerships.',
    },
    {
        title: 'Our Partners',
        href: '/discover/brands',
        description: 'We are proud to have worked with a diverse range of innovative brands.',
    },
    {
        title: 'Archives',
        href: '/discover/archives',
        description: 'Explore our history of iconic projects and past achievements.',
    },
]

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                    <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {discoverItems.map((component) => (
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
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-primary/10 text-primary hover:bg-primary/20 font-semibold")}>
                    <Link href="/donation">Donation</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href="/contact">Contact</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

          <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Search />
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <Cart />
              <CurrencySwitcher />
              <ThemeToggle />
            </div>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs pr-6">
                <SheetHeader>
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full p-6">
                  <SheetClose asChild>
                    <Link href="/" className="mb-8">
                      <Logo />
                    </Link>
                  </SheetClose>
                  <nav className="flex flex-col gap-4">
                     {discoverItems.map((item) => (
                        <SheetClose asChild key={item.href}>
                             <Link
                                href={item.href}
                                className={cn(
                                'transition-colors hover:text-foreground/80 block py-2 text-lg',
                                pathname === item.href ? 'text-foreground font-semibold' : 'text-foreground/60'
                                )}
                            >
                                {item.title}
                            </Link>
                        </SheetClose>
                    ))}
                    <SheetClose asChild>
                        <Link
                            href="/donation"
                            className={cn(
                            'transition-colors hover:text-foreground/80 block py-2 text-lg bg-primary/10 rounded-md px-2 text-primary font-semibold',
                            )}
                        >
                            Donation
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            href="/contact"
                            className={cn(
                            'transition-colors hover:text-foreground/80 block py-2 text-lg border-t mt-4 pt-6',
                            pathname === '/contact' ? 'text-foreground font-semibold' : 'text-foreground/60'
                            )}
                        >
                            Contact
                        </Link>
                    </SheetClose>
                  </nav>
                  <div className="mt-auto flex items-center justify-between">
                      <Cart />
                      <CurrencySwitcher />
                      <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <Toaster />
    </>
  );
}
