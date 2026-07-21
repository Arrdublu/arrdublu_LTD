'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs } from './Breadcrumbs';

export function DynamicBreadcrumbs() {
  const pathname = usePathname();
  
  if (pathname === '/' || pathname === '/admin' || pathname.startsWith('/admin/')) {
    return null;
  }

  const paths = pathname.split('/').filter(Boolean);
  const items = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    return { label, href };
  });

  return (
    <div className="container mx-auto px-4 pt-8 pb-4">
      <Breadcrumbs items={items} />
    </div>
  );
}
