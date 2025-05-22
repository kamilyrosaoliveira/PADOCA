import React from 'react';
import { Card } from '../ui/Card';
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { customers, products, sales, expenses } from '../../data/mockData';
import { SalesSummary } from './SalesSummary';
import { DebtAlerts } from './DebtAlerts';

export const DashboardPage: React.FC = () => {
  // Calculate summary statistics
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalCustomers = customers.length;
  const totalProducts = products.length;
  const totalDebt = customers.reduce((sum, customer) => sum + customer.debtAmount, 0);
  
  // Customers with debt
  const customersWithDebt = customers.filter(customer => customer.debtAmount > 0);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-amber-900">Resumo do Dia</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-l-8 border-amber-500">
          <div className="flex items-center">
            <div className="p-4 bg-amber-500 rounded-full">
              <DollarSign size={36} className="text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-600">Vendas do Dia</h3>
              <p className="text-4xl font-bold text-amber-800">R$ {totalSales.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-l-8 border-red-500">
          <div className="flex items-center">
            <div className="p-4 bg-red-500 rounded-full">
              <TrendingDown size={36} className="text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-600">Despesas</h3>
              <p className="text-4xl font-bold text-red-700">R$ {totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-l-8 border-blue-500">
          <div className="flex items-center">
            <div className="p-4 bg-blue-500 rounded-full">
              <Users size={36} className="text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-600">Clientes</h3>
              <p className="text-4xl font-bold text-blue-700">{totalCustomers}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-l-8 border-green-500">
          <div className="flex items-center">
            <div className="p-4 bg-green-500 rounded-full">
              <TrendingUp size={36} className="text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-600">Total a Receber</h3>
              <p className="text-4xl font-bold text-green-700">R$ {totalDebt.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Vendas Recentes">
          <SalesSummary />
        </Card>

        <Card title="Alertas de Clientes com Dívidas">
          <DebtAlerts customers={customersWithDebt} />
        </Card>
      </div>
    </div>
  );
};