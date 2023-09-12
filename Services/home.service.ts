import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }
  addToCart(product:Product,EmpNo:number):Observable<any>{
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
}
