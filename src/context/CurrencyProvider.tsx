
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { Currency, ExchangeRates } from '@/lib/types';
import { formatCurrency as formatCurrencyUtil } from '@/lib/utils';
import { MOCK_RATES } from '@/lib/data';

interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  getFormattedPrice: (amount: number, currency?: Currency) => string;
  rates: ExchangeRates;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');

  const getFormattedPrice = useCallback((amount: number, currency?: Currency) => {
    const currencyToUse = currency || selectedCurrency;
    return formatCurrencyUtil(amount, currencyToUse, MOCK_RATES);
  }, [selectedCurrency]);

  const value = {
    selectedCurrency,
    setSelectedCurrency,
    getFormattedPrice,
    rates: MOCK_RATES,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
