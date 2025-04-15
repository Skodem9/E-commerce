import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../header/services/cart.service';
import { Product } from '../header/interfaces/Product';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../header/services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  @Input() products: Product[] | null = null

  private productService = inject(ProductsService)
  private cartService = inject(CartService)
  private route = inject(ActivatedRoute)
  

  ngOnInit() {

    if(this.products && this.products.length > 0) {
      return
    }
    this.route.queryParams.subscribe(params => {
      if(params['sneakers']){
        this.fetchProducts('Sneakers')
      }
      else if (params['tshirts']){
        this.fetchProducts('Tshirts')
      }
      else if (params['trousers']){
        this.fetchProducts('Trousers')
      }
      else if (params['jackets']){
        this.fetchProducts('Jackets')
      }
      else if (params['cargo']){
        this.fetchProducts('Cargo')
      }
      else if (params['jeans']){
        this.fetchProducts('Jeans')
      }
      else if (params['hoodies']){
        this.fetchProducts('Hoodies')
      }
      else if (params['casuals']){
        this.fetchProducts('Casual')
      }
    })

  }

  fetchProducts(productType: string){
    this.productService.getProducts().subscribe(data =>{
      this.products = data.filter(product => product.category.toLowerCase() === productType.toLowerCase())
    })
  }

  addToCart(product: Product){
    this.cartService.addToCart(product)
    
  }


}
