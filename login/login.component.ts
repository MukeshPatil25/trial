
import { Router } from '@angular/router';
import { stringify } from 'qs';
import { AuthService } from 'src/app/auth.service';
import { UserService, User } from '../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isValidate:boolean=false;
  cities: City[] = []; 
  selectedCity: any ;
  signUpUsers:any[]=[];
  signUpObj:User={
    name:'',
    emailId:'',
    password:'',
    basic:0,
    empNo:0,
    deptNo:2
  }
  loginObj:User={
    name:'',
    emailId:'',
    password:'',
    basic:0,
    empNo:0,
    deptNo:2
  }
  ngOnInit(): void {
    debugger;
    this.user.getCities().subscribe(
      (cities:City[])=>{
        console.log(cities);
          this.cities=cities;
      },
      (error) => {
        console.log('Error while fetching cart items:', error);
      }
    );
    
   
  }
  
 constructor(private router: Router,private authService: AuthService,private user:UserService,private toastr: ToastrService){}
 onSignUp() {
   this.user.signUp(this.signUpObj).subscribe(
     (response)=>{
      //alert(`Registration Successfully! Your username is: ${(response.name as string)}`);
      this.toastr.success(`Registration Successfully! Your username is: ${(response.name as string)}`);
      this.router.navigate(['/Login']);
     },
     (error)=>{
      this.toastr.error(`Failed to register`);
     }
   )
  
}

 onLogin(){
  if(this.loginObj.emailId && this.loginObj.password){
    this.isValidate=false;
    this.user.login(this.loginObj).subscribe(
      (response)=>{
         this.authService.setIsLoggedIn(true);
         localStorage.setItem("loginUser",JSON.stringify(response));
        // alert("Login Successfully!");
         this.toastr.success(`Login Successfully!`);
 
         this.router.navigate(['/Home']);
      },
      (error)=>{
       debugger;
       //alert("Failed to login");
       this.toastr.error("Failed to login.");
 
        console.error("failed to login")
      }
    )
  }
  else{
    this.isValidate=true;
  }
   
  
 }
}
export interface City{
  Id:number,
  city:string
}
