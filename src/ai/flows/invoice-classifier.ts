'use server';

/**
 * @fileOverview Invoice data extraction and classification flow.
 *
 * This file defines a Genkit flow that takes an invoice or receipt as a PDF or image,
 * extracts the data using OCR, and classifies the data using a GenAI model.
 *
 * @remarks
 * This flow uses the ai.defineTool and ai.definePrompt functions from Genkit to define
 * the tool and prompt used in the flow.
 *
 * @exports {
 *   extractInvoiceData,
 *   InvoiceDataExtractionInput,
 *   InvoiceDataExtractionOutput,
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvoiceDataExtractionInputSchema = z.object({
  invoiceDataUri: z
    .string()
    .describe(
      'The invoice or receipt as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type InvoiceDataExtractionInput = z.infer<typeof InvoiceDataExtractionInputSchema>;

const InvoiceDataExtractionOutputSchema = z.object({
  invoiceType: z.string().describe('The type of invoice or receipt.'),
  vendor: z.string().describe('The name of the vendor.'),
  invoiceNumber: z.string().describe('The invoice number.'),
  invoiceDate: z.string().describe('The invoice date.'),
  totalAmount: z.number().describe('The total amount due.'),
  lineItems: z.array(
    z.object({
      description: z.string().describe('A description of the item.'),
      quantity: z.number().describe('The quantity of the item.'),
      unitPrice: z.number().describe('The unit price of the item.'),
      amount: z.number().describe('The total amount for the item.'),
    })
  ).
  describe('The line items in the invoice.'),
});
export type InvoiceDataExtractionOutput = z.infer<typeof InvoiceDataExtractionOutputSchema>;

export async function extractInvoiceData(input: InvoiceDataExtractionInput): Promise<InvoiceDataExtractionOutput> {
  return invoiceDataExtractionFlow(input);
}

const invoiceDataExtractionPrompt = ai.definePrompt({
  name: 'invoiceDataExtractionPrompt',
  input: {schema: InvoiceDataExtractionInputSchema},
  output: {schema: InvoiceDataExtractionOutputSchema},
  prompt: `You are an expert in data extraction from invoices and receipts.

  Your goal is to extract key information from the provided invoice document. You must determine the
  invoice type (e.g. utility bill, supplier invoice, etc.) and extract the vendor name, invoice number,
  invoice date, total amount due, and a detailed list of line items, including descriptions, quantities,
  unit prices and amounts.

  Here is the invoice data:
  {{media url=invoiceDataUri}}

  Ensure that the output is formatted correctly.`,
});

const invoiceDataExtractionFlow = ai.defineFlow(
  {
    name: 'invoiceDataExtractionFlow',
    inputSchema: InvoiceDataExtractionInputSchema,
    outputSchema: InvoiceDataExtractionOutputSchema,
  },
  async input => {
    const {output} = await invoiceDataExtractionPrompt(input);
    return output!;
  }
);
