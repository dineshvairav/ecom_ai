"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AppLogo } from '@/components/shared/AppLogo';
import Link from 'next/link';
import { Mail, FileSearch, Download, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function InvoiceDownloadPage() {
  const [email, setEmail] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [isVerified, setIsVerified] = useState(false); // Mock verification state
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock email verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (email.includes('@') && email.length > 5) { // Simple validation
      setIsVerified(true);
      toast({ title: 'Email "Verified"', description: 'Please enter your invoice ID to download.' });
    } else {
      toast({ title: 'Invalid Email', description: 'Please enter a valid email address.', variant: 'destructive' });
    }
    setIsLoading(false);
  };

  const handleInvoiceDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock invoice lookup and download link generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (invoiceId.trim() !== '') {
      toast({ title: 'Invoice Found (Mock)', description: `Preparing download for invoice ${invoiceId}...` });
      // In a real app, provide a download link. For mock, maybe show a success message.
      // Example: window.location.href = `/api/download-invoice?id=${invoiceId}&email=${email}`;
      alert(`Mock download: Invoice ${invoiceId} for ${email}. In a real app, a file would download.`);
    } else {
      toast({ title: 'Invalid Invoice ID', description: 'Please enter a valid invoice ID.', variant: 'destructive' });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex flex-col items-center justify-center p-4">
       <div className="absolute top-6 left-6">
        <Button variant="outline" onClick={() => router.back()} size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
      <AppLogo className="mb-8" iconSize={48} textSize="text-4xl" />
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">Download Invoice</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            {isVerified ? 'Enter your invoice ID to download.' : 'Verify your email to access invoice downloads.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isVerified ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email-verify">Email Address</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        id="email-verify" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="pl-10"
                    />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleInvoiceDownload} className="space-y-4">
              <div>
                <Label htmlFor="invoice-id">Invoice ID</Label>
                 <div className="relative">
                    <FileSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        id="invoice-id" 
                        type="text" 
                        placeholder="Enter Invoice ID (e.g., INV-12345)" 
                        value={invoiceId} 
                        onChange={(e) => setInvoiceId(e.target.value)} 
                        required 
                        className="pl-10"
                    />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Searching...' : <><Download className="mr-2 h-4 w-4" /> Download Invoice</>}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground pt-4">
            <p>This is a mock verification and download process for demonstration purposes.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
