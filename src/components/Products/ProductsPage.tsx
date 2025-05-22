import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, Search, Package, Edit, AlertTriangle } from 'lucide-react';
import { products as initialProducts } from '../../data/mockData';
import { Product } from '../../types';
import { ProductForm } from './ProductForm';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...product, id: editingProduct.id } : p
      ));
      setEditingProduct(null);
    } else {
      // Add new product
      const newProduct = {
        ...product,
        id: (products.length + 1).toString(),
      };
      setProducts([...products, newProduct]);
    }
    setShowAddForm(false);
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      'bread': 'Pães',
      'cake': 'Bolos',
      'pastry': 'Doces',
      'drink': 'Bebidas',
      'other': 'Outros'
    };
    return categories[category] || category;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-amber-900">Produtos</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="pl-10 pr-4 py-3 w-full text-lg border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button 
            variant="primary" 
            icon={<Plus size={24} />} 
            onClick={() => {
              setEditingProduct(null);
              setShowAddForm(true);
            }}
          >
            Novo Produto
          </Button>
        </div>
      </div>

      {(showAddForm || editingProduct) && (
        <Card title={editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}>
          <ProductForm 
            product={editingProduct || undefined} 
            onSubmit={handleSaveProduct} 
            onCancel={() => {
              setShowAddForm(false);
              setEditingProduct(null);
            }}
          />
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="border border-amber-100">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-3 py-1 mb-2 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                    {getCategoryLabel(product.category)}
                  </span>
                  <h3 className="text-2xl font-bold text-amber-900">{product.name}</h3>
                </div>
                <span className="text-2xl font-bold text-amber-600">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center">
                <Package size={24} className="mr-2 text-amber-700" />
                <div className="text-lg">
                  <span className="font-medium">Estoque:</span>{' '}
                  <span className={`font-bold ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                    {product.stock} unidades
                  </span>
                </div>
                {product.stock < 10 && (
                  <AlertTriangle size={24} className="ml-2 text-red-500" />
                )}
              </div>

              <div className="flex space-x-3 pt-2">
                <Button 
                  variant="primary" 
                  icon={<Edit size={20} />}
                  onClick={() => {
                    setEditingProduct(product);
                    setShowAddForm(true);
                  }}
                >
                  Editar
                </Button>
                
                <Button 
                  variant="secondary" 
                  icon={<Plus size={20} />}
                  onClick={() => {
                    setProducts(products.map(p => 
                      p.id === product.id ? { ...p, stock: p.stock + 10 } : p
                    ));
                    alert(`Estoque de ${product.name} atualizado!`);
                  }}
                >
                  Adicionar Estoque
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredProducts.length === 0 && (
          <div className="col-span-full p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-500">Nenhum produto encontrado</h3>
            <p className="text-gray-600 mt-2">Tente outra busca ou adicione um novo produto</p>
          </div>
        )}
      </div>
    </div>
  );
};