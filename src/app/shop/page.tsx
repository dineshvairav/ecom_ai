"use client";

import React, { useState, useMemo } from 'react';
import { mockCategories, mockProducts } from '@/lib/mock-data';
import type { Product } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';
import { CategoryScroll } from '@/components/shop/CategoryScroll';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/shared/AppLogo';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, UserCircle } from 'lucide-react';

const ITEMS_PER_PAGE = 6; // Adjusted to 6 for better grid layout (2x3 or 3x2)

export default function ShopPage() {
  const { user, loading: authLoading } = useAuth();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesCategory = selectedCategoryId ? product.categoryId === selectedCategoryId : true;
      const matchesSearch = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryId, searchTerm]);

  const productsByCategory = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    filteredProducts.forEach(product => {
      if (!grouped[product.categoryId]) {
        grouped[product.categoryId] = [];
      }
      grouped[product.categoryId].push(product);
    });
    return grouped;
  }, [filteredProducts]);

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
    setSearchTerm(''); // Reset search term when category changes
  };

  const handleViewMore = (categoryId: string) => {
    setVisibleCounts(prev => ({
      ...prev,
      [categoryId]: (prev[categoryId] || ITEMS_PER_PAGE) + ITEMS_PER_PAGE
    }));
  };
  
  if (authLoading) {
    return <div className="flex justify-center items-center min-h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <AppLogo iconSize={28} textSize="text-2xl" />
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <nav className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" aria-label="Shopping Cart">
                <ShoppingCart />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={user?.role === 'guest' ? "/intro" : "/profile"} aria-label="User Profile">
                 <UserCircle />
              </Link>
            </Button>
             {user?.role === 'admin' && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin">Admin Panel</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <CategoryScroll
            categories={mockCategories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        {searchTerm && filteredProducts.length > 0 && (
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Search Results for "{searchTerm}"</h2>
        )}
        {searchTerm && filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground py-10">No products found for "{searchTerm}".</p>
        )}

        {!searchTerm && (selectedCategoryId === null ? mockCategories : [mockCategories.find(c => c.id === selectedCategoryId)]).map(category => {
          if (!category) return null;
          const categoryProducts = productsByCategory[category.id] || [];
          if (categoryProducts.length === 0) return null;

          const currentVisibleCount = visibleCounts[category.id] || ITEMS_PER_PAGE;

          return (
            <section key={category.id} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary/30 pb-2">
                {category.name}
              </h2>
              {categoryProducts.length === 0 ? (
                <p className="text-muted-foreground">No products in this category yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.slice(0, currentVisibleCount).map(product => (
                    <ProductCard key={product.id} product={product} user={user} />
                  ))}
                </div>
              )}
              {categoryProducts.length > currentVisibleCount && (
                <div className="mt-8 text-center">
                  <Button variant="outline" onClick={() => handleViewMore(category.id)}>
                    View More in {category.name}
                  </Button>
                </div>
              )}
            </section>
          );
        })}

        {searchTerm && filteredProducts.length > 0 && (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} user={user} />
            ))}
          </div>
        )}
      </main>

      <footer className="py-8 bg-card text-center border-t">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} VisualVest. Happy Shopping!
        </p>
      </footer>
    </div>
  );
}
