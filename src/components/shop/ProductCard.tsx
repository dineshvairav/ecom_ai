import type { Product, User } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  user: User | null;
}

export function ProductCard({ product, user }: ProductCardProps) {
  const getPriceInfo = () => {
    let displayPrices = [{ label: 'MRP', value: product.mrp }, { label: 'Our Price', value: product.mop }];
    if (user?.role === 'dealer' && product.dp) {
      displayPrices.push({ label: 'Dealer Price', value: product.dp });
    }
    return displayPrices;
  };

  const prices = getPriceInfo();

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link href={`/shop/product/${product.id}`} className="block group">
        <CardHeader className="p-0">
          <div className="relative w-full h-48">
            <Image
              src={product.images[0] || 'https://placehold.co/600x400.png'}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={product.dataAiHint || "product image"}
            />
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="destructive" className="absolute top-2 right-2">Low Stock</Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="destructive" className="absolute top-2 right-2">Out of Stock</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground h-10 overflow-hidden text-ellipsis">
            {product.description}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 border-t mt-auto">
        <div className="w-full">
          <div className="my-2 space-y-1">
            {prices.map((p, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Tag className="w-3 h-3 mr-1.5 text-primary/70"/>{p.label}:
                </span>
                <span className={`font-medium ${p.label === 'Dealer Price' ? 'text-accent' : 'text-foreground'}`}>
                  ₹{p.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <Button asChild className="w-full mt-2 group" variant={product.stock === 0 ? "outline" : "default"} disabled={product.stock === 0}>
            <Link href={`/shop/product/${product.id}`}>
              {product.stock === 0 ? "Out of Stock" : "View Details"} 
              {product.stock > 0 && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />}
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
