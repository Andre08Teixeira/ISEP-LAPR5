import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { UserService } from '../UserService';
import { User } from '../User';
import { Router,CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isSubmitting = false;
  error: string;
  user: SocialUser;
  role: any;
  role1: String;
  loggedIn: any;
  usersDB: User[]=[];
  emails: String[]=[];
  userBoolean: any;
  isLoggedIn= false;
  isLoginFailed= false;
  errorMesse='';

  constructor(private authService1: AuthService,
    private socialAuthService: SocialAuthService,
    private userService: UserService,
    private router: Router,private storageService: StorageService,
    ) {}
    hide = true;

    signInForm = new FormGroup({
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",Validators.required)
    })


  ngOnInit() {
    console.log(this.user);
    console.log("começou");
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.error = null;

      const { email, password } = this.loginForm.value;
      /*this.authService.login(email, password).subscribe(
        result => {
          // handle successful login
        },
        error => {
          this.error = error;
          this.isSubmitting = false;
        }
      );*/
    }
  }
 async signInWithFB(): Promise<void> {
  console.log("ale ale");
  console.log(this.user);

  this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);

      this.userService.getUserEmail(this.user.email).subscribe(
        {next: data =>{
          console.log(data.email);
          console.log("data.email");
          console.log(data.role);
          console.log(this.user.email);
          var firstName = data.firstName;
          var lastName = data.lastName;
          var email = data.email;
          var phoneNumber = data.phoneNumber;
          var password = data.password;
          var role = data.role;
          var user:User = {firstName,lastName,email,phoneNumber,password,role}
          let wrappedData= {userDTO: user}
          this.storageService.saveUser(wrappedData);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.role = this.storageService.getUser();
        }  
        }
      )
      this.router.navigate(['/dashboard']);
    }
  
 

  login() {
    //get the values of the email and password from the html
    const values = this.signInForm.value;
    console.log(values.email);
    console.log(values.password);
    this.authService1.login(values.email, values.password).subscribe({
      next: data => {
        console.log(data);
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.storageService.getUser();
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        alert("Login failed. Check credentials.")
          this.isLoggedIn=false,
          this.isLoginFailed=true;
          
      }
    });
   
  }

  logOut(): void {
    this.isLoggedIn=false;
    this.socialAuthService.signOut();
    this.storageService.logout();
    this.isLoggedIn=false;
    this.router.navigate(['/login']);
  }

  getRole(): string{
    return this.role;
  }
  myFunction() {
    var x = document.getElementById("password") as HTMLInputElement | null;;
    console.log(x);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  

}
