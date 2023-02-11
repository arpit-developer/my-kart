// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { cart, login, SignUp, product } from '../data-type';
// import { ProductService } from '../services/product.service';
// import { UserService } from '../services/user.service';

// @Component({
//   selector: 'app-user-auth',
//   templateUrl: './user-auth.component.html',
//   styleUrls: ['./user-auth.component.css']
// })
// export class UserAuthComponent implements OnInit {
//   authError: string = "";
//   constructor(private user: UserService, private route: Router, private product: ProductService) { }
//   showLogin = false;
//   ngOnInit(): void {
//     this.user.userAuthReload();
//   }
//   signUp(data: SignUp): void {
//     this.user.userSignUp(data)
//   }
//   login(data: login): void {
//     this.user.userLogin(data);
//     this.user.inValiduserAuth.subscribe((result) => {
//       if (result) {
//         this.authError = "Please enter Valid Credentials";
//       }
//       else {
//         this.localCartToRemoteCart();
//       }
//     })
//   }
//   openLogin() {
//     this.showLogin = true;
//   }
//   openSignUp() {
//     this.showLogin = false;
//   }
//   localCartToRemoteCart() {
//     let data = localStorage.getItem('localCart');
//     let user = localStorage.getItem('user');
//     let userId = user && JSON.parse(user).id;
//     if (data) {
//       let cartDataList:product[]= JSON.parse(data);
//       console.log(cartDataList,user,userId)
//       //user and userID is not working
//       cartDataList.forEach((product: product,index: number) => {
//         let cartData: cart = {
//           ...product,
//           productId: product.id,
//           userId
//         };
//         delete cartData.id
//         setTimeout(() => {
//           this.product.addToCart(cartData).subscribe((result) => {
//             if (result) {
//               console.warn("Item Stored in DB");
//             }
//           })
//           if(cartDataList.length===index+1){
//             localStorage.removeItem('localCart')
//           }
//         }, 500);
//       });
//     }
//     setTimeout(() => {
//       this.product.getCartList(userId);  
//     }, 2000); 
//   }
// }
import { Component, OnInit } from '@angular/core';
import { cart, login, product, SignUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin:boolean=true
  authError:string="";
  constructor(private user: UserService, private product:ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }
  login(data: login) {
    this.user.userLogin(data)
    this.user.inValiduserAuth.subscribe((result)=>{
      console.warn(result);
      if(result){
         this.authError="User not found"
      }else{
        this.localCartToRemoteCart();
      }
      
    })
  }
  openSignUp(){
    this.showLogin=false
  }
  openLogin(){
    this.showLogin=true;
  }

  localCartToRemoteCart(){
    console.log('check')
   let data = localStorage.getItem('localCart');
   let user = localStorage.getItem('user');
   let userId= user && JSON.parse(user).id;
   if(data){
    let cartDataList:product[]= JSON.parse(data);
    console.log(data,user,userId)
    cartDataList.forEach((product:product, index)=>{
      let cartData:cart={
        ...product,
        productId:product.id,
        userId
      }
      delete cartData.id;
      setTimeout(() => {
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.warn("data is stored in DB");
          }
        })
      }, 500);
      if(cartDataList.length===index+1){
        localStorage.removeItem('localCart')
      }
    })
   }

   setTimeout(() => {
    console.log("calll");
    this.product.getCartList(userId)
   }, 200);
    
  }
}