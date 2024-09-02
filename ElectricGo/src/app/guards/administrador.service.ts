import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService implements CanActivate {

  constructor(private storage:StorageService,private router:Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{
    var currentUser = this.storage.getUser()
    if(currentUser.userDTO.role.includes('bb0af06a-2a95-4004-91fe-cd7eb5f10ebf')){
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }


}
