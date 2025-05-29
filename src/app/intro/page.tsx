"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IntroSlider } from '@/components/intro/IntroSlider';
import { AuthModal } from '@/components/auth/AuthModal';
import { AppLogo } from '@/components/shared/AppLogo';

export default function IntroPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  const handleIntroComplete = () => {
    setShowAuthModal(true);
  };

  const handleLoginSuccess = () => {
    // Navigate to shop page or dashboard based on role
    // For now, just navigate to shop
    router.push('/shop');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4">
      <div className="absolute top-6 left-6">
        <AppLogo />
      </div>
      <main className="w-full max-w-2xl">
        {!showAuthModal ? (
          <IntroSlider onComplete={handleIntroComplete} />
        ) : (
          // Placeholder for when modal is active, or could remove IntroSlider from DOM
          <div className="text-center p-8 bg-card rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-primary mb-4">Final Step!</h2>
            <p className="text-muted-foreground">Please sign in or create an account to continue.</p>
          </div>
        )}
      </main>
      <AuthModal 
        isOpen={showAuthModal} 
        onOpenChange={setShowAuthModal}
        onLoginSuccess={handleLoginSuccess} 
      />
    </div>
  );
}
