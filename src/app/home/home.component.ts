import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { Product } from '../header/interfaces/Product';
import { ProductsService } from '../header/services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showSneakers = false;
  showTshirts = false;
  showTrousers = false;
  showJackets = false;
  showCargo = false;
  showJeans = false;
  showHoodies = false;
  showCasuals = false;

  showHome = true;

  searchResults: Product[] = [];
  allProducts: Product[] = [];
  uniqueSizes: string[] = [];

  selectedSize: string | null = null;
  selectedGender: string | null = null;
  priceRange = { min: 0, max: 1000 };
  selectedSort: string | null = null;

  constructor(private router: ActivatedRoute, private prodcutsService: ProductsService) {}

  ngOnInit() {
    this.prodcutsService.getProducts().subscribe(products => {
      this.allProducts = products;
    });

    this.router.queryParams.subscribe(params => {
      this.showSneakers = params['sneakers'] === 'true';
      this.showTshirts = params['tshirts'] === 'true';
      this.showTrousers = params['trousers'] === 'true';
      this.showJackets = params['jackets'] === 'true';
      this.showCargo = params['cargo'] === 'true';
      this.showJeans = params['jeans'] === 'true';
      this.showHoodies = params['hoodies'] === 'true';
      this.showCasuals = params['casuals'] === 'true';

      const search = params['search'];
      if (search) {
        const lowerSearch = search.toLowerCase();
        this.searchResults = this.allProducts.filter((product) => {
          return product.category.toLowerCase() == lowerSearch
        }
        );
        this.extractUniqueSizes();
      } else {
        this.searchResults = [];
        this.uniqueSizes = [];
      }

      this.showHome = !(
        this.showSneakers || this.showTshirts || this.showCargo ||
        this.showCasuals || this.showHoodies || this.showJackets ||
        this.showJeans || this.showTrousers
      );
    });
  }

  getFilteredResults(): Product[] {
    let filtered = this.searchResults.filter(product => {
      const price = Number(product.price);
      const matchSize = this.selectedSize ? product.size.map(size => String(size)).includes(this.selectedSize) : true;
      const matchGender = this.selectedGender ? product.gender === this.selectedGender : true;
      const matchPrice = price >= this.priceRange.min && price <= this.priceRange.max;

      return matchSize && matchGender && matchPrice;
    });

    if (this.selectedSort === 'asc') {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (this.selectedSort === 'desc') {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return filtered;
  }

  extractUniqueSizes() {
    const sizeSet = new Set<string>();
    this.searchResults.forEach(product => {
      product.size?.forEach(size => sizeSet.add(String(size)));
    });
    this.uniqueSizes = Array.from(sizeSet);
  }

  clearFilters() {
    this.selectedSize = null;
    this.selectedGender = null;
    this.priceRange = { min: 0, max: 1000 };
    this.selectedSort = null;
  }
}