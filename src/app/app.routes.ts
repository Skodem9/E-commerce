
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SignInComponent } from './signIn/signIn.component';
import { SignUpComponent } from './signUp/signUp.component';
import { MyOrdersComponent } from './myOrders/myOrders.component';
import { CheckoutComponent } from './checkout/checkout.component';
export const routes: Routes = [
    
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'signIn',
        component: SignInComponent
    },
    {
        path: 'signIn/signUp',
        component: SignUpComponent
    },
    {
        path: 'signUp',
        component: SignUpComponent
    },
    {
        path: 'myOrders',
        component: MyOrdersComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    }
];
