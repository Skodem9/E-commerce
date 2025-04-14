import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showSneakers = false
  showTshirts = false
  showTrousers = false
  showJackets = false
  showCargo = false
  showJeans = false
  showHoodies = false
  showCasuals = false

  showHome = true
  
  constructor(private router: ActivatedRoute){}


ngOnInit(){
    this.router.queryParams.subscribe(params =>{
      this.showSneakers = params['sneakers'] === 'true'
      this.showTshirts = params['tshirts'] === 'true'
      this.showTrousers = params['trousers'] === 'true'
      this.showJackets = params['jackets'] === 'true'
      this.showCargo = params['cargo'] === 'true'
      this.showJeans = params['jeans'] === 'true'
      this.showHoodies = params['hoodies'] === 'true'
      this.showCasuals = params['casuals'] === 'true'

      this.showHome = !(
        this.showSneakers || this.showTshirts || this.showCargo ||
        this.showCasuals || this.showHoodies || this.showJackets ||
        this.showJeans || this.showTrousers
      )

    })
}
}
