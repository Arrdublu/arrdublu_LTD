'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowRight, Layers, ShoppingBag, Film, FileText, Sparkles, Filter } from 'lucide-react';
import type { SearchResult } from '@/lib/search-actions';
import { searchEntireWebsite } from '@/lib/search-actions';

interface SearchPageClientProps {
  query: string;
  initialResults: SearchResult[];
}

const POPULAR_SEARCHES = [
  'Virtual Production',
  'Brand Identity',
  'Cinematic',
  'Cognitive SEO',
  'Lifestyle Photography',
  'LUTs & Presets',
  'Selected Works',
  'Fine Art Prints',
];

export default function SearchPageClient({ query: initialQuery, initialResults }: SearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>(initialResults);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'service' | 'case-study' | 'shop' | 'page'>('all');

  useEffect(() => {
    setSearchTerm(initialQuery);
    setResults(initialResults);
  }, [initialQuery, initialResults]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    try {
      const freshResults = await searchEntireWebsite(searchTerm.trim());
      setResults(freshResults);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePillClick = async (term: string) => {
    setSearchTerm(term);
    setLoading(true);
    router.push(`/search?q=${encodeURIComponent(term)}`);
    try {
      const freshResults = await searchEntireWebsite(term);
      setResults(freshResults);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = results.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const countByType = {
    all: results.length,
    service: results.filter((r) => r.type === 'service').length,
    'case-study': results.filter((r) => r.type === 'case-study').length,
    shop: results.filter((r) => r.type === 'shop').length,
    page: results.filter((r) => r.type === 'page').length,
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-7xl">
      {/* Header & Search Bar */}
      <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-sans uppercase tracking-widest">
          <Search className="h-3.5 w-3.5" /> Website-Wide Search
        </div>
        <h1 className="text-3xl md:text-5xl font-headline font-bold text-white tracking-tight">
          Explore Services, Works & Shop
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Search across our entire catalog including production packages, case studies, shop products, and articles.
        </p>

        {/* Instant Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full max-w-xl mx-auto mt-4">
          <Search className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none" />
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services, production, shop, LUTs, works..."
            className="w-full pl-12 pr-28 py-6 bg-slate-900/90 border-slate-700/80 rounded-full text-white placeholder:text-slate-500 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-2xl"
          />
          <Button
            type="submit"
            disabled={loading}
            className="absolute right-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full px-5 py-2 text-xs font-sans uppercase tracking-wider transition-all"
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </form>

        {/* Suggested Searches */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs text-slate-500 font-sans uppercase tracking-wider mr-1">Popular:</span>
          {POPULAR_SEARCHES.map((term, i) => (
            <button
              key={i}
              onClick={() => handlePillClick(term)}
              className="text-xs px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all font-sans"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs & Counter */}
      {initialQuery && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 pb-4 gap-4">
            <div className="text-sm text-slate-300">
              Showing <span className="font-semibold text-cyan-400">{filteredResults.length}</span> results for{' '}
              <span className="text-white font-medium">"{initialQuery}"</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-sans tracking-wide transition-colors ${
                  activeTab === 'all' ? 'bg-cyan-600 text-white font-medium' : 'bg-slate-900/80 text-slate-400 hover:text-white'
                }`}
              >
                All ({countByType.all})
              </button>
              <button
                onClick={() => setActiveTab('service')}
                className={`px-3 py-1.5 rounded-md text-xs font-sans tracking-wide transition-colors ${
                  activeTab === 'service' ? 'bg-cyan-600 text-white font-medium' : 'bg-slate-900/80 text-slate-400 hover:text-white'
                }`}
              >
                Services ({countByType.service})
              </button>
              <button
                onClick={() => setActiveTab('case-study')}
                className={`px-3 py-1.5 rounded-md text-xs font-sans tracking-wide transition-colors ${
                  activeTab === 'case-study' ? 'bg-cyan-600 text-white font-medium' : 'bg-slate-900/80 text-slate-400 hover:text-white'
                }`}
              >
                Selected Works ({countByType['case-study']})
              </button>
              <button
                onClick={() => setActiveTab('shop')}
                className={`px-3 py-1.5 rounded-md text-xs font-sans tracking-wide transition-colors ${
                  activeTab === 'shop' ? 'bg-cyan-600 text-white font-medium' : 'bg-slate-900/80 text-slate-400 hover:text-white'
                }`}
              >
                Shop & Assets ({countByType.shop})
              </button>
              <button
                onClick={() => setActiveTab('page')}
                className={`px-3 py-1.5 rounded-md text-xs font-sans tracking-wide transition-colors ${
                  activeTab === 'page' ? 'bg-cyan-600 text-white font-medium' : 'bg-slate-900/80 text-slate-400 hover:text-white'
                }`}
              >
                Pages ({countByType.page})
              </button>
            </div>
          </div>

          {/* Results Display */}
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResults.map((item) => {
                // Render Service using ServiceCard component so updated images show!
                if (item.type === 'service' && item.rawService) {
                  return <ServiceCard key={item.id} service={item.rawService} />;
                }

                // Render other types (Case Studies, Shop, Pages)
                return (
                  <div
                    key={item.id}
                    className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:shadow-2xl"
                  >
                    <div className="space-y-4">
                      {item.image && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-950 border border-slate-800/80">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-slate-950/90 text-cyan-300 border border-cyan-900/60 backdrop-blur text-[10px] uppercase font-sans">
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {item.type === 'case-study' && <Film className="h-4 w-4 text-cyan-400" />}
                          {item.type === 'shop' && <ShoppingBag className="h-4 w-4 text-cyan-400" />}
                          {item.type === 'page' && <FileText className="h-4 w-4 text-cyan-400" />}
                          <span className="text-[10px] font-sans uppercase tracking-widest text-slate-400">{item.type.replace('-', ' ')}</span>
                        </div>
                        <h3 className="font-sans text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      {item.price !== undefined && (
                        <span className="text-sm font-semibold text-white">
                          {item.price === 0 ? 'Free' : `$${item.price}`}
                        </span>
                      )}
                      <Button asChild size="sm" variant="ghost" className="text-xs text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/80 ml-auto">
                        <Link href={item.url}>
                          View Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Card className="bg-slate-900/60 border-slate-800 text-center py-16">
              <CardContent className="flex flex-col items-center gap-4">
                <Search className="h-10 w-10 text-slate-600" />
                <h2 className="text-xl font-semibold text-white">No search results found</h2>
                <p className="text-slate-400 text-xs max-w-md">
                  We couldn't find any results matching <span className="text-white font-medium">"{initialQuery}"</span>. Try searching for "Virtual Production", "Brand Identity", or "LUTs".
                </p>
                <Button onClick={() => handlePillClick('Virtual Production')} className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs">
                  Explore Virtual Production
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
