import React from 'react';
import { Button } from '../ui/Button';
import { Phone, Send } from 'lucide-react';
import { Customer } from '../../types';

interface DebtAlertsProps {
  customers: Customer[];
}

export const DebtAlerts: React.FC<DebtAlertsProps> = ({ customers }) => {
  const handleSendAlert = (customerId: string) => {
    // In a real app, this would send an alert to the customer
    console.log(`Alert sent to customer ${customerId}`);
    alert(`Alerta enviado para o cliente com sucesso!`);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  if (customers.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-500">Não há clientes com dívidas pendentes</h3>
        <p className="text-gray-600 mt-2">Todos os pagamentos estão em dia!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {customers.map((customer) => (
        <div 
          key={customer.id} 
          className={`p-4 rounded-lg border-l-8 ${
            customer.debtAmount >= 100 
              ? 'border-red-500 bg-red-50' 
              : 'border-orange-400 bg-orange-50'
          }`}
        >
          <div className="flex justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-xl font-bold">{customer.name}</h3>
              <p className="text-gray-700">Telefone: {customer.phone}</p>
              <div className="mt-1">
                <p className="text-gray-600">Última compra: {formatDate(customer.lastPurchaseDate)}</p>
                <p className="text-gray-600">Último pagamento: {formatDate(customer.lastPaymentDate)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-700">R$ {customer.debtAmount.toFixed(2)}</p>
              <div className="mt-3 flex space-x-2">
                <Button 
                  variant="primary" 
                  size="md"
                  icon={<Send size={20} />}
                  onClick={() => handleSendAlert(customer.id)}
                  disabled={customer.notificationSent}
                >
                  {customer.notificationSent ? 'Alerta Enviado' : 'Enviar Alerta'}
                </Button>
                <Button 
                  variant="secondary" 
                  size="md"
                  icon={<Phone size={20} />}
                  onClick={() => window.open(`tel:${customer.phone}`)}
                >
                  Ligar
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};