
"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Product, Category, User } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Tag, CheckCircle, XCircle, Star } from 'lucide-react';
import Link from 'next/link';
import { AppLogo } from '@/components/shared/AppLogo';
import { Separator } from '@/components/ui/separator';

interface ProductClientViewProps {
  product: Product | undefined;
  category: Category | undefined;
}

export default function ProductClientView({ product, category }: ProductClientViewProps) {
  const router = useRouter();
  const { user } = useAuth();

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
         <AppLogo className="mb-8" />
        <h1 className="text-2xl font-bold text-destructive mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you are looking for does not exist or may have been removed.</p>
        <Button onClick={() => router.push('/shop')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Button>
      </div>
    );
  }

  const getPriceInfo = () => {
    let displayPrices = [
      { label: 'MRP', value: product.mrp, isStriked: true },
      { label: 'Our Price', value: product.mop, isPrimary: true }
    ];
    if (user?.role === 'dealer' && product.dp) {
      displayPrices = [
        { label: 'MRP', value: product.mrp, isStriked: true },
        { label: 'Wholesale Price', value: product.dp, isPrimary: true, isAccent: true }
      ];
    }
    return displayPrices;
  };

  const prices = getPriceInfo();
  const primaryPrice = prices.find(p => p.isPrimary)?.value || product.mop;
  const discount = product.mrp > primaryPrice ? Math.round(((product.mrp - primaryPrice) / product.mrp) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <header className="bg-card/80 backdrop-blur-md shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <AppLogo iconSize={28} textSize="text-2xl" />
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-0">
            <CardHeader className="p-0 relative aspect-square md:aspect-auto">
              <Image
                src={product.images[0] || 'https://placehold.co/800x800.png'}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint={product.dataAiHint || "product detail"}
              />
               {discount > 0 && (
                <Badge className="absolute top-4 left-4 text-lg py-1 px-3 bg-accent text-accent-foreground shadow-lg">
                  {discount}% OFF
                </Badge>
              )}
            </CardHeader>
            
            <div className="flex flex-col">
              <CardContent className="p-6 md:p-8 flex-grow">
                {category && (
                  <Link href={`/shop?category=${category.slug}`} className="text-sm text-primary hover:underline mb-2 block">
                    {category.name}
                  </Link>
                )}
                <CardTitle className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  {product.name}
                </CardTitle>
                
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">(125 reviews)</span>
                </div>

                <CardDescription className="text-base text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </CardDescription>

                <Separator className="my-6"/>

                <div className="space-y-3 mb-6">
                  {prices.map((p, idx) => (
                    <div key={idx} className={`flex items-baseline gap-2 ${p.isPrimary ? 'text-3xl' : 'text-lg'}`}>
                      <span className={`font-medium ${p.isStriked ? 'line-through text-muted-foreground' : (p.isAccent ? 'text-accent' : 'text-primary')}`}>
                        ₹{p.value.toLocaleString()}
                      </span>
                      {p.label !== 'MRP' || p.isPrimary ? <span className="text-sm text-muted-foreground">{p.label}</span> : null}
                    </div>
                  ))}
                </div>
                
                <div className={`flex items-center gap-2 text-sm font-medium mb-6 ${product.stock > 0 ? 'text-green-600' : 'text-destructive'}`}>
                  {product.stock > 0 ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  <span>{product.stock > 0 ? `${product.stock} units in stock` : 'Out of Stock'}</span>
                </div>
              </CardContent>

              <CardFooter className="p-6 md:p-8 bg-muted/30 border-t">
                <Button size="lg" className="w-full text-base py-3" disabled={product.stock === 0}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.stock > 0 ? 'Add to Cart' : 'Notify Me When Available'}
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </main>
      <footer className="py-8 bg-card text-center border-t mt-12">
        <p className="text-sm text-muted-foreground">
          VisualVest - Quality you can see.
        </p>
      </footer>
    </div>
  );
}
