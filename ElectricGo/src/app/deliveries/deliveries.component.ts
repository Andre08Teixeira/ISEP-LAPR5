import { Component, OnInit } from '@angular/core';
import { Delivery } from '../delivery';
import { DeliveryService } from '../delivery.service';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit{

  deliveries: Delivery[] = [];
  currentlist: Delivery[] = [];
  ordenar:string="";
  filtro:string="";
  

constructor(private deliveryService: DeliveryService, private messageService: MessageService, private location:Location){}


selectedChangeHandler(event:any){
  this.ordenar = event.target.value;
  this.mudarLista();
}
selectedChangeHandler2(event:any){
  this.filtro = event.target.value;
  this.mudarLista();
}
filtrarPorArmazem(armazem:string){
  this.currentlist.splice(0);
  for (let index = 0; index < this.deliveries.length; index++) {
    if(this.deliveries[index].deliverywarehouseID ===armazem){
      this.currentlist.push(this.deliveries[index]);
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
  for (let index = 0; index < this.deliveries.length; index++) {
    var dataTemp:Date = new Date();
    dataTemp.setMonth(this.deliveries[index].mes-1);
    console.log(this.deliveries[index].mes),
    dataTemp.setDate(this.deliveries[index].dia);
    dataTemp.setFullYear(this.deliveries[index].ano);
    console.log(dataTemp);
    if(primeiraData<dataTemp){
        if(dataTemp<segundaData){
          this.currentlist.push(this.deliveries[index]);
        }
    }
  }
}

filtrarPorAmbos(armazem:string,firstDate:string,secondDate:string){
  this.currentlist.splice(0);
  var primeiraData:Date = new Date(firstDate);
  var segundaData:Date = new Date(secondDate);
  for (let index = 0; index < this.deliveries.length; index++) {
    var dataTemp:Date = new Date();
    dataTemp.setMonth(this.deliveries[index].mes-1);
    console.log(this.deliveries[index].mes),
    dataTemp.setDate(this.deliveries[index].dia);
    dataTemp.setFullYear(this.deliveries[index].ano);
    if(this.deliveries[index].deliverywarehouseID ===armazem){
      if(primeiraData<dataTemp){
        if(dataTemp<segundaData){
          this.currentlist.push(this.deliveries[index]);
        }
    }
  }
    
  }
  if (this.currentlist.length==0){}
  this.mudarLista();
}


mudarLista(): void{
  if(this.filtro=="--"){
    this.currentlist = this.deliveries.slice();
  }
  if(this.ordenar=="warehouse asc"){
    this.ordenarPorArmazemASC();
  }
  if(this.ordenar=="warehouse dsc"){
    this.ordenarPorArmazemDSC();
  }
  if(this.ordenar=="date asc"){
    this.ordenarPorDataASC();
  }
  if(this.ordenar=="date dsc"){
    this.ordenarPorDataDSC();
  }
  if(this.ordenar=="mass dsc"){
    this.ordenarPorMassaDSC();
  }
  if(this.ordenar=="mass asc"){
    this.ordenarPorMassaASC();
  }
  if(this.ordenar=="--"){
    this.currentlist=this.deliveries.slice();
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

ordenarPorArmazemDSC(){
  this.currentlist.sort((a,b)=>b.deliverywarehouseID.localeCompare(a.deliverywarehouseID))
  console.log(this.currentlist);}

ordenarPorArmazemASC(){
  this.currentlist.sort((a,b)=>a.deliverywarehouseID.localeCompare(b.deliverywarehouseID))
  console.log(this.currentlist);
}
ordenarPorMassaDSC(){

  for (let index = 0; index < this.currentlist.length; index++) {
    this.currentlist.sort(function(a,b){return b.weight - a.weight;})
    
  }
}
ordenarPorMassaASC(){

  for (let index = 0; index < this.currentlist.length; index++) {
    this.currentlist.sort(function(a,b){return a.weight - b.weight;})
    
  }
}

ngOnInit(): void {
  this.getDeliveries();
}

getDeliveries(): void {
  this.deliveryService.getDeliveries()
  .subscribe((deliveries) => this.deliveries = deliveries);
  this.deliveryService.getDeliveries()
  .subscribe((deliveries) => this.currentlist = deliveries);
}
goBack(): void {
  this.location.back();
}

}