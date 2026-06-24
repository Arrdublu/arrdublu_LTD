
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
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change currency</span>
        </Button>
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
