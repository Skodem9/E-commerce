import { Product } from "./Product";

export interface Orders{
    id: string,
    userId: string,
    username: string,
    orderDate: string,
    items: Product[],
    total: number
}