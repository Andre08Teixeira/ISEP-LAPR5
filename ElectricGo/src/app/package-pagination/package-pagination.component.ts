import { Component, OnInit, ViewChild } from '@angular/core';
import { Package } from '../package';
import { PackageService } from '../package.service';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-package-pagination',
  templateUrl: './package-pagination.component.html',
  styleUrls: ['./package-pagination.component.css']
})

export class PackagePaginationComponent implements OnInit {
  packages: Package[] = [];
  displayedColumns: string[] = ['id', 'Posição X', 'Posição Y', 'Posição Z','Action'];
  dataSource :any;

  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatPaginator;

  constructor(private packageService: PackageService, private messageService: MessageService, private location: Location) { }

  async getPackages(){
      this.packages = await this.packageService.getPackages().toPromise();
  }

  async ngOnInit(){
      await this.getPackages();
      this.dataSource = new MatTableDataSource<Package>(this.packages);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  goBack(): void {
      this.location.back();
      }

  Filterchange(event:Event){
      const filter=(event.target as HTMLInputElement).value;
      this.dataSource.filter = filter;
  }
}
