import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../interfaces/Product";

@Injectable({
    providedIn: 'root'
})
export class CartService{
    private cartItemsSignal = signal<Product[]>([])
    cartCount = signal(0)
    totalPrice = signal(0)
    checkoutItems: Product[] = [];


    constructor(){
        this.cartCount.set(this.cartItemsSignal().length)
        this.calculateTotalPrice()

    }

    getCartItems() {
        return this.cartItemsSignal()
    }

    cartItems = this.cartItemsSignal;

    addToCart(item: Product){
        item.price = Number(item.price)
        const itemQuantity = {...item, quantity: item.quantity ?? 1}
        const current = this.cartItemsSignal()
        const updated = [...current, itemQuantity]
        this.cartItemsSignal.set(updated)
        this.cartCount.set(updated.length)
        this.calculateTotalPrice()
    }

    removeFromCart(item: Product) {
        const current = this.cartItemsSignal()
        const updated = current.filter(i => i.id !== item.id)
        this.cartItemsSignal.set(updated)
        this.cartCount.set(updated.length)
        this.calculateTotalPrice()
    }

    clearCart() {
        this.cartItems.set([])
        this.cartCount.set(0)
        this.totalPrice.set(0)
    }

    updateQuantity(item: Product, change: number){
        const current = this.cartItemsSignal()
        const updated = current.map(i =>
            i.id === item.id ? {...i, quantity: i.quantity + change} : i
        )
        this.cartItemsSignal.set(updated)
        this.calculateTotalPrice()
    }

    calculateTotalPrice(){
        let total = 0 
        const items = this.cartItemsSignal()
        for (let i=0; i<items.length; i++){
            const price = Number(items[i].price)
            if(!isNaN(price)){
                total +=price * items[i].quantity
            }
        }
        this.totalPrice.set(total)
    }

    getTotalPrice(){
        return this.totalPrice
    }

    setCheckoutItems(items: Product[]) {
        this.checkoutItems = items;
      }

      getCheckoutItems(): Product[] {
        return this.checkoutItems;
      }


    

    
}