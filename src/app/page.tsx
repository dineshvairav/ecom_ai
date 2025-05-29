import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/shared/AppLogo';
import { SocialMediaLinks } from '@/components/shared/SocialMediaLinks';
import { ContactInfo } from '@/components/landing/ContactInfo';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Info } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center text-center">
        <AppLogo className="mb-12" iconSize={64} textSize="text-6xl" />
        
        <Card className="w-full max-w-2xl shadow-2xl bg-card/80 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
              Welcome to VisualVest
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Discover eye-catching products with a seamless shopping experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-foreground">
              Explore our curated collection of high-quality items, presented with stunning visuals and smooth interactions. 
              Your next favorite find is just a click away.
            </p>
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="https://placehold.co/800x400.png" 
                alt="Featured products showcase" 
                layout="fill" 
                objectFit="cover"
                data-ai-hint="products shopping"
                className="transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" variant="outline" asChild className="group">
              <Link href="#more-info">
                Know More <Info className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" asChild className="group bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/intro">
                Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <section id="more-info" className="w-full max-w-3xl mt-16 p-8 bg-card/50 backdrop-blur-sm rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-primary">About VisualVest</h2>
          <p className="text-foreground/90 mb-4">
            At VisualVest, we believe shopping should be an engaging and visually delightful experience. Our platform is designed to showcase products beautifully, making it easy and enjoyable for you to find what you're looking for.
          </p>
          <p className="text-foreground/90">
            We are committed to quality, innovation, and customer satisfaction. Stay tuned for exciting new features and products!
          </p>
        </section>
      </main>

      <footer className="py-8 bg-card/70 backdrop-blur-sm shadow-t-lg">
        <div className="container mx-auto px-4 text-center">
          <ContactInfo className="mb-6 justify-center items-center flex flex-col sm:flex-row sm:space-x-8 space-y-3 sm:space-y-0" />
          <SocialMediaLinks className="justify-center mb-4" />
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} VisualVest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
