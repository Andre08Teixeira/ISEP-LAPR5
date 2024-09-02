import { Component, OnInit, ViewChild } from '@angular/core';
import {MaterialModule} from '../material-module';
import { Planning } from '../planning';
import {PlanningService} from '../planning.service';
import { PlanningsComponent } from '../plannings/plannings.component';
import { Location } from '@angular/common';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
    selector: 'app-trip-pagination',
    templateUrl: './trip-pagination.component.html',
    styleUrls: ['./trip-pagination.component.css']
})

export class TripPaginationComponent implements OnInit {
    trips: Planning[] = [];
    displayedColumns: string[] = ['data', 'armazens', 'truckRegistration', 'heuristica'];
    dataSource :any; 

    @ViewChild(MatPaginator) paginator !:MatPaginator; 
    @ViewChild(MatSort) sort !:MatPaginator; 

    constructor(private planningService: PlanningService,private component:PlanningsComponent,private location: Location){}
    
    async getTrips(){
        this.trips = await this.planningService.getPlannings().toPromise();
    }
    
    async ngOnInit(){
        await this.getTrips();
        this.dataSource = new MatTableDataSource<Planning>(this.trips);
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