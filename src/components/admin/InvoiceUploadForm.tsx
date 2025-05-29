"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Not directly used by dropzone, but for consistency
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { extractInvoiceData } from '@/ai/flows/invoice-classifier';
import type { InvoiceDataExtractionInput, InvoiceDataExtractionOutput } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, FileText, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface ExtractedDataDisplayProps {
  data: InvoiceDataExtractionOutput;
}

function ExtractedDataDisplay({ data }: ExtractedDataDisplayProps) {
  return (
    <Card className="mt-6 bg-secondary/50">
      <CardHeader>
        <CardTitle className="text-lg text-primary flex items-center">
          <FileText className="mr-2 h-5 w-5" /> Extracted Invoice Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p><strong>Type:</strong> {data.invoiceType}</p>
        <p><strong>Vendor:</strong> {data.vendor}</p>
        <p><strong>Invoice #:</strong> {data.invoiceNumber}</p>
        <p><strong>Date:</strong> {data.invoiceDate}</p>
        <p><strong>Total Amount:</strong> ₹{data.totalAmount.toLocaleString()}</p>
        <h4 className="font-semibold pt-2">Line Items:</h4>
        {data.lineItems.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {data.lineItems.map((item, index) => (
              <li key={index}>
                {item.description} - Qty: {item.quantity}, Unit Price: ₹{item.unitPrice}, Amount: ₹{item.amount}
              </li>
            ))}
          </ul>
        ) : <p>No line items extracted.</p>}
      </CardContent>
    </Card>
  );
}


export function InvoiceUploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [extractedData, setExtractedData] = useState<InvoiceDataExtractionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setExtractedData(null); // Reset previous data
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
  });

  const handleUploadAndExtract = async () => {
    if (files.length === 0) {
      toast({ title: 'No file selected', description: 'Please select an invoice file to upload.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    setError(null);
    setExtractedData(null);

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64Data = reader.result as string;
        const input: InvoiceDataExtractionInput = { invoiceDataUri: base64Data };
        const result = await extractInvoiceData(input);
        setExtractedData(result);
        toast({ title: 'Extraction Successful', description: 'Invoice data extracted.', className: 'bg-green-500 text-white' });
      } catch (e) {
        console.error("Extraction failed:", e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during extraction.';
        setError(`Extraction failed: ${errorMessage}`);
        toast({ title: 'Extraction Failed', description: errorMessage, variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
        setError("Failed to read file.");
        toast({ title: 'File Read Error', description: 'Could not read the selected file.', variant: 'destructive' });
        setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Upload Invoice/Receipt</CardTitle>
        <CardDescription>Upload a PDF or image file to extract invoice data using AI.</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/50 hover:border-primary/70'}`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
          {isDragActive ? (
            <p className="text-primary">Drop the file here ...</p>
          ) : (
            <p className="text-muted-foreground">Drag & drop an invoice file here, or click to select file</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">(PDF, JPG, PNG accepted)</p>
        </div>

        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm">Selected file:</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              {files.map(file => (
                <li key={file.name}>{file.name} - {Math.round(file.size / 1024)} KB</li>
              ))}
            </ul>
          </div>
        )}

        <Button 
          onClick={handleUploadAndExtract} 
          disabled={files.length === 0 || isLoading}
          className="w-full mt-6"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UploadCloud className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Processing...' : 'Upload and Extract Data'}
        </Button>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive text-destructive text-sm rounded-md flex items-center">
            <XCircle className="mr-2 h-5 w-5" /> {error}
          </div>
        )}
        
        {extractedData && !isLoading && !error && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500 text-green-700 dark:text-green-400 text-sm rounded-md flex items-center">
             <CheckCircle className="mr-2 h-5 w-5" /> Extraction successful. See details below.
          </div>
        )}
        {extractedData && <ExtractedDataDisplay data={extractedData} />}
      </CardContent>
    </Card>
  );
}
