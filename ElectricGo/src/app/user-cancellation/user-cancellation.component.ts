import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../UserService';
import { User } from '../User';
import { Role } from '../Role';

@Component({
  selector: 'app-user-cancellation',
  templateUrl: './user-cancellation.component.html',
  styleUrls: ['./user-cancellation.component.css']
})
export class UserCancellationComponent implements OnInit{
  users:User[]=[];
  validUsers:User[]=[];
  roles:Role[]=[];
  selectedValue: string;
  component: any;
  constructor(private location: Location, private userService:UserService){}

  async ngOnInit(): Promise<void>{
    await this.getUsers();
    await this.getRoles();
    this.validUsers = this.filterList();
    console.log(this.validUsers);
    setInterval(() => {
      this.updateList();
    }, 1000); 
  }

    goBack(): void {
      this.location.back();
    } 
   
  async getUsers(){
    this.users = await this.userService.getUsers().toPromise();
  }

  async getRoles(){
    this.roles = await this.userService.getRoles().toPromise();
  }

  async update(userEmail:string): Promise<void>{
    for(let index = 0; index < this.validUsers.length; index++){
        if(this.validUsers[index].email == userEmail){
            this.makeUser(this.validUsers[index]);
        }
    }   
    this.updateList();
  }

  makeUser(user:User):void{
    var email = user.email;
    this.userService.updateUser(email)
    .subscribe(user => {
        this.component.users.push(user);
    });

  }

getUsers2(){
  this.userService.getUsers()
      .subscribe((users) => this.users = users);
}

updateList(){
  if(this.selectedValue == ""){
      this.getUsers2();
      this.validUsers = this.filterList();
  }
}

  filterList():User[]{
      return this.users.filter(item => item.firstName !== String('######'))
  }
  
}
