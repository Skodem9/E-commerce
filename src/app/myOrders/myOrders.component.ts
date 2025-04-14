import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../header/services/user.service';
import { Orders } from '../header/interfaces/Orders';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myOrders',
  imports: [CommonModule],
  templateUrl: './myOrders.component.html',
  styleUrl: './myOrders.component.css'
})
export class MyOrdersComponent {
  orders: Orders[]=[]

  constructor(private http: HttpClient, private userService: UsersService){}

  ngOnInit(): void{
    this.userService.currentUser.subscribe(user =>{
        if(user){
            this.http.get<Orders[]>(`http://localhost:3000/Orders?userId=${user.id}`).subscribe(data =>{
                this.orders = data.sort((a, b)=> new Date(b.date).getTime() - new Date(a.date).getTime())
            })
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

  cancelOrder(orderId: number): void {
    const orderToCancel = this.orders.find(order => order.id === orderId)
    if(!orderToCancel) return

    this.http.post('http://localhost:3000/CanceledOrders', orderToCancel).subscribe(() => {
      console.log('order moved to CanceledOrders')

      this.orders = this.orders.filter(order => order.id !==orderId)
    })

  }
}
