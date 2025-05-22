import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, DollarSign, ShoppingCart, X } from 'lucide-react';
import { customers, products, sales as initialSales } from '../../data/mockData';
import { Customer, Product, Sale } from '../../types';
import { NewSaleForm } from './NewSaleForm';

export const SalesPage: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [showNewSaleForm, setShowNewSaleForm] = useState(false);

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get payment method text
  const getPaymentMethodText = (method: 'cash' | 'card' | 'credit') => {
    const methods: Record<string, string> = {
      'cash': 'Dinheiro',
      'card': 'Cartão',
      'credit': 'Fiado'
    };
    return methods[method];
  };

  // Get product details
  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  // Sort sales by date (newest first)
  const sortedSales = [...sales].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Handle new sale
  const handleAddSale = (sale: Sale) => {
    const newSale = {
      ...sale,
      id: (sales.length + 1).toString(),
      date: new Date().toISOString()
    };
    setSales([...sales, newSale]);
    setShowNewSaleForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-amber-900">Vendas</h2>
        
        <Button 
          variant="primary" 
          size="lg"
          icon={<Plus size={24} />} 
          onClick={() => setShowNewSaleForm(true)}
        >
          Nova Venda
        </Button>
      </div>

      {showNewSaleForm && (
        <Card title="Registrar Nova Venda">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-amber-800">Nova Venda</h3>
            <Button 
              variant="secondary" 
              size="sm"
              icon={<X size={20} />} 
              onClick={() => setShowNewSaleForm(false)}
              className="rounded-full p-2"
            >
              <span className="sr-only">Fechar</span>
            </Button>
          </div>
          <NewSaleForm
            customers={customers}
            products={products}
            onSubmit={handleAddSale}
            onCancel={() => setShowNewSaleForm(false)}
          />
        </Card>
      )}

      <Card title="Vendas Recentes">
        <div className="overflow-x-auto">
          <table className="w-full text-lg">
            <thead>
              <tr className="text-left bg-amber-100">
                <th className="px-4 py-3 rounded-tl-lg">Data/Hora</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Itens</th>
                <th className="px-4 py-3">Pagamento</th>
                <th className="px-4 py-3 text-right rounded-tr-lg">Total</th>
              </tr>
            </thead>
            <tbody>
              {sortedSales.map((sale) => (
                <tr key={sale.id} className="border-b border-amber-100 hover:bg-amber-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">{formatDate(sale.date)}</td>
                  <td className="px-4 py-4">{getCustomerName(sale.customerId)}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col space-y-1">
                      {sale.items.map((item, idx) => {
                        const product = getProductDetails(item.productId);
                        return (
                          <div key={idx} className="text-gray-700">
                            {item.quantity}x {product?.name || 'Produto'} - R$ {item.price.toFixed(2)}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-base font-medium ${
                      sale.paymentMethod === 'credit' 
                        ? 'bg-red-100 text-red-800' 
                        : sale.paymentMethod === 'card'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {getPaymentMethodText(sale.paymentMethod)}
                    </span>
                    {sale.paymentMethod === 'credit' && (
                      <div className={`text-sm mt-1 ${sale.paid ? 'text-green-600' : 'text-red-600'}`}>
                        {sale.paid ? '✓ Pago' : '⚠️ Pendente'}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-xl">
                    R$ {sale.total.toFixed(2)}
                  </td>
                </tr>
              ))}
              
              {sales.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center">
                    <div>
                      <ShoppingCart size={48} className="mx-auto text-gray-400 mb-2" />
                      <h3 className="text-2xl font-bold text-gray-500">Nenhuma venda registrada</h3>
                      <p className="text-gray-600 mt-2">Comece registrando sua primeira venda!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};