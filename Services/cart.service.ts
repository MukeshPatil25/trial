import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../cart/cart.component';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  removeItem(itemId: number): Observable<any> {
    const storedResponse = localStorage.getItem("loginUser");
    let empNo;
    if (storedResponse) {
      const user = JSON.parse(storedResponse);
      empNo = user[0].empNo;
    }
    const url = 'http://localhost:5120/api/Employees/RemoveItem/'+empNo;
debugger;
   return this.http.post<any>(url,itemId);
  }
  removeItem1(itemId: number): Observable<any> {
    const storedResponse = localStorage.getItem("loginUser");
    let empNo;
    if (storedResponse) {
      const user = JSON.parse(storedResponse);
      empNo = user[0].empNo;
    }
    const url = 'http://localhost:5120/api/Employees/RemoveItem1/'+empNo;
debugger;
   return this.http.post<any>(url,itemId);
  }
  // Get all cart items
  getCartItems(): Observable<CartItem[]> {
    const storedResponse = localStorage.getItem("loginUser");
    let empNo;
    if (storedResponse) {
      const user = JSON.parse(storedResponse);
      empNo = user[0].empNo;
    }

    const url = 'http://localhost:5120/api/Employees/GetCartItems/' + empNo;
    return this.http.get<CartItem[]>(url);
  }
  addToCart(product:CartItem,EmpNo:number):Observable<any>{
    if (isNaN(EmpNo) || EmpNo <= 0) {
      return throwError('Invalid EmpNo.');
    }

const url = 'http://localhost:5120/api/Employees/AddToCart/'+ EmpNo;

  return this.http.post<any>(url, product).pipe(
    catchError((error) => {
     
      return throwError('Something went wrong.');
    })
  );
  }
  
  constructor(private http:HttpClient) { }
}
