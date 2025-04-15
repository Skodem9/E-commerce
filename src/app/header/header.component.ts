import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { Users } from './interfaces/users';
import { UsersService } from './services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
private cartService = inject(CartService)
cartItems: any;
cartCount: any;
currentUser: Users | null = null
searchProduct: string = ''

  constructor(
    private router: Router,
    private userService: UsersService

  ) {
    this.cartItems = this.cartService.cartItems;
    this.cartCount = this.cartService.cartCount;
    
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user
    })
  }


  signOut(){
    this.userService.clearCurrentUser()
    this.router.navigate(['/singIn'])
  }

  onSearch(){
    if(this.searchProduct.trim()){
      this.router.navigate(['/home'], { queryParams: { search: this.searchProduct.trim()}})
    }
  }
}
