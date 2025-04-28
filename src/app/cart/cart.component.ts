import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product} from '../header/interfaces/Product';
import { CartService } from '../header/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports:[CommonModule],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',

  
})
export class CartComponent implements OnInit {
    cartItems: Product[] = []
    cartCount: any
    clearingCart: any
    totalPrice: any
    
  
    constructor(
      private cartService: CartService,
      private router: Router

    ) {
      this.cartCount = this.cartService.cartCount
      this.totalPrice = this.cartService.getTotalPrice()
    }
  
   

  ngOnInit(): void {
      this.cartItems= this.cartService.getCartItems();
  }


  removeItem(item: Product): void{
    this.cartService.removeFromCart(item)
    this.cartItems = this.cartService.getCartItems()
    
  }

  clearCart(){
    this.cartService.clearCart()
    this.cartItems = this.cartService.getCartItems()
  }


  changeQuantity(item: Product, change: number): void {
    this.cartService.updateQuantity(item, change)
    this.cartItems = this.cartService.getCartItems()
  }

  checkout(){
    if (this.cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }
  
    this.cartService.setCheckoutItems(this.cartItems);
    this.router.navigate(['/checkout']);
  }

  
}
