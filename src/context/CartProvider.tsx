
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { Service, CartItem, Currency, ExchangeRates } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';


// Mock exchange rates should be consistent with the provider
const MOCK_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 157,
  JMD: 155,
};


interface CartContextType {
  cartItems: CartItem[];
  addToCart: (service: Service) => void;
  removeFromCart: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  cartCount: number;
  viewedItems: string[];
  addViewedItem: (serviceId:string) => void;
  getFormattedPrice: (amount: number, currency?: Currency) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [viewedItems, setViewedItems] = useState<string[]>([]);
  const { toast } = useToast();

  const addViewedItem = useCallback((serviceId: string) => {
    setViewedItems((prev) => {
      // Avoid adding duplicates and keep the list to a reasonable size
      if (prev.includes(serviceId)) return prev;
      const newHistory = [serviceId, ...prev];
      return newHistory.slice(0, 10); // Keep last 10 viewed items
    });
  }, []);

  const addToCart = (service: Service) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.service.id === service.id);
      if (existingItem) {
        // If item exists and is not hourly, just show toast
        if (existingItem.service.unit !== 'hr') {
             toast({
                title: `${service.name} is already in your bag.`,
                description: "You can adjust the quantity in the cart if needed.",
             });
            return prevItems;
        }
        // If it's hourly, increase quantity
        return prevItems.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If item doesn't exist, add it
      return [...prevItems, { service, quantity: 1 }];
    });
    toast({
        title: "Added to Bag",
        description: `${service.name} has been added to your shopping bag.`,
    });
  };

  const removeFromCart = (serviceId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.service.id !== serviceId));
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.service.id === serviceId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0) // Remove if quantity is 0
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.service.price * item.quantity, 0);
  };

  const getFormattedPrice = (amount: number, currency: Currency = 'USD') => {
    return formatCurrency(amount, currency, MOCK_RATES);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    cartCount,
    viewedItems,
    addViewedItem,
    getFormattedPrice,
  };


  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
