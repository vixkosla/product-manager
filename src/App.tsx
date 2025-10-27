import { useState } from 'react'
import './App.css'

import type { Product } from './types/Product'

import { useProducts } from './hooks/useProducts'

import Products from './components/Products'
import { AddProduct } from './components/AddProduct'

function App() {
  const { products, setProducts, loading } = useProducts();

  const [sortType, setSortType] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev])
  }

  const handleSaveUpdatedProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p))
  }

  return (
    <>
      <AddProduct open={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAdd={handleAddProduct} />

      {!loading && <div className="header">
        <button className="add_product" onClick={() => setIsAddProductOpen(true)}>
          Добавить товар
        </button>

        {/* <div className="controls"> */}
        <select value={sortType} onChange={e => setSortType(e.target.value as any)}>
          <option value="default">Без сортировки</option>
          <option value="price-asc">Цена ↑</option>
          <option value="price-desc">Цена ↓</option>
          <option value="rating">Рейтинг</option>
        </select>
        {/* </div> */}
      </div>}


      <Products products={products} loading={loading} sortType={sortType} onSave={handleSaveUpdatedProduct} />
    </>
  )
}

export default App
