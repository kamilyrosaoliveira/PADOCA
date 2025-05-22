export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  debtAmount: number;
  lastPurchaseDate: string;
  lastPaymentDate?: string;
  notificationSent: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'bread' | 'cake' | 'pastry' | 'drink' | 'other';
  stock: number;
}

export interface Sale {
  id: string;
  date: string;
  customerId?: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  paymentMethod: 'cash' | 'card' | 'credit';
  paid: boolean;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: 'ingredients' | 'utilities' | 'salary' | 'equipment' | 'other';
}

export type NotificationType = 'debt' | 'lowStock' | 'highSales' | 'expense';