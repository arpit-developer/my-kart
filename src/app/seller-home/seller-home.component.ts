import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import{faPen} from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[]
  productMessage : undefined|string;
  icon=faTrash;
  update=faPen;
  constructor(private product: ProductService, private router:Router) { }
  ngOnInit(): void {
    this.router.navigate(['seller-home']);
    this.list();
  }
  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="Product is Deleted";
        this.list();
      }
    })
    setTimeout(()=>this.productMessage=undefined,3000);
  }

  list(){
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
    })
  }

  
}
