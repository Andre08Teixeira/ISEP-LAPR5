import { Component,OnInit } from '@angular/core';
import { Package } from '../package';
import { PackageService } from '../package.service';
import { PackagesComponent } from '../packages/packages.component';
import { Location } from '@angular/common';



@Component({
  selector: 'app-package-create',
  templateUrl: './package-create.component.html',
  styleUrls: ['./package-create.component.css']
})
export class PackageCreateComponent implements OnInit {

  
  constructor(private packageService: PackageService,private component:PackagesComponent,private location: Location){}


  add(x2:string,y2:string,z2:string,tCarga2:string, tDescarga2:string): void {
   
    var x = Number(x2);
    var y = Number(y2);
    var z= Number(z2);
    var tCarga = Number(tCarga2);
    var tDescarga = Number(tDescarga2);
    this.packageService.addPackage({x, y, z, tCarga, tDescarga} as Package)
      .subscribe(packagee => {
        this.component.packages.push(packagee);
      });

  }
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    
  }

  
}
