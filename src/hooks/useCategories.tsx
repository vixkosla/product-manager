import { useEffect, useState } from "react";
import { getCategories } from "../services/getCategories";


export function useCategories() {
    const [categories, setCategories] = useState<string[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories().then((data) => {
            // console.log(data);
            setCategories(data);
            setLoading(false);
        })
    })

    return { categories, loading }
}