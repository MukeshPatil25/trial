
import { Component } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../cart/cart.component';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private home:HomeService,private toastr: ToastrService,private service:CartService){
   
  }
  
  products: Product[] = [
    {
      productId:1,
      image: 'https://image01-in.oneplus.net/ebp/202306/25/1-m00-51-88-cpgm7wsykruahbobaardu7ablie779.png',
      title: 'Product 1',
      description: 'Description of Product 1',
      price:25000
    },
    {
      productId:2,
      image: 'https://image01-in.oneplus.net/ebp/202305/15/1-m00-51-51-cpgm7mril6madvj3aanqgs8anno288.png',
      title: 'Product 2',
      description: 'Description of Product 2',
      price:27000
    },
    {
      productId:3,
      image: 'https://image01-in.oneplus.net/ebp/202305/31/1-m00-51-66-cpgm7wr26omaegnzaaniaca13ya555.png',
      title: 'Product 3',
      description: 'Description of Product 3',
      price:28000
    }
    // Add more product objects as needed
  ];
  ngOnInit(): void {
    return this.getCartItems();
  }
  cartItems: CartItem[] = [];
  getCartItems(): void {
    
    this.service.getCartItems().subscribe(
      (items: CartItem[]) => {
       
        console.log(items);
        this.cartItems = items;
        const itemCount = items.length;
      localStorage.setItem('cartItemCount', itemCount.toString());
      },
      (error) => {
        console.log('Error while fetching cart items:', error);
      }
    );
  }
  addToCart(product: Product) {
    var EmpNo;
    const storedResponse = localStorage.getItem("loginUser");
    if (storedResponse) {
      const user = JSON.parse(storedResponse);
      EmpNo=user[0].empNo;
    }
    this.home.addToCart(product,EmpNo).subscribe(
      (response)=>{
        this.getCartItems();
        this.toastr.success(`Added to cart successfully!`);
      },
      (error)=>{

      }
    )
  }

  BuyNow(product: any) {
    // Handle the view product logic
    console.log('View Product:', product);
  }
}
export interface Product{
  productId:number,
  image: string,
      title: string,
      description:string,
      price:number
}