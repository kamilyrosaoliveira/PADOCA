import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Plus, Minus, ShoppingCart, X } from 'lucide-react';
import { Customer, Product, Sale } from '../../types';

interface NewSaleFormProps {
  customers: Customer[];
  products: Product[];
  onSubmit: (sale: Sale) => void;
  onCancel: () => void;
}

interface SaleItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  unitPrice: number;
}

export const NewSaleForm: React.FC<NewSaleFormProps> = ({ 
  customers, 
  products, 
  onSubmit, 
  onCancel 
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'credit'>('cash');
  const [items, setItems] = useState<SaleItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  // Update total when items change
  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + item.price, 0);
    setTotal(newTotal);
  }, [items]);

  const handleAddItem = () => {
    if (!selectedProduct || quantity <= 0) return;
    
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;
    
    const existingItemIndex = items.findIndex(item => item.productId === selectedProduct);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...items];
      const item = updatedItems[existingItemIndex];
      item.quantity += quantity;
      item.price = item.unitPrice * item.quantity;
      setItems(updatedItems);
    } else {
      // Add new item
      const newItem: SaleItem = {
        productId: product.id,
        name: product.name,
        quantity,
        unitPrice: product.price,
        price: product.price * quantity
      };
      setItems([...items, newItem]);
    }
    
    // Reset selection
    setSelectedProduct('');
    setQuantity(1);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      alert('Por favor, adicione pelo menos um item à venda.');
      return;
    }
    
    // Create sale object
    const sale: Sale = {
      id: '', // Will be set by parent component
      date: new Date().toISOString(),
      customerId: selectedCustomer || undefined,
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      })),
      total,
      paymentMethod,
      paid: paymentMethod !== 'credit'
    };
    
    onSubmit(sale);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="customer" className="block text-xl font-medium text-gray-700 mb-2">
            Cliente (opcional)
          </label>
          <select
            id="customer"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="w-full text-lg p-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="">Selecione um cliente</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-xl font-medium text-gray-700 mb-2">
            Forma de Pagamento
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card' | 'credit')}
            className="w-full text-lg p-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="cash">Dinheiro</option>
            <option value="card">Cartão</option>
            <option value="credit">Fiado</option>
          </select>
          {paymentMethod === 'credit' && !selectedCustomer && (
            <p className="mt-2 text-red-600">
              ⚠️ Para vendas fiado, você deve selecionar um cliente.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-b border-amber-200 py-6">
        <h3 className="text-xl font-semibold text-amber-800 mb-4">Adicionar Produtos</h3>
        
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-grow min-w-[200px]">
            <label htmlFor="product" className="block text-lg font-medium text-gray-700 mb-2">
              Produto
            </label>
            <select
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full text-lg p-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">Selecione um produto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - R$ {product.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="w-32">
            <label htmlFor="quantity" className="block text-lg font-medium text-gray-700 mb-2">
              Qtd
            </label>
            <div className="flex">
              <button
                type="button"
                className="bg-amber-100 p-3 rounded-l-lg border-2 border-r-0 border-amber-200"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={20} />
              </button>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full text-lg p-3 text-center border-y-2 border-amber-200 focus:outline-none focus:ring-0 focus:border-amber-200"
              />
              <button
                type="button"
                className="bg-amber-100 p-3 rounded-r-lg border-2 border-l-0 border-amber-200"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <Button 
            type="button"
            variant="primary" 
            icon={<Plus size={20} />}
            onClick={handleAddItem}
            disabled={!selectedProduct}
          >
            Adicionar
          </Button>
        </div>
      </div>

      {/* Items list */}
      <div>
        <h3 className="text-xl font-semibold text-amber-800 mb-4">Itens da Venda</h3>
        
        {items.length === 0 ? (
          <div className="p-6 text-center border-2 border-dashed border-amber-200 rounded-lg">
            <ShoppingCart size={48} className="mx-auto text-amber-300 mb-2" />
            <p className="text-xl text-amber-800">Nenhum item adicionado</p>
            <p className="text-gray-600">Adicione produtos à venda usando o formulário acima</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-4 bg-amber-50 rounded-lg"
              >
                <div className="flex-grow">
                  <h4 className="text-xl font-semibold">{item.name}</h4>
                  <div className="flex text-gray-600">
                    <span>{item.quantity} x R$ {item.unitPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold mb-1">
                    R$ {item.price.toFixed(2)}
                  </div>
                  <Button 
                    type="button"
                    variant="danger" 
                    size="sm"
                    icon={<X size={16} />}
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remover
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center p-4 bg-amber-100 rounded-lg">
              <h3 className="text-2xl font-bold">Total</h3>
              <span className="text-3xl font-bold">R$ {total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="secondary" size="lg" onClick={onCancel}>
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          size="lg"
          disabled={items.length === 0 || (paymentMethod === 'credit' && !selectedCustomer)}
        >
          Finalizar Venda
        </Button>
      </div>
    </form>
  );
};