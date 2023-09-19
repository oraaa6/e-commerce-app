import { Product } from "@/types/products.types"

async function getProduct(productId: string) {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`)

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return response.json()
}


export default async function ProductPage({
    params,

}: {
    params: { slug: string }

}) {
    const idIndex = params.slug.indexOf('-');
    const product: Product = await getProduct(params.slug.slice(idIndex + 1))
    return <h1>{product.title}</h1>;
}
