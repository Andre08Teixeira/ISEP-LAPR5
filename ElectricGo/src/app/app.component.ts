import { SocialAuthService, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EletricGo';


  constructor(private authService: SocialAuthService) { }
  user: any;
  loggedIn: any;

  ngOnInit() {
   
    };
  }

