import { useMemo, useState } from 'react'

import type { Product } from '../types/Product'
import { ViewProduct } from './ViewProduct'

interface Props {
    products: Product[],
    loading: boolean,
    sortType: string,
    onSave: (updated: Product) => void
}

export default function Products({ products, loading, sortType, onSave }: Props) {

    const [isViewProductOpen, setisViewProductOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);



    const sortedProducts = useMemo(() => {

        const list = [...products];

        switch (sortType) {
        case 'price-asc':
            return list.sort((a, b) => a.price - b.price)
        case 'price-desc':
            return list.sort((a, b) => b.price - a.price)
        case 'rating':
            return list.sort((a, b) => (a.rating?.rate ?? 0) - (b.rating?.rate ?? 0))
        default:
            return list;
        }
    }, [products, sortType])

    if (loading) return <p>Загрузка...</p>;
    if (!products) return <p>Нет данных о продуктах</p>;

    // const handleSave = (updated: Product) => {
    //     onSave(updated)
    //     // можно закрывать модалку здесь или в ViewProduct
    //     // closeView()
    // }

    const closeView = () => {
        setSelectedProduct(null);
        setisViewProductOpen(false);
    }

    const openView = (p: Product) => {
        setSelectedProduct(p);
        setisViewProductOpen(true);
    }

    return (
        <>

            <div className="container">
                <h1>🛍️ Список товаров</h1>
                <div className="grid">
                    {sortedProducts?.map(product => (
                        <div className="card" key={product.id} onMouseDown={() => openView(product)}>
                            <img src={product.image} alt={product.title} />
                            <h2>{product.title}</h2>
                            <p className="price">${product.price}</p>
                            <p className="category">{product.category}</p>
                        </div>
                    ))}
                </div>
            </div>

            <ViewProduct open={isViewProductOpen} product={selectedProduct} onClose={closeView} onSave={onSave} />
        </>
    )
}