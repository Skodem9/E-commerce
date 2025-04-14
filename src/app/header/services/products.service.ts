import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../interfaces/Product";

@Injectable({
    providedIn: 'root'
})
export class ProductsService{
    

    url="http://localhost:3000/"

    constructor(private http:HttpClient) { }

    getProducts(productType: string): Observable<Product[]>{
        return this.http.get<any[]>(`${this.url}${productType}`);
    }
}