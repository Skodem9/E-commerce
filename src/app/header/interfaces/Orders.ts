import { Product } from "./Product";

export interface Orders{
    id: number,
    userId: number,
    username: string,
    date: string,
    items: Product[],
    total: number
}