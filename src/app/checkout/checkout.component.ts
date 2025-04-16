import { Component, OnInit } from '@angular/core';
import { CartService } from '../header/services/cart.service';
import { Product } from '../header/interfaces/Product';
import { UsersService } from '../header/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutItems: (Product) [] = [];
  total: number = 0;
  totalPrice: any


  constructor(
    private cartService: CartService,
    private userService: UsersService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutItems = this.cartService.getCheckoutItems();
    this.total = this.cartService.getTotalPrice()();
  }

  placeOrder(): void {
    this.userService.currentUser.subscribe(user => {
      console.log('placing order for user:', user)
      if (user) {
        const order = {
          id: new Date().getTime().toString(),
          userId: user.id,
          username: user.username,
          date: new Date().toISOString(),
          items: this.checkoutItems,
          total: this.total
        };
        this.http.post('http://localhost:3000/Orders', order).subscribe(() => {
          alert('Order placed successfully!');
          this.cartService.clearCart();
          this.cartService.clearCheckout()
          this.router.navigate(['/myOrders']);
        });
      } else {
        alert('Please login to place order.');
      }
    });
  }

  
  totalAmount(){
    this.totalPrice = this.cartService.totalPrice
  }
}