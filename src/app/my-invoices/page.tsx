"use client";

import { useAuth } from "@/contexts/AuthContext";
import { mockInvoices } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Eye, ArrowLeft } from "lucide-react";
import { AppLogo } from "@/components/shared/AppLogo";
import { useRouter } from "next/navigation";

export default function MyInvoicesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Filter invoices for the current user (mock logic)
  const userInvoices = mockInvoices.filter(inv => inv.userId === user?.id || (inv.isPublic && user?.role === 'guest'));

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><p>Loading...</p></div>;
  }

  if (!user || user.role === 'guest') { // Simplified: Guests might have a different flow or be redirected
     // router.push('/intro'); // Or show a message to log in
     // return <div className="flex justify-center items-center min-h-screen"><p>Please log in to view your invoices.</p></div>;
  }


  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card/80 backdrop-blur-md shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <AppLogo iconSize={28} textSize="text-2xl" />
          <Button variant="outline" onClick={() => router.push('/shop')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">My Invoices</CardTitle>
            <CardDescription>Here are the invoices and receipts associated with your account or available publicly.</CardDescription>
          </CardHeader>
          <CardContent>
            {userInvoices.length === 0 ? (
              <p className="text-muted-foreground text-center py-10">You have no invoices at the moment.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                      <TableCell>{invoice.vendor}</TableCell>
                      <TableCell>{invoice.invoiceDate}</TableCell>
                      <TableCell>₹{invoice.totalAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right space-x-1">
                        {/* Placeholder for view details action */}
                        <Button variant="ghost" size="icon" title="View Details" disabled>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" asChild title="Download" disabled={!invoice.fileUrl}>
                          <a href={invoice.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
         {user?.role === 'guest' && (
            <Card className="mt-8 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Looking for a specific invoice?</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                 <p className="text-muted-foreground mb-4">Sign in or create an account to see all your personal invoices.</p>
                <Button asChild>
                    <Link href="/intro">Sign In / Sign Up</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">Or, if you have an invoice ID, try our <Link href="/invoices/download" className="underline hover:text-primary">invoice download portal</Link>.</p>
              </CardContent>
            </Card>
        )}
      </main>
    </div>
  );
}
