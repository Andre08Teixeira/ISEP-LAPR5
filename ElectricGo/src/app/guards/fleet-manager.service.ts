import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class FleetManagerService {

  constructor(private storage:StorageService,private router:Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{
    var currentUser = this.storage.getUser()
    if(currentUser.userDTO.role.includes('4b259cf6-6267-469f-801d-fa55834250c2')){
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}
