import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { Router,CanActivate } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private authService:SocialAuthService,private router: Router) {
    
  }
  async signOfWithFB(): Promise<void>{

    this.authService.signOut(true);
    this.authService.signOut(true);
    this.authService.signOut(true);
    this.authService.signOut(true);
    this.authService.signOut(true);
    this.authService.signOut(true);
    this.router.navigate(['/login']);

  }
}
