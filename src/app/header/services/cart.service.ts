import { Injectable, signal } from "@angular/core";
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
        this.updateCartCount()
        this.calculateTotalPrice()

    }

    getCartItems() {
        return this.cartItemsSignal()
    }

    cartItems = this.cartItemsSignal;

    addToCart(item: Product){
        item.price = Number(item.price)
        const current = this.cartItemsSignal()
        const existingItem = current.findIndex(i => i.id ===item.id)

        if(existingItem !== -1){
            const updated = [...current]
            updated[existingItem].quantity = (updated[existingItem].quantity || 1) + 1
            this.cartItemsSignal.set(updated)

        } else {

        const itemQuantity = {...item, quantity: 1}
        this.cartItemsSignal.set([...current, itemQuantity])
        }
        this.updateCartCount()
        this.calculateTotalPrice()
    }

    removeFromCart(item: Product) {
        const current = this.cartItemsSignal()
        const updated = current.filter(i => i.id !== item.id)
        this.cartItemsSignal.set(updated)
        this.updateCartCount()
        this.calculateTotalPrice()
    }

    clearCheckout(){
        this.checkoutItems = []
    }
    clearCart() {
        this.cartItemsSignal.set([])
        this.cartCount.set(0)
        this.totalPrice.set(0)
        
    }

    updateQuantity(item: Product, change: number){
        const current = this.cartItemsSignal()
        const updated = current.map(i =>
            i.id === item.id ? {...i, quantity: i.quantity + change} : i
        ).filter(i => i.quantity > 0)
        this.cartItemsSignal.set(updated)
        this.updateCartCount()
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

    updateCartCount(){
        const current = this.cartItemsSignal()
        const totalCount = current.reduce((sum, item) => sum + (item.quantity || 0), 0) 
        this.cartCount.set(totalCount)
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