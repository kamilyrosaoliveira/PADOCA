import React, { useState } from 'react';
import { Header } from './components/Header';
import { DashboardPage } from './components/Dashboard/DashboardPage';
import { SalesPage } from './components/Sales/SalesPage';
import { CustomersPage } from './components/Customers/CustomersPage';
import { ProductsPage } from './components/Products/ProductsPage';
import { AlertsPage } from './components/Alerts/AlertsPage';

function App() {
  const [activePath, setActivePath] = useState('/');

  // Render the active page
  const renderPage = () => {
    switch (activePath) {
      case '/vendas':
        return <SalesPage />;
      case '/clientes':
        return <CustomersPage />;
      case '/produtos':
        return <ProductsPage />;
      case '/alertas':
        return <AlertsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Header activePath={activePath} setActivePath={setActivePath} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      
      {/* Accessibility Features */}
      <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-2 flex gap-2">
        <button 
          className="p-3 bg-amber-700 text-white rounded-full text-xl font-bold hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          onClick={() => {
            document.body.style.fontSize = document.body.style.fontSize === '120%' ? '100%' : '120%';
          }}
          aria-label="Aumentar tamanho da fonte"
          title="Aumentar tamanho da fonte"
        >
          A+
        </button>
        <button 
          className="p-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          onClick={() => {
            // Simple contrast toggle
            document.body.classList.toggle('high-contrast');
            const isHighContrast = document.body.classList.contains('high-contrast');
            
            // Apply high contrast styles
            if (isHighContrast) {
              document.documentElement.style.setProperty('--tw-bg-opacity', '1');
              document.documentElement.style.setProperty('--contrast-bg', 'rgb(254 243 199 / var(--tw-bg-opacity))');
              document.documentElement.style.setProperty('--contrast-text', '#000');
            } else {
              document.documentElement.style.setProperty('--contrast-bg', '');
              document.documentElement.style.setProperty('--contrast-text', '');
            }
          }}
          aria-label="Alternar alto contraste"
          title="Alternar alto contraste"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;