
import { Suspense } from 'react';
import SearchPageClient from './SearchPageClient';
import { searchEntireWebsite } from '@/lib/search-actions';

export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';
  const results = await searchEntireWebsite(query);

  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 text-slate-400 text-sm">Searching website...</div>}>
      <SearchPageClient query={query} initialResults={results} />
    </Suspense>
  );
}
