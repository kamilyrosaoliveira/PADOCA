import React from 'react';
import { sales, products, customers } from '../../data/mockData';

export const SalesSummary: React.FC = () => {
  // Get product names by ID
  const getProductName = (id: string) => {
    const product = products.find(p => p.id === id);
    return product ? product.name : 'Produto Desconhecido';
  };

  // Get customer name by ID
  const getCustomerName = (id?: string) => {
    if (!id) return 'Cliente não registrado';
    const customer = customers.find(c => c.id === id);
    return customer ? customer.name : 'Cliente Desconhecido';
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Sort sales by date (newest first)
  const recentSales = [...sales].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-lg">
        <thead>
          <tr className="text-left bg-amber-100">
            <th className="px-4 py-3 rounded-tl-lg">Data</th>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Itens</th>
            <th className="px-4 py-3 text-right rounded-tr-lg">Total</th>
          </tr>
        </thead>
        <tbody>
          {recentSales.map((sale) => (
            <tr key={sale.id} className="border-b border-amber-100 hover:bg-amber-50 transition-colors">
              <td className="px-4 py-4">{formatDate(sale.date)}</td>
              <td className="px-4 py-4">{getCustomerName(sale.customerId)}</td>
              <td className="px-4 py-4">
                <div className="flex flex-col space-y-1">
                  {sale.items.map((item, idx) => (
                    <div key={idx} className="text-gray-700">
                      {item.quantity}x {getProductName(item.productId)}
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-4 py-4 text-right font-bold">
                R$ {sale.total.toFixed(2)}
                <div className={`text-sm font-normal ${sale.paid ? 'text-green-600' : 'text-red-600'}`}>
                  {sale.paid ? '✓ Pago' : '⚠️ Fiado'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};