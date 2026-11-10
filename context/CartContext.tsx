'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, options?: { size?: string; colour?: string; quantity?: number }) => void;
  removeFromCart: (productId: string, size?: string, colour?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, colour?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  lastAddedItem: CartItem | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'minoli_jewellery_cart_v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart to storage', e);
      }
    }
  }, [cart, isHydrated]);

  const addToCart = (product: Product, options?: { size?: string; colour?: string; quantity?: number }) => {
    const selectedSize = options?.size || product.availableSizes?.[0] || 'Standard';
    const selectedColour = options?.colour || product.availableColours?.[0] || 'Champagne Gold';
    const quantity = options?.quantity && options.quantity > 0 ? options.quantity : 1;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColour === selectedColour
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        setLastAddedItem(next[existingIndex]);
        return next;
      }

      const newItem: CartItem = {
        productId: product.id,
        product,
        selectedSize,
        selectedColour,
        quantity,
      };
      setLastAddedItem(newItem);
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size?: string, colour?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            (!size || item.selectedSize === size) &&
            (!colour || item.selectedColour === colour)
          )
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, size?: string, colour?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, colour);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.productId === productId &&
          (!size || item.selectedSize === size) &&
          (!colour || item.selectedColour === colour)
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
