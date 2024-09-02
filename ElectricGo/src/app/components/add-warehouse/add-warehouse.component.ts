import { Location } from '@angular/common';
import { Component,Output,EventEmitter, OnInit } from '@angular/core';
import { Warehouse } from 'src/Warehouse';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css']
})
export class AddWarehouseComponent implements OnInit{


  ngOnInit(): void {
  }
  
  @Output() onAddWarehouse: EventEmitter<Warehouse> = new EventEmitter;

  constructor(
    private location: Location
  ) {}
  id: string;
  designation: string;
  street: string;
  codigoPostal: string; 
  country: string;
  longitude:number;
  latitude: number;
  altitude:number;

 

   onSubmit(){

    if(!this.id || !this.designation || !this.street || !this.codigoPostal || !this.country || !this.longitude || !this.latitude|| !this.altitude){
      console.log(this.id,this.designation,this.street,this.codigoPostal,this.country,this.longitude,this.latitude,this.altitude);
      alert("a parameter is missing")
      return;
    }
    if(this.id.length != 5){
      alert("Id can only have 5 characters")
      return;
    }
    if(this.latitude>90  || this.latitude<-90){
      alert("Latitude is beetween -90 and 90")
      return;
    }
    if(this.longitude>180  || this.longitude<-180){
      alert("Latitude is beetween -180 and 180")
      return;
    }
    const newWarehouse ={
        id: this.id,
        designation: this.designation,
        street: this.street,
        codigoPostal: this.codigoPostal,
        country: this.country,
        longitude:this.longitude,
        latitude: this.latitude,
        altitude: this.altitude
    }

    
    
    this.onAddWarehouse.emit(newWarehouse);
    
    //@ emit event
      
  } 
  goBack(): void {
    this.location.back();
  }
}
