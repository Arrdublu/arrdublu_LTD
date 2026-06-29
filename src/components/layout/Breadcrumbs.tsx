import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs md:text-sm font-mono text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
      <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center">
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4" />
          {index === items.length - 1 ? (
            <span className="text-slate-300 pointer-events-none" aria-current="page">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-cyan-400 transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
