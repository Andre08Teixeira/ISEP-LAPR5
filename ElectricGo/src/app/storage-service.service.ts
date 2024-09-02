import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from './User';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getRole():any{
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log(JSON.parse(user).userDTO.role);
    if(user){
      return JSON.parse(user).userDTO.role;
    }
  }
 

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

   logout():any{
    window.sessionStorage.removeItem(USER_KEY);
    }
}