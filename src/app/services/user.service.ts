import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
inValiduserAuth= new EventEmitter<boolean>(false)
  constructor(private http:HttpClient, private route:Router) { }
  userSignUp(user: SignUp) {
    //api call code will be here
    this.http.post('http://localhost:3000/users', user, { observe: 'response' }).subscribe((result) => {
      // this.isSellerLoggedIn.next(true);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        console.warn(result.body);
        this.route.navigate(['']); 
      }
    });
  }
  userLogin(data: login) {
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&&password=${data.password}`,
    {observe:'response'}).subscribe((result)=>{
      if(result && result.body?.length){
        this.inValiduserAuth.emit(false);
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.route.navigate(['']); 
      }
      else{
        this.inValiduserAuth.emit(true);
      }
    })
  }
  

  userAuthReload() {
    if (localStorage.getItem('user')) {
      // this.isSellerLoggedIn.next(true);
      this.route.navigate(['']);
    }
  }
}
