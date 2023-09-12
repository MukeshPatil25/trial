import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { NumberValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5120/api/Employees';
  constructor(private http:HttpClient) { }
  signUp(user:User):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/PostEmployee`,user)
  }
  login(credentials:User):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/LoginEmployee`,credentials);
  }
  getCities():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/CityMasters`);
  }
}
export interface User {
  name: string;
  emailId: string;
  password: string;
  basic:number;
  empNo:number;
  deptNo:number;
}

