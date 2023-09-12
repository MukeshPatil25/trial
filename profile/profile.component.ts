
import { Component } from '@angular/core';
import { User } from '../Services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {
  loguser:User={
    name:'',
    emailId:'',
    password:'',
    basic:0,
    empNo:0,
    deptNo:2
  }
  
constructor(){
  const storedResponse = localStorage.getItem("loginUser");
    if (storedResponse) {
      const user = JSON.parse(storedResponse);
      this.loguser=user[0];
      console.log(this.loguser);
    }
  }
}

