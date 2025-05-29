import { InvoiceUploadForm } from '@/components/admin/InvoiceUploadForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockInvoices } from '@/lib/mock-data'; // Using mock data for display
import Link from 'next/link';
import { Eye, Download, Edit2, Trash2 } from 'lucide-react';

export default function AdminInvoicesPage() {
  // In a real app, fetch invoices from backend
  const invoices = mockInvoices;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Invoice Management</h1>
        {/* Button to trigger modal for new invoice or link to a new page */}
      </div>

      <InvoiceUploadForm />

      <Card className="shadow-lg mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Uploaded Invoices</CardTitle>
          <CardDescription>List of processed invoices and receipts.</CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No invoices uploaded yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.vendor}</TableCell>
                    <TableCell>{invoice.invoiceDate}</TableCell>
                    <TableCell>₹{invoice.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={invoice.isPublic ? 'default' : 'secondary'}>
                        {invoice.extractedData ? 'Processed' : (invoice.isPublic ? 'Public' : 'User Only')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" asChild title="View Details">
                        <Link href={`/admin/invoices/${invoice.id}`}><Eye className="h-4 w-4" /></Link>
                      </Button>
                       <Button variant="ghost" size="icon" asChild title="Edit Invoice" disabled> {/* Edit logic TBD */}
                        <Link href={`/admin/invoices/${invoice.id}/edit`}><Edit2 className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild title="Download File" disabled={!invoice.fileUrl}>
                        <a href={invoice.fileUrl} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" /></a>
                      </Button>
                       <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="Delete Invoice" disabled> {/* Delete logic TBD */}
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
