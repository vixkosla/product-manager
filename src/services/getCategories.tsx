export async function getCategories() {
    try {
        const res = await fetch('https://fakestoreapi.com/products/categories');

        const data = await res.json();

        return data;
    } catch (err) {
        console.log('[getCategory] Error:', err);
        throw err;
        return [];
    }
}