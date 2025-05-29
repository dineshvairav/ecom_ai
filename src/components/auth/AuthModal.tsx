
"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, Key, User as UserIcon, LogIn, UserPlus, Coffee, Phone } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onLoginSuccess?: () => void;
}

export function AuthModal({ isOpen, onOpenChange, onLoginSuccess }: AuthModalProps) {
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For sign up
  const [mobile, setMobile] = useState(''); // For guest mobile

  const handleLogin = (role: 'user' | 'guest' | 'admin' | 'dealer') => {
    if (role === 'guest') {
      login('guest', undefined, mobile); // Pass mobile for guest
      toast({ title: "Login Successful", description: `Welcome, guest!` });
      onOpenChange(false);
      if (onLoginSuccess) onLoginSuccess();
      return;
    }

    // For other roles (user, admin, dealer)
    if (!email || (role !== 'admin' && !password && role !== 'dealer' /* dealer might also have specific login */)) {
        toast({ title: "Missing Fields", description: "Please enter email and password.", variant: "destructive" });
        return;
    }
    
    login(role, email); // Pass email for non-guest roles
    toast({ title: "Login Successful", description: `Welcome, ${role}!` });
    onOpenChange(false);
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleSignUp = () => {
    if (!name || !email || !password) {
        toast({ title: "Missing Fields", description: "Please fill all fields for sign up.", variant: "destructive" });
        return;
    }
    // Mock sign up, then login as user
    console.log("Mock sign up with:", { name, email, password });
    login('user', email); 
    toast({ title: "Sign Up Successful", description: `Welcome, ${name}!` });
    onOpenChange(false);
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card shadow-2xl rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">Access VisualVest</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Sign in or create an account to continue.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="pt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email-signin">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email-signin" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="password-signin">Password</Label>
                 <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password-signin" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="mobile-guest-signin">Mobile (Optional for Guest)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="mobile-guest-signin" type="tel" placeholder="For guest access, if desired" value={mobile} onChange={(e) => setMobile(e.target.value)} className="pl-10" />
                </div>
              </div>
              <Button onClick={() => handleLogin('user')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
              <Button variant="outline" onClick={() => handleLogin('guest')} className="w-full">
                <Coffee className="mr-2 h-4 w-4" /> Continue as Guest
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="pt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name-signup">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name-signup" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="email-signup">Email</Label>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email-signup" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="password-signup">Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password-signup" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
                </div>
              </div>
              <Button onClick={handleSignUp} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <UserPlus className="mr-2 h-4 w-4" /> Create Account
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
