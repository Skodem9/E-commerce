import { Component } from '@angular/core';
import { Users } from '../header/interfaces/users';
import { UsersService } from '../header/services/user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signUp',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './signUp.component.html',
  styleUrl: './signUp.component.css'
})
export class SignUpComponent {
    fullname = '';
    username = '';
    email = '';
    password = '';
    id = ''

    constructor(private userService: UsersService, private router: Router){}

    addUser(){
        this.userService.getUsers().subscribe(users =>{
            const userExists = users.some(
                user => user.email ===this.email || user.username === this.username
            )
        if(userExists){
            alert('User already exists')
        }
        else{
            const newUser: Users = {
                id: Date.now().toString(),
                fullname: this.fullname,
                username: this.username,
                email: this.email,
                password: this.password,
            }
        
        

        this.userService.addUser(newUser).subscribe(()=>{
            alert('User registered successfully')
            this.fullname = ''
            this.username = ''
            this.email = ''
            this.password = ''
            this.id = ''
            this.router.navigate(['/signIn'])
        })

      }
    })
}
}
