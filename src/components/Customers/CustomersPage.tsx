import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, Search, Phone, DollarSign, Bell } from 'lucide-react';
import { customers as initialCustomers } from '../../data/mockData';
import { Customer } from '../../types';
import { CustomerForm } from './CustomerForm';

export const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleSendAlert = (customerId: string) => {
    // In a real app, this would send an actual notification
    setCustomers(customers.map(customer => 
      customer.id === customerId 
        ? { ...customer, notificationSent: true } 
        : customer
    ));
    alert('Alerta enviado para o cliente com sucesso!');
  };

  const handleAddCustomer = (customer: Customer) => {
    const newCustomer = {
      ...customer,
      id: (customers.length + 1).toString(),
      lastPurchaseDate: new Date().toISOString().split('T')[0],
      notificationSent: false
    };
    
    setCustomers([...customers, newCustomer]);
    setShowAddForm(false);
  };

  const handleRecordPayment = (customerId: string, amount: number) => {
    setCustomers(customers.map(customer => 
      customer.id === customerId 
        ? { 
            ...customer, 
            debtAmount: Math.max(0, customer.debtAmount - amount),
            lastPaymentDate: new Date().toISOString().split('T')[0]
          } 
        : customer
    ));
    alert(`Pagamento de R$ ${amount.toFixed(2)} registrado com sucesso!`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-amber-900">Clientes</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar clientes..."
              className="pl-10 pr-4 py-3 w-full text-lg border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button 
            variant="primary" 
            icon={<Plus size={24} />} 
            onClick={() => setShowAddForm(true)}
          >
            Novo Cliente
          </Button>
        </div>
      </div>

      {showAddForm && (
        <Card title="Adicionar Novo Cliente">
          <CustomerForm 
            onSubmit={handleAddCustomer} 
            onCancel={() => setShowAddForm(false)}
          />
        </Card>
      )}

      {selectedCustomer && (
        <Card title={`Registrar Pagamento - ${selectedCustomer.name}`}>
          <div className="space-y-4">
            <p className="text-xl">Dívida atual: <span className="font-bold text-red-600">R$ {selectedCustomer.debtAmount.toFixed(2)}</span></p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-1/2">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Valor do Pagamento
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg">R$</span>
                  </div>
                  <input
                    type="number"
                    id="paymentAmount"
                    step="0.01"
                    min="0"
                    max={selectedCustomer.debtAmount}
                    defaultValue={selectedCustomer.debtAmount.toFixed(2)}
                    className="pl-10 pr-4 py-3 w-full text-lg border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 self-end">
                <Button 
                  variant="success" 
                  onClick={() => {
                    const input = document.getElementById('paymentAmount') as HTMLInputElement;
                    const amount = parseFloat(input.value);
                    if (amount > 0 && amount <= selectedCustomer.debtAmount) {
                      handleRecordPayment(selectedCustomer.id, amount);
                      setSelectedCustomer(null);
                    } else {
                      alert('Por favor, insira um valor válido.');
                    }
                  }}
                >
                  Confirmar Pagamento
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setSelectedCustomer(null)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="border border-amber-100">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-amber-900">{customer.name}</h3>
                {customer.debtAmount > 0 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-lg font-medium bg-red-100 text-red-800">
                    Deve R$ {customer.debtAmount.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="text-lg">
                <div className="flex items-center text-gray-700 mb-2">
                  <Phone size={24} className="mr-2 text-amber-700" />
                  {customer.phone}
                </div>
                {customer.email && (
                  <div className="text-gray-700 mb-2">
                    <strong>Email:</strong> {customer.email}
                  </div>
                )}
                <div className="text-gray-700">
                  <strong>Última compra:</strong>{' '}
                  {new Date(customer.lastPurchaseDate).toLocaleDateString('pt-BR')}
                </div>
                {customer.lastPaymentDate && (
                  <div className="text-gray-700">
                    <strong>Último pagamento:</strong>{' '}
                    {new Date(customer.lastPaymentDate).toLocaleDateString('pt-BR')}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {customer.debtAmount > 0 && (
                  <>
                    <Button 
                      variant="success" 
                      icon={<DollarSign size={20} />}
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      Registrar Pagamento
                    </Button>
                    
                    <Button 
                      variant={customer.notificationSent ? 'secondary' : 'warning'} 
                      icon={<Bell size={20} />}
                      disabled={customer.notificationSent}
                      onClick={() => handleSendAlert(customer.id)}
                    >
                      {customer.notificationSent ? 'Alerta Enviado' : 'Enviar Alerta'}
                    </Button>
                  </>
                )}
                
                <Button 
                  variant="primary" 
                  icon={<Phone size={20} />}
                  onClick={() => window.open(`tel:${customer.phone}`)}
                >
                  Ligar
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="col-span-full p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-500">Nenhum cliente encontrado</h3>
            <p className="text-gray-600 mt-2">Tente outra busca ou adicione um novo cliente</p>
          </div>
        )}
      </div>
    </div>
  );
};