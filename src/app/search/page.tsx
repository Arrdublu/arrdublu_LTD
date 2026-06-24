
import { Suspense } from 'react';
import SearchPageClient from './SearchPageClient';
import { searchServices } from '@/lib/search-actions';
export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';
  const results = await searchServices(query);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageClient query={query} initialResults={results} />
    </Suspense>
  );
}
