"use client";

import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryScrollProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryScroll({ categories, selectedCategoryId, onSelectCategory }: CategoryScrollProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border shadow-sm">
      <div className="flex w-max space-x-2 p-3 bg-card">
        <Button
            variant={selectedCategoryId === null ? 'default' : 'outline'}
            onClick={() => onSelectCategory(null)}
            className="shrink-0"
          >
            All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategoryId === category.id ? 'default' : 'outline'}
            onClick={() => onSelectCategory(category.id)}
            className="shrink-0"
          >
            {category.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
