import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult: undefined | product[];
  showSearchResult = false;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService,private route:Router) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.product.searchProducts(query).subscribe((result) => {
      this.searchResult = result;
      console.log(result) 
      if (result.length === 0) {
        console.warn("No result found");
        this.showSearchResult = true;
      }
    })
    // this.route.navigate([`search/`]);
  }
}
