import { Component, OnInit } from '@angular/core';
import { Role } from '../Role';
import { Location } from '@angular/common';
import { UserService } from '../UserService';
import { User } from '../User';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit{

  constructor(private location: Location, private userService:UserService){}
  ngOnInit(): void {
    this.getRoles();
  }

  roles: Role[] = [];
  users:User[]=[];

    goBack(): void {
      this.location.back();
    }

    add(firstName:String,lastName:String, email:String,phoneNumber: String, password:String, role:String): void {
        for (let index = 0; index < this.roles.length; index++) {
          const element = this.roles[index];
          if(element.name ===role)
          {
            role = element.id;
          }
          
        }
      this.userService.addUser({firstName,lastName,email,phoneNumber,password,role} as User)
       .subscribe(user => {
         this.users.push(user)
       });    
   
  }
  getRoles(): void {
    this.userService.getRoles()
    .subscribe(roles => this.roles = roles);
  }
  
      myFunction() {
      var x = document.getElementById("myInput") as HTMLInputElement | null;;
      console.log(x);
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }
    
}
