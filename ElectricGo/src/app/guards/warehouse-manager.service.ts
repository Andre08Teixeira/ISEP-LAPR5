import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseManagerService {

  constructor(private storage:StorageService,private router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{
    var currentUser = this.storage.getUser()
    if(currentUser.userDTO.role.includes('f7c089fa-c41b-437c-a64e-67ca97dd5973')){
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}
