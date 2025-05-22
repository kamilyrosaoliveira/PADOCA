import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Bell, Send, AlertTriangle, RefreshCw, Phone } from 'lucide-react';
import { customers } from '../../data/mockData';
import { Customer } from '../../types';

export const AlertsPage: React.FC = () => {
  // Filter customers with debt
  const customersWithDebt = customers.filter(customer => customer.debtAmount > 0);
  
  // State for tracking sent notifications
  const [notifiedCustomers, setNotifiedCustomers] = useState<string[]>(
    customers.filter(c => c.notificationSent).map(c => c.id)
  );
  
  // Track if notifications are being sent
  const [sending, setSending] = useState<Record<string, boolean>>({});
  
  const handleSendAlert = (customerId: string) => {
    setSending(prev => ({ ...prev, [customerId]: true }));
    
    // Simulate sending notification with delay
    setTimeout(() => {
      setNotifiedCustomers(prev => [...prev, customerId]);
      setSending(prev => ({ ...prev, [customerId]: false }));
      alert(`Alerta enviado para o cliente com sucesso!`);
    }, 1500);
  };
  
  const handleSendAllAlerts = () => {
    // Get non-notified customers
    const customersToNotify = customersWithDebt
      .filter(c => !notifiedCustomers.includes(c.id))
      .map(c => c.id);
    
    if (customersToNotify.length === 0) {
      alert("Todos os clientes já foram notificados!");
      return;
    }
    
    // Set all as sending
    const sendingState: Record<string, boolean> = {};
    customersToNotify.forEach(id => {
      sendingState[id] = true;
    });
    setSending(sendingState);
    
    // Send with staggered timing
    customersToNotify.forEach((id, index) => {
      setTimeout(() => {
        setNotifiedCustomers(prev => [...prev, id]);
        setSending(prev => ({ ...prev, [id]: false }));
        
        if (index === customersToNotify.length - 1) {
          alert(`Alertas enviados para ${customersToNotify.length} clientes com sucesso!`);
        }
      }, 800 * (index + 1));
    });
  };
  
  const handleResendAlerts = () => {
    setNotifiedCustomers([]);
    alert("Status de notificações reiniciado. Você pode enviar alertas novamente.");
  };

  // Sort customers by debt amount (highest first)
  const sortedCustomers = [...customersWithDebt].sort((a, b) => b.debtAmount - a.debtAmount);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-amber-900">Alertas de Devedores</h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="primary" 
            size="lg"
            icon={<Bell size={24} />} 
            onClick={handleSendAllAlerts}
            disabled={customersWithDebt.length === 0 || customersWithDebt.every(c => notifiedCustomers.includes(c.id))}
          >
            Enviar Todos os Alertas
          </Button>
          
          <Button 
            variant="secondary" 
            size="lg"
            icon={<RefreshCw size={24} />} 
            onClick={handleResendAlerts}
            disabled={notifiedCustomers.length === 0}
          >
            Reiniciar Alertas
          </Button>
        </div>
      </div>

      <Card title="Clientes com Pagamentos Pendentes">
        {sortedCustomers.length === 0 ? (
          <div className="p-8 text-center">
            <AlertTriangle size={64} className="mx-auto text-amber-400 mb-3" />
            <h3 className="text-2xl font-bold text-gray-500">Nenhum cliente com dívidas pendentes</h3>
            <p className="text-gray-600 mt-2">Todos os pagamentos estão em dia!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-gray-600 mb-4">
              Envie alertas para clientes que possuem compras feitas no "fiado" e ainda não quitaram sua dívida.
              Os alertas são enviados por mensagem de texto para o número de telefone cadastrado.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-lg">
                <thead>
                  <tr className="text-left bg-amber-100">
                    <th className="px-4 py-3 rounded-tl-lg">Cliente</th>
                    <th className="px-4 py-3">Telefone</th>
                    <th className="px-4 py-3">Última Compra</th>
                    <th className="px-4 py-3 text-right">Valor Devido</th>
                    <th className="px-4 py-3 rounded-tr-lg text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCustomers.map((customer) => (
                    <tr 
                      key={customer.id} 
                      className={`border-b border-amber-100 ${
                        customer.debtAmount >= 100 ? 'bg-red-50' : 'hover:bg-amber-50'
                      } transition-colors`}
                    >
                      <td className="px-4 py-4 font-medium">
                        {customer.debtAmount >= 100 && (
                          <AlertTriangle size={20} className="inline-block mr-2 text-red-500" />
                        )}
                        {customer.name}
                      </td>
                      <td className="px-4 py-4">{customer.phone}</td>
                      <td className="px-4 py-4">
                        {new Date(customer.lastPurchaseDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-red-600">
                        R$ {customer.debtAmount.toFixed(2)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center space-x-2">
                          <Button 
                            variant={notifiedCustomers.includes(customer.id) ? 'secondary' : 'warning'} 
                            size="md"
                            icon={<Send size={20} />}
                            disabled={notifiedCustomers.includes(customer.id) || sending[customer.id]}
                            onClick={() => handleSendAlert(customer.id)}
                          >
                            {sending[customer.id] 
                              ? 'Enviando...' 
                              : notifiedCustomers.includes(customer.id) 
                                ? 'Enviado' 
                                : 'Enviar'
                            }
                          </Button>
                          
                          <Button 
                            variant="primary" 
                            size="md"
                            icon={<Phone size={20} />}
                            onClick={() => window.open(`tel:${customer.phone}`)}
                          >
                            Ligar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mt-6">
              <h3 className="text-xl font-bold text-amber-800 mb-2">Sobre os Alertas</h3>
              <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                <li>Os alertas são enviados por mensagem de texto para o número cadastrado</li>
                <li>O cliente recebe informações sobre o valor devido e formas de pagamento</li>
                <li>Alertas podem ser enviados novamente após 7 dias do envio anterior</li>
                <li>Clientes com valores acima de R$ 100,00 são destacados em vermelho</li>
              </ul>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};