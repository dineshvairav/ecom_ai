
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, ShoppingBag, Sparkles, LogIn } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Slide {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  dataAiHint: string;
}

const slides: Slide[] = [
  {
    id: 1,
    icon: Sparkles,
    title: 'Welcome to VisualVest!',
    description: 'Experience a new way of shopping with stunning visuals and seamless navigation.',
    image: 'https://placehold.co/800x600.png',
    dataAiHint: 'welcome abstract'
  },
  {
    id: 2,
    icon: ShoppingBag,
    title: 'Discover Amazing Products',
    description: 'Explore a wide range of curated items, from tech gadgets to fashion essentials.',
    image: 'https://placehold.co/800x600.png',
    dataAiHint: 'products collection'
  },
  {
    id: 3,
    icon: CheckCircle,
    title: 'Get Started Easily',
    description: 'Sign up or log in to unlock personalized features and start your shopping journey.',
    image: 'https://placehold.co/800x600.png',
    dataAiHint: 'login interface'
  },
];

interface IntroSliderProps {
  onComplete: () => void;
}

export function IntroSlider({ onComplete }: IntroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState<'in' | 'out' | null>(null);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setAnimating('out');
      setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
        setAnimating('in');
      }, 300); // Match animation duration
    } else {
      onComplete();
    }
  };
  
  useEffect(() => {
    setAnimating('in'); // Initial animation for the first slide
  }, []);

  const SlideIcon = slides[currentSlide].icon;

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 rounded-lg shadow-2xl bg-card h-full max-w-2xl mx-auto overflow-hidden">
      <div 
        className={cn(
          "w-full transition-all duration-300 ease-in-out",
          animating === 'in' && "animate-in fade-in-0 slide-in-from-right-10",
          animating === 'out' && "animate-out fade-out-0 slide-out-to-left-10"
        )}
      >
        <div className="relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={slides[currentSlide].dataAiHint}
            priority={currentSlide === 0} // Prioritize loading the first image
          />
        </div>
        <div className="text-center">
          <SlideIcon className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{slides[currentSlide].title}</h2>
          <p className="text-muted-foreground md:text-lg mb-8">{slides[currentSlide].description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-auto pt-4">
        <Button onClick={onComplete} variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <LogIn className="mr-2 h-4 w-4" />
          Skip to Login
        </Button>
        <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
            {slides.map((_, index) => (
                <button
                key={index}
                onClick={() => {
                    setAnimating('out');
                    setTimeout(() => {
                        setCurrentSlide(index);
                        setAnimating('in');
                    }, 300);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-primary' : 'bg-muted hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                />
            ))}
            </div>
            <Button onClick={handleNext} size="lg" className="group">
            {currentSlide < slides.length - 1 ? 'Next' : 'Finish'}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
        </div>
      </div>
    </div>
  );
}
