import React from 'react';
import { Home, DollarSign, ShoppingCart, Users, Package, AlertTriangle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from './ui/Link';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: <Home size={32} />, label: 'Início', path: '/' },
  { icon: <DollarSign size={32} />, label: 'Vendas', path: '/vendas' },
  { icon: <Users size={32} />, label: 'Clientes', path: '/clientes' },
  { icon: <Package size={32} />, label: 'Produtos', path: '/produtos' },
  { icon: <AlertTriangle size={32} />, label: 'Alertas', path: '/alertas' }
];

export const Header: React.FC<{ activePath: string; setActivePath: (path: string) => void }> = ({ 
  activePath,
  setActivePath
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    setActivePath(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-amber-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <DollarSign size={36} className="text-amber-200" />
            <h1 className="text-3xl font-bold">PADOCA</h1>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 bg-amber-800 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    active={activePath === item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                      activePath === item.path 
                        ? 'bg-amber-800 text-amber-100' 
                        : 'text-amber-200 hover:bg-amber-800 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="text-lg mt-1">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item.path} className="w-full">
                  <Link
                    active={activePath === item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                      activePath === item.path 
                        ? 'bg-amber-800 text-amber-100' 
                        : 'text-amber-200 hover:bg-amber-800 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="text-xl">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};