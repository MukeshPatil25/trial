import { Component, OnInit } from '@angular/core';
import { stringify } from 'qs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { AuthService } from 'src/app/auth.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpUsers:any[]=[];
  signUpObj:any={
    userName:'',
    email:'',
    password:''
  }
  loginObj:any={
    userName:'',
    password:''
  }
  ngOnInit(): void {
    this.authService
    const localData=localStorage.getItem("signUpUsers");
    if(localData!=null){
      this.signUpUsers=JSON.parse(localData)
    }
  }
  
 constructor(private router: Router,private authService: AuthService){}
 onSignUp() {
  this.signUpUsers.push(this.signUpObj);
  alert(`Registration Successfully! Your username is: ${this.signUpObj.userName}`);
    this.signUpObj={
    userName:'',
    email:'',
    password:''
  }
  localStorage.setItem("signUpUsers",JSON.stringify(this.signUpUsers));
  console.log(this.signUpUsers);
  this.router.navigate(['/Login']);
  console.log(this.router.navigate(['/Login']));
  
}

 onLogin(){
  this.authService.setIsLoggedIn(true);
   alert("Login Successfully");
  this.router.navigate(['/Home']);
 }
}
