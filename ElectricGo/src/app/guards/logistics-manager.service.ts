import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage-service.service';
@Injectable({
  providedIn: 'root'
})
export class LogisticsManagerService {

  constructor(private storage:StorageService,private router:Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{
    var currentUser = this.storage.getUser()
    
    console.log(currentUser);
    if(currentUser.userDTO.role.includes('46b1aab1-9070-4ee0-b063-f5d623fadd2e')){
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}
