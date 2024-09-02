import { Component,OnInit,Input } from '@angular/core';
import { Package } from '../package';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PackageService } from '../package.service';


@Component({
  selector: 'app-package-details2',
  templateUrl: './package-details2.component.html',
  styleUrls: ['./package-details2.component.css']
})
export class PackageDetailComponent implements OnInit{
  @Input() package?: Package;

  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
    private location: Location
  ) {}

getPackage():void{

  const id = String(this.route.snapshot.paramMap.get('id')!);
  this.packageService.getPackage(id)
    .subscribe((packagee) => this.package = packagee);
}

ngOnInit(): void {
  this.getPackage();
}
goBack(): void {
  this.location.back();
}

}
