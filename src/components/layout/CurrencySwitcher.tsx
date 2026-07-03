
'use client';

import { useCurrency } from '@/context/CurrencyProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import type { Currency } from '@/lib/types';

export function CurrencySwitcher() {
  const { selectedCurrency, setSelectedCurrency, rates } = useCurrency();

  const currencies = Object.keys(rates) as Currency[];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-slate-950/80 border border-slate-900 rounded font-mono text-[10px] text-slate-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
        >
          <span className="font-bold">{selectedCurrency}</span>
          <span className="sr-only">Change currency</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency}
            onClick={() => setSelectedCurrency(currency)}
            className={selectedCurrency === currency ? 'font-bold' : ''}
          >
            {currency}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
