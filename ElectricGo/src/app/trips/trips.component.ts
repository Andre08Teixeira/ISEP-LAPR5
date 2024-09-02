/*import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deliveries',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit{

  trips: Trip[] = [];
  currentlist: Trip[] = [];
  ordenar:string="";
  filtro:string="";
  

constructor(private tripService: TripService, private messageService: MessageService, private location:Location){}


selectedChangeHandler(event:any){
  this.ordenar = event.target.value;
  this.mudarLista();
}
selectedChangeHandler2(event:any){
  this.filtro = event.target.value;
  this.mudarLista();
}
filtrarPorDestino(destino:string){
  this.currentlist.splice(0);
  for (let index = 0; index < this.trips.length; index++) {
    if(this.trips[index].deliverywarehouseID ===destino){
      this.currentlist.push(this.trips[index]);
    }
  }
  if (this.currentlist.length==0){}
  this.mudarLista();
}


filtrarPorData(firstDate:string,secondDate:string){
  this.currentlist.splice(0);
  var primeiraData:Date = new Date(firstDate);
  var segundaData:Date = new Date(secondDate);
  console.log(primeiraData);
  console.log(segundaData);
  for (let index = 0; index < this.trips.length; index++) {
    var dataTemp:Date = new Date();
    dataTemp.setMonth(this.trips[index].mes-1);
    console.log(this.trips[index].mes),
    dataTemp.setDate(this.trips[index].dia);
    dataTemp.setFullYear(this.trips[index].ano);
    console.log(dataTemp);
    if(primeiraData<dataTemp){
        if(dataTemp<segundaData){
          this.currentlist.push(this.trips[index]);
        }
    }
  }
}


mudarLista(): void{
  if(this.filtro=="--"){
    this.currentlist = this.trips.slice();
  }
  */
 /*
  if(this.ordenar=="destino asc"){
    this.ordenarPorDestinoDSC();
  }
  if(this.ordenar=="destino dsc"){
    this.ordenarPorDestinoDSC();
  }
  if(this.ordenar=="date asc"){
    this.ordenarPorDataASC();
  }
  if(this.ordenar=="date dsc"){
    this.ordenarPorDataDSC();
  }
  if(this.ordenar=="--"){
    this.currentlist=this.trips.slice();
  }
}


ordenarPorDataDSC(){

  for (let index = 0; index < this.currentlist.length; index++) {
    this.currentlist.sort(function(a,b){return b.dia - a.dia;})
    .sort(function(a,b){return b.mes - a.mes;})
    .sort(function(a,b){return b.ano - a.ano;})
  }
}

ordenarPorDataASC(){
for (let index = 0; index < this.currentlist.length; index++) {
    this.currentlist.sort(function(a,b){return a.dia - b.dia;})
    .sort(function(a,b){return a.mes - b.mes;})
    .sort(function(a,b){return a.ano - b.ano;})
  }
}

ordenarPorDestinoDSC(){
  this.currentlist.sort((a,b)=>b.destino.localeCompare(a.destino))
  console.log(this.currentlist);}

ordenarPorDestinoASC(){
  this.currentlist.sort((a,b)=>a.destino.localeCompare(b.destino))
  console.log(this.currentlist);
}

ngOnInit(): void {
  this.getTrips();
}

getTrips(): void {
  this.tripService.getTrips()
  .subscribe((trips) => this.trips = trips);
  this.tripService.getDeliveries()
  .subscribe((trips) => this.currentlist = trips);
}
goBack(): void {
  this.location.back();
}

} */