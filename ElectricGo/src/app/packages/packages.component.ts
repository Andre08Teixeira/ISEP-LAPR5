import { Component, OnInit } from '@angular/core';
import { Package } from '../package';
import { PackageService } from '../package.service';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  packages: Package[] = [];
  pageSlice: any;



  constructor(private packageService: PackageService, private messageService: MessageService, private location: Location) {
    this.packageService.getPackages();
   }


  OnPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.packages.length) {
      endIndex = this.packages.length;
    }
    this.pageSlice = this.packages.slice(startIndex, endIndex);
  }


  ngOnInit(): void {
    this.getPackages();
    this.pageSlice=this.packages.slice(0,2);
  }

  getPackages(): void {
    this.packageService.getPackages()
      .subscribe((packages) => this.packages = packages);


  }
  goBack(): void {
    this.location.back();
  }

}