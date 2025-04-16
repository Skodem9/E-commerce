import { Product } from "./Product";

export interface Orders{
    id: string,
    userId: string,
    username: string,
    date: string,
    items: Product[],
    total: number
}