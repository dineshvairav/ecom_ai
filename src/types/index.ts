export interface User {
  id: string;
  email?: string;
  role: 'guest' | 'user' | 'dealer' | 'admin';
  name?: string;
  mobile?: string; // Optional mobile number
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[]; // URLs to images
  categoryId: string;
  mrp: number; // Maximum Retail Price
  mop: number; // Market Operating Price
  dp?: number; // Dealer Price (wholesale)
  stock: number;
  dataAiHint?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string; // Consider Date object if doing date operations
  vendor: string;
  totalAmount: number;
  fileUrl: string; // URL to the PDF/image
  userId?: string; // For user-specific invoices
  isPublic?: boolean; // For guest downloadable invoices
  extractedData?: any; // From GenAI flow
}

// For GenAI Invoice Extraction
export type InvoiceDataExtractionInput = {
  invoiceDataUri: string;
};

export type InvoiceDataExtractionOutput = {
  invoiceType: string;
  vendor: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: number;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }>;
};
