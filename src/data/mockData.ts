import { Customer, Product, Sale, Expense } from '../types';

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Maria Silva',
    phone: '(11) 98765-4321',
    debtAmount: 45.50,
    lastPurchaseDate: '2023-09-15',
    lastPaymentDate: '2023-08-30',
    notificationSent: false
  },
  {
    id: '2',
    name: 'João Oliveira',
    phone: '(11) 91234-5678',
    email: 'joao@email.com',
    debtAmount: 127.75,
    lastPurchaseDate: '2023-09-10',
    notificationSent: true
  },
  {
    id: '3',
    name: 'Ana Pereira',
    phone: '(11) 99876-5432',
    debtAmount: 0,
    lastPurchaseDate: '2023-09-16',
    lastPaymentDate: '2023-09-16',
    notificationSent: false
  },
  {
    id: '4',
    name: 'Carlos Santos',
    phone: '(11) 95555-9999',
    debtAmount: 87.20,
    lastPurchaseDate: '2023-09-05',
    lastPaymentDate: '2023-08-20',
    notificationSent: false
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Pão Francês',
    price: 0.75,
    category: 'bread',
    stock: 150
  },
  {
    id: '2',
    name: 'Bolo de Chocolate',
    price: 35.00,
    category: 'cake',
    stock: 8
  },
  {
    id: '3',
    name: 'Croissant',
    price: 4.50,
    category: 'pastry',
    stock: 25
  },
  {
    id: '4',
    name: 'Café Pequeno',
    price: 3.00,
    category: 'drink',
    stock: 100
  },
];

export const sales: Sale[] = [
  {
    id: '1',
    date: '2023-09-16T08:30:00',
    items: [
      { productId: '1', quantity: 10, price: 7.50 },
      { productId: '4', quantity: 2, price: 6.00 }
    ],
    total: 13.50,
    paymentMethod: 'cash',
    paid: true
  },
  {
    id: '2',
    date: '2023-09-16T10:15:00',
    customerId: '2',
    items: [
      { productId: '2', quantity: 1, price: 35.00 },
      { productId: '3', quantity: 4, price: 18.00 }
    ],
    total: 53.00,
    paymentMethod: 'credit',
    paid: false
  },
  {
    id: '3',
    date: '2023-09-15T16:45:00',
    customerId: '1',
    items: [
      { productId: '1', quantity: 5, price: 3.75 },
      { productId: '3', quantity: 2, price: 9.00 }
    ],
    total: 12.75,
    paymentMethod: 'credit',
    paid: false
  },
];

export const expenses: Expense[] = [
  {
    id: '1',
    date: '2023-09-15',
    description: 'Compra de farinha',
    amount: 250.00,
    category: 'ingredients'
  },
  {
    id: '2',
    date: '2023-09-10',
    description: 'Conta de luz',
    amount: 380.50,
    category: 'utilities'
  },
  {
    id: '3',
    date: '2023-09-05',
    description: 'Salário auxiliar',
    amount: 1500.00,
    category: 'salary'
  },
];