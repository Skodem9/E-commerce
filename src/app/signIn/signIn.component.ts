import { Component} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../header/services/user.service';
import { Users } from '../header/interfaces/users';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-signIn',
  imports: [CommonModule, FormsModule, RouterLink ],
  templateUrl: './signIn.component.html',
  styleUrl: './signIn.component.css'
})
export class SignInComponent {
  username = '';
  password = '';
  errorMessage ='';


  constructor(private userService: UsersService, private router: Router){}

  signIn(){
    this.userService.getUsers().subscribe((users: Users[]) =>{
      const matchedUser = users.find(
        user => user.username === this.username && user.password === this.password
      )

      if(matchedUser){
        this.userService.setCurrentUser(matchedUser)
        this.router.navigate(['/home'])
      }
      else{
        this.errorMessage = 'Invalid username or password'
      }
    })
  }
}
