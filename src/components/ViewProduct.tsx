import { useState, useEffect } from 'react'

import type { Product } from '../types/Product'

type Props = {
    open: boolean,
    product?: Product | null,
    onClose: () => void
    onSave: (updated: Product) => void
}

export const ViewProduct = ({ open, product, onClose, onSave }: Props) => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        if (open && product) {
            setTitle(product.title ?? '')
            setPrice(String(product.price ?? ''))
        }
    }, [open, product])

    if (!open || !product) return null

    const handleChangeTitle = (value: string) => {
        setTitle(value)
        onSave({ ...product, title: value })
    }

    const handleChangePrice = (value: string) => {
        setPrice(value)
        const num = Number(value)
        if (!isNaN(num)) {
            onSave({ ...product, price: num })
        }
    }


    return (
        <>
            <div className="backdrop" onMouseDown={onClose}>
                <div className="view-container" onMouseDown={e => e.stopPropagation()}>
                    <h3>Информация о товаре</h3>

                    <div className="field">
                        <label>Название:</label>
                        <input
                            value={title}
                            onChange={e => handleChangeTitle(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label>Цена:</label>
                        <input
                            value={price}
                            onChange={e => handleChangePrice(e.target.value)}
                        />
                    </div>

                    <div className="field static">
                        <label>Категория:</label>
                        <p>{product.category}</p>
                    </div>

                    <div className="field description static">
                        <label>Описание:</label>
                        <p>{product.description}</p>
                    </div>

                    <img
                        src={product.image}
                        alt={product.title}
                        style={{ maxWidth: '150px', marginTop: '10px' }}
                    />
                </div>
            </div>
        </>
    )
}