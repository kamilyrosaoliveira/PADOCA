import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Product } from '../../types';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ 
  product, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      price: 0,
      category: 'bread',
      stock: 0,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    let processedValue: string | number = value;
    
    if (type === 'number') {
      processedValue = value === '' ? 0 : parseFloat(value);
    }
    
    setFormData({
      ...formData,
      [name]: processedValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || formData.price === undefined) {
      alert('Por favor, preencha pelo menos o nome e o preço do produto.');
      return;
    }
    
    // Submit the form data
    onSubmit(formData as Product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-xl font-medium text-gray-700 mb-2">
            Nome do Produto *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full text-lg p-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-xl font-medium text-gray-700 mb-2">
            Preço (R$) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full text-lg p-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-xl font-medium text-gray-700 mb-2">
            Categoria *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full text-lg p-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          >
            <option value="bread">Pães</option>
            <option value="cake">Bolos</option>
            <option value="pastry">Doces</option>
            <option value="drink">Bebidas</option>
            <option value="other">Outros</option>
          </select>
        </div>

        <div>
          <label htmlFor="stock" className="block text-xl font-medium text-gray-700 mb-2">
            Estoque (unidades) *
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            min="0"
            step="1"
            value={formData.stock}
            onChange={handleChange}
            className="w-full text-lg p-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="secondary" size="lg" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" size="lg">
          {product ? 'Atualizar Produto' : 'Salvar Produto'}
        </Button>
      </div>
    </form>
  );
};