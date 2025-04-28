import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../header/services/user.service';
import { Orders } from '../header/interfaces/Orders';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myOrders',
  imports: [CommonModule, DatePipe],
  templateUrl: './myOrders.component.html',
  styleUrl: './myOrders.component.css'
})
export class MyOrdersComponent implements OnInit {
  orders: Orders[]=[]
  constructor(private http: HttpClient, private userService: UsersService){}

  ngOnInit(): void{
    this.loadUserOrders()
  }


  loadUserOrders(): void{
    this.userService.currentUser.subscribe(user =>{
      if(user){
          this.http.get<Orders[]>(`http://localhost:3000/Orders?userId=${user.id}`).subscribe(data =>{
              this.orders = data.map(order => ({...order, items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
          })).sort((a, b)=> new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
          })
      } else {
        this.orders = []
      }
  })
  } 

  cancelOrderButton(orderDate: string): boolean {
    const orderPlacedDate = new Date(orderDate)
    const currentDate = new Date()
    const timeDifference = currentDate.getTime() - orderPlacedDate.getTime()

    const hoursDifference = timeDifference / (1000 * 60 * 60)

    return hoursDifference > 48


  }

  cancelOrder(orderId: string): void {
    const orderToCancel = this.orders.find(order => order.id === orderId.toString())
    if(!orderToCancel) return

    this.http.post('http://localhost:3000/CanceledOrders', orderToCancel).subscribe(() => {
  })
  
  }
}
