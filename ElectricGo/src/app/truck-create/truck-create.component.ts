import { Component,OnInit } from '@angular/core';
import { Truck } from '../truck';
import { TruckService } from '../truck.service';
import { TrucksComponent } from '../trucks/trucks.component';
import { Location } from '@angular/common';



@Component({
  selector: 'app-truck-create',
  templateUrl: './truck-create.component.html',
  styleUrls: ['./truck-create.component.css']
})
export class TruckCreateComponent implements OnInit {

  
  constructor(private truckService: TruckService,private component:TrucksComponent,private location: Location){}


  add(registration2:string,tare2:string,maximum_weight2:string,max_charge2:string, autonomy2:string,charge_time2:string): void {
    let regex: RegExp = /([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})/;
    var registration = registration2;
    if(!regex.test(registration)){
      alert("This registration is not valid.");
      return;
    }
    var tare = Number(tare2);
    if(tare < 0){
      alert("Tare should be higher than 0.");
      return;
    }
    var maximum_weight= Number(maximum_weight2);
    if(maximum_weight < 0){
      alert("Maximum Weight should be higher than 0.");
      return;
    }
    var max_charge = Number(max_charge2);
    if(tare < 0){
      alert("Maximum Battery should be higher than 0.");
      return;
    }
    var autonomy = Number(autonomy2);
    if(tare < 0){
      alert("Autonomy should be higher than 0.");
      return;
    }
    var charge_time = Number(charge_time2);
    if(tare < 0){
      alert("Charge time should be higher than 0.");
      return;
    }
    this.truckService.addTruck({registration, tare, maximum_weight, max_charge, autonomy, charge_time} as Truck)
      .subscribe(truck => {
        this.component.trucks.push(truck);
      });

  }
  
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    
  }

  
}
