import { Component, OnInit } from '@angular/core';
import { Truck } from '../truck';
import { TruckService } from '../truck.service';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.css']
})
export class TrucksComponent implements OnInit{

  trucks: Truck[] = [];
  

constructor(private truckService: TruckService, private messageService: MessageService, private location:Location){}


ngOnInit(): void {
  this.getTrucks();
}

getTrucks(): void {
  this.truckService.getTrucks()
  .subscribe((trucks) => this.trucks = trucks);
}
goBack(): void {
  this.location.back();
}

}