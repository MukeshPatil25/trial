
import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { HomeService } from '../Services/home.service';
import { Product } from '../home/home.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private service:CartService,private home :HomeService){}
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
  removeItem1(productId: any){

   
    this.service.removeItem1(productId).subscribe(
          (response)=>{
            this.getCartItems();
          },
          (error)=>{
            console.log('Error while removing cart items:', error);
          }
)
  }

  increaseQuantity(item: CartItem) {
    
    var EmpNo;
    const storedResponse = localStorage.getItem("loginUser");
    if (storedResponse) {
      const user = JSON.parse(storedResponse);
      EmpNo=user[0].empNo;
    }
   
    this.service.addToCart(item,EmpNo).subscribe(
      (response)=>{
        item.quantity++;
      },
      (error)=>{

      }
    )
    
}

decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.service.removeItem(item.productId).subscribe(
        (response)=>{
          this.getCartItems();
        },
        (error)=>{
          console.log('Error while removing cart items:', error);
        }
)
       
        // Update the quantity in the database if necessary using API calls
    }
}
}
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  empNo : number;
  productId:number
}