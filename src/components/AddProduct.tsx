import { useState, useEffect } from "react";

import type { Product } from "../types/Product";

import { useCategories } from "../hooks/useCategories";

type Props = {
    open: boolean
    onClose: () => void,
    onAdd: (product: Product) => void
}

export const AddProduct = ({ open, onClose, onAdd }: Props) => {
    const { categories, loading } = useCategories();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (!open) {
            setTitle('')
            setPrice('')
            setDescription('')
            setImage('')
            setCategory('')
        }
    }, [open])


    if (!open) return null;


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newProduct: Product = {
            id: Date.now(), // генерируем уникальный id локально
            title: title.trim() || 'Название товара',
            price: Number(price) || Number(Math.random() * 1000),
            description: description.trim() || 'Описание',
            image: image.trim() || 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
            category: category.trim() || 'other',
            rating: { rate: 0, count: 0 },
        }

        onAdd(newProduct);
        onClose();
    }

    return (
        <>
            <div className="backdrop" id="backdrop" onMouseDown={onClose}>
                <div className="form-container" role="dialog" aria-modal="true" onMouseDown={e => e.stopPropagation()} >
                    <form onSubmit={handleSubmit}>
                        <input placeholder="title" value={title} type="text" onChange={(e) => setTitle(e.target.value)} />
                        <input value={price} placeholder="price" type="text" onChange={(e) => setPrice(e.target.value)} />
                        <input value={image} placeholder="Image URL" type="text" onChange={(e) => setImage(e.target.value)} />


                        <select>
                            <option value="">Выберите категорию</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        <textarea value={description} onChange={e => setDescription(e.target.value)} />

                        <div className="buttons-container">
                            <button type="submit" className="btn primary">Добавить</button>
                            <button type="button" className="btn secondary" onClick={onClose} id="cancelBtn">Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}