import { Component,OnInit } from '@angular/core';
import { Truck } from '../truck';
import { TruckService } from '../truck.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-truck-inhibit',
  templateUrl: './truck-inhibit.component.html',
  styleUrls: ['./truck-inhibit.component.css']
})
export class TruckInhibitComponent implements OnInit {
    trucks: Truck[] = [];
    uninhibitedTrucks: Truck[] = [];
    selectedValue: string;
    component: any;
    constructor(private truckService: TruckService,private location: Location){}
    
    async getTrucks(){
        this.trucks = await this.truckService.getTrucks().toPromise();
    }

    async update(truckRegistration:string): Promise<void>{
        for(let index = 0; index < this.uninhibitedTrucks.length; index++){
            if(this.uninhibitedTrucks[index].registration == truckRegistration){
                this.makeTruck(this.uninhibitedTrucks[index]);
            }
        }   
        this.updateList();
    }
    
        goBack(): void {
        this.location.back();
        }

        async ngOnInit(): Promise<void> {
            await this.getTrucks();
            this.uninhibitedTrucks = this.filterList();
            setInterval(() => {
                this.updateList();
              }, 1000); 
        }

        makeTruck(truck:Truck):void{
            var registration = truck.registration;
            this.truckService.updateTruck(registration)
            .subscribe(truck => {
                this.component.trucks.push(truck);
            });
        }

        getTrucks2(){
            this.truckService.getTrucks()
                .subscribe((trucks) => this.trucks = trucks);
        }

        updateList(){
            if(this.selectedValue == ""){
                this.getTrucks2();
                this.uninhibitedTrucks = this.filterList();
            }
        }

        filterList():Truck[]{
            return this.trucks.filter(item => item.is_deleted === Boolean(false))
        }
}