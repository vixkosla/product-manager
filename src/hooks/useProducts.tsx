import { useEffect, useState } from 'react'
import { getProducts } from '../services/getProducts'

import type { Product } from '../types/Product'

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProducts().then((data) => {
            console.log(data);
            setProducts(data);
            setLoading(false);
        })
    }, []);

    return { products, setProducts, loading };
}