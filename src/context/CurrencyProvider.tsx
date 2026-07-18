
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
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
  const [selectedCurrency, setSelectedCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    // 1. Check local storage first for user manual override
    const savedCurrency = localStorage.getItem('selectedCurrency') as Currency | null;
    if (savedCurrency === 'USD' || savedCurrency === 'JMD') {
      setSelectedCurrencyState(savedCurrency);
      return;
    }

    // 2. Perform location-based detection
    const detectCurrency = async () => {
      // Check timezone for Jamaica
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timeZone === 'America/Jamaica') {
          setSelectedCurrencyState('JMD');
          return;
        }
      } catch (e) {
        console.error('Timezone detection failed:', e);
      }

      // Check browser languages for Jamaica locale
      try {
        const languages = navigator.languages || [navigator.language];
        if (languages.some(lang => lang.toLowerCase().includes('jm'))) {
          setSelectedCurrencyState('JMD');
          return;
        }
      } catch (e) {
        console.error('Language detection failed:', e);
      }

      // Fallback: Check IP-based location
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          const country = data.country_code || data.country;
          if (country === 'JM') {
            setSelectedCurrencyState('JMD');
            return;
          }
        }
      } catch (e) {
        console.error('IP-based location detection failed:', e);
      }

      // Default to USD
      setSelectedCurrencyState('USD');
    };

    detectCurrency();
  }, []);

  const setSelectedCurrency = useCallback((currency: Currency) => {
    setSelectedCurrencyState(currency);
    localStorage.setItem('selectedCurrency', currency);
  }, []);

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
