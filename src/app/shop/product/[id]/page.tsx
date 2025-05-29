
import { mockProducts, mockCategories } from '@/lib/mock-data';
import type { Product, Category } from '@/types';
import ProductClientView from './ProductClientView'; // Changed from ProductDetailPage to ProductClientView
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = await params.id;
  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    notFound(); // Use Next.js notFound utility if product doesn't exist
  }

  const category = product ? mockCategories.find(c => c.id === product.categoryId) : undefined;

  return <ProductClientView product={product} category={category} />;
}
