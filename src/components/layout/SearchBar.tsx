'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm hidden md:flex items-center">
      <Search className="absolute left-3 w-4 h-4 text-slate-400" />
      <input
        type="search"
        placeholder="Search services, portfolio, shop..."
        className="w-full pl-9 pr-4 py-2 bg-slate-900/60 border border-slate-800 rounded-md text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
