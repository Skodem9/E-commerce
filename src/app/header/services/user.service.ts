import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Users } from "../interfaces/users";

@Injectable({
    providedIn: 'root'
})
export class UsersService{
    

    private apiUrl="http://localhost:3000/Users"

    private currentUserSubject = new BehaviorSubject<Users | null>(null)
    currentUser = this.currentUserSubject.asObservable()

    constructor(private http:HttpClient) { }

    getUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(this.apiUrl)
    }
   
    addUser(user: Users): Observable<Users> {
        return this.http.post<Users>(this.apiUrl, user)
    }

    setCurrentUser(user: Users){
        this.currentUserSubject.next(user)
    }   

    clearCurrentUser(){
        this.currentUserSubject.next(null)
    }
    
}