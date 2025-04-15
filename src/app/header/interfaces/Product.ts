export interface Product{
    id: string,
    name: string,
    img: string,
    price: number,
    quantity: number,
    size: (string |number)[],
    category: string,
    gender: string
}