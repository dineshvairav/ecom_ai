import type { Product, Category, Invoice, User } from '@/types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Apparel', slug: 'apparel' },
  { id: '3', name: 'Home Goods', slug: 'home-goods' },
  { id: '4', name: 'Books', slug: 'books' },
  { id: '5', name: 'Sports Gear', slug: 'sports-gear' },
];

export const mockProducts: Product[] = [
  // Electronics
  { id: '101', name: 'Smart Watch Series X', description: 'Latest generation smart watch with advanced health tracking.', images: ['https://placehold.co/600x400.png'], categoryId: '1', mrp: 25000, mop: 22999, dp: 18000, stock: 50, dataAiHint: 'smartwatch tech' },
  { id: '102', name: 'Wireless Noise-Cancelling Headphones', description: 'Immersive sound experience with long battery life.', images: ['https://placehold.co/600x400.png'], categoryId: '1', mrp: 18000, mop: 15999, dp: 12000, stock: 30, dataAiHint: 'headphones audio' },
  { id: '103', name: '4K Ultra HD Smart TV 55"', description: 'Stunning visuals and smart features for your living room.', images: ['https://placehold.co/600x400.png'], categoryId: '1', mrp: 60000, mop: 54999, dp: 45000, stock: 15, dataAiHint: 'television entertainment' },
  { id: '104', name: 'Gaming Laptop Pro', description: 'High-performance laptop for serious gamers.', images: ['https://placehold.co/600x400.png'], categoryId: '1', mrp: 120000, mop: 110000, dp: 90000, stock: 10, dataAiHint: 'laptop gaming' },
  { id: '105', name: 'Portable Bluetooth Speaker', description: 'Compact speaker with powerful sound.', images: ['https://placehold.co/600x400.png'], categoryId: '1', mrp: 5000, mop: 4499, dp: 3500, stock: 75, dataAiHint: 'speaker music' },
  { id: '106', name: 'Digital Camera EOS', description: 'Capture stunning photos with this DSLR.', images: ['https://placehold.co/600x400.png'], categoryId: '1', mrp: 45000, mop: 42000, dp: 35000, stock: 20, dataAiHint: 'camera photography' },
  
  // Apparel
  { id: '201', name: 'Men\'s Classic T-Shirt', description: 'Comfortable cotton t-shirt for everyday wear.', images: ['https://placehold.co/600x400.png'], categoryId: '2', mrp: 1200, mop: 999, dp: 700, stock: 100, dataAiHint: 'shirt clothing' },
  { id: '202', name: 'Women\'s Denim Jeans', description: 'Stylish and durable denim jeans.', images: ['https://placehold.co/600x400.png'], categoryId: '2', mrp: 2500, mop: 2199, dp: 1500, stock: 60, dataAiHint: 'jeans fashion' },
  { id: '203', name: 'Running Shoes XT', description: 'Lightweight and comfortable shoes for runners.', images: ['https://placehold.co/600x400.png'], categoryId: '2', mrp: 4000, mop: 3499, dp: 2500, stock: 40, dataAiHint: 'shoes sport' },
  { id: '204', name: 'Winter Jacket Explorer', description: 'Warm and waterproof jacket for cold weather.', images: ['https://placehold.co/600x400.png'], categoryId: '2', mrp: 6000, mop: 5499, dp: 4000, stock: 25, dataAiHint: 'jacket winter' },
  { id: '205', name: 'Leather Belt Classic', description: 'Genuine leather belt for a sharp look.', images: ['https://placehold.co/600x400.png'], categoryId: '2', mrp: 1500, mop: 1299, dp: 900, stock: 80, dataAiHint: 'belt accessory' },
  { id: '206', name: 'Summer Dress Flora', description: 'Light and airy dress for warm days.', images: ['https://placehold.co/600x400.png'], categoryId: '2', mrp: 2800, mop: 2500, dp: 1800, stock: 50, dataAiHint: 'dress fashion' },

  // Home Goods
  { id: '301', name: 'Memory Foam Pillow', description: 'Ergonomic pillow for a comfortable sleep.', images: ['https://placehold.co/600x400.png'], categoryId: '3', mrp: 2000, mop: 1799, dp: 1200, stock: 90, dataAiHint: 'pillow bedroom' },
  { id: '302', name: 'Stainless Steel Cookware Set', description: 'Durable 10-piece cookware set.', images: ['https://placehold.co/600x400.png'], categoryId: '3', mrp: 8000, mop: 7499, dp: 5500, stock: 35, dataAiHint: 'cookware kitchen' },
  { id: '303', name: 'Robot Vacuum Cleaner', description: 'Smart vacuum for automated cleaning.', images: ['https://placehold.co/600x400.png'], categoryId: '3', mrp: 22000, mop: 19999, dp: 15000, stock: 22, dataAiHint: 'vacuum home' },
  { id: '304', name: 'Coffee Maker Deluxe', description: 'Brew your perfect coffee every morning.', images: ['https://placehold.co/600x400.png'], categoryId: '3', mrp: 3500, mop: 2999, dp: 2200, stock: 45, dataAiHint: 'coffee kitchen' },
  { id: '305', name: 'Bookshelf Modern', description: 'Stylish bookshelf to organize your reads.', images: ['https://placehold.co/600x400.png'], categoryId: '3', mrp: 4500, mop: 3999, dp: 3000, stock: 30, dataAiHint: 'furniture home' },
];

export const mockInvoices: Invoice[] = [
  { id: 'inv001', invoiceNumber: 'INV-2024-001', invoiceDate: '2024-07-01', vendor: 'Tech Supplies Inc.', totalAmount: 18000, fileUrl: '/invoices/sample-invoice.pdf', userId: 'dealer1', isPublic: false },
  { id: 'inv002', invoiceNumber: 'REC-2024-005', invoiceDate: '2024-07-15', vendor: 'OfficeMart', totalAmount: 22999, fileUrl: '/invoices/sample-receipt.pdf', userId: 'user1', isPublic: false },
  { id: 'inv003', invoiceNumber: 'INV-2024-002', invoiceDate: '2024-07-20', vendor: 'General Goods Co.', totalAmount: 999, fileUrl: '/invoices/sample-invoice-public.pdf', isPublic: true },
];

export const mockUsers: User[] = [
  { id: 'guest', role: 'guest' },
  { id: 'user1', email: 'user@example.com', role: 'user', name: 'Regular User' },
  { id: 'dealer1', email: 'dealer@example.com', role: 'dealer', name: 'Verified Dealer' },
  { id: 'admin1', email: 'admin@example.com', role: 'admin', name: 'Site Administrator' },
];
