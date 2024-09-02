import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DeliveryService } from '../delivery.service';
import { PlanningService } from '../planning.service';
import { ChangeDetectorRef } from '@angular/core';
import { Planning } from '../planning';
import { PlanningsComponent } from '../plannings/plannings.component';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from 'src/Warehouse';
import { TruckService } from '../truck.service';
import { Truck } from '../truck';
import { TruckArmazens } from '../truckArmazens';
import { Delivery } from '../delivery';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit{
  constructor(
    private deliveryService: DeliveryService,
    private planningService: PlanningService,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private component:PlanningsComponent,
    private truckService:TruckService
  ) {}
  viagem: string[] = [];
  trucks: Truck[]=[]
  trucksAramzens: TruckArmazens[]=[];
  deliveries: Delivery[]=[]
  filtro: string='';

  async getRoute(heuristica:string, data:string):Promise<void>{
      let num = Number (data)
    this.viagem = await this.planningService.getPlanning(heuristica,num).toPromise();
  }
  async getRouteAG(genetic:string, ng:string,pd:string,cp:string,mp:string):Promise<void>{

  this.viagem = await this.planningService.getPlanning2(genetic,ng,pd,cp,mp).toPromise();
}

  selectedChangeHandler2(event:any){
    this.filtro = event.target.value;
    
  }


 async  converterData(data:string,heuristica:string,truck:string,ng:string,pd:string,cp:string,mp:string):Promise<void>{
    var novaString = data.replace(/-/g,'');
 /*   if(heuristica=="Heuristica Tempo"){
      await this.getRoute("Heuristic-time",novaString);
    }else if(heuristica=="Heuristica Massa")
    {await this.getRoute("Heuristic-mass",novaString);
  }else if(heuristica=="Algoritmo Genetico")
  {await this.getRouteAG("Genetic",ng,pd,cp,mp);
}*/
    console.log(heuristica);
    this.createTrip(data,heuristica,truck);

}
 shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

  createTrip(data:string, heuristica:string, truck:string){
    var arrayData = data.split("-");
    var dia = parseInt(arrayData[2]);
    var mes = parseInt(arrayData[1]);
    var ano:number = parseInt(arrayData[0]);
   // var armazens2:string[] = this.viagem.slice(0);
    var armazens:string[] =[];
    console.log(data);
    for (let index = 0; index < this.deliveries.length; index++) {
      const element = this.deliveries[index];
      if(element.dia == dia && element.mes == mes && element.ano == ano && element.deliverywarehouseID != "MAT01"){
      armazens.push(element.deliverywarehouseID);
      }
    }
    this.shuffle(armazens);
    armazens.unshift("MAT01");
    armazens.push("MAT01");
 /*   if(heuristica=="Algoritmo Genetico"){

      var resto = armazens.length % this.trucks.length;
      for (let index = resto-1; resto >= 0; index--) {
        const element = armazens[index];
        var camiao = this.trucks[index];
        let camiaoArmazem:TruckArmazens;
        camiaoArmazem.armazem = (element),
        camiaoArmazem.truck = camiao.registration;
        this.trucksAramzens.push(camiaoArmazem);
        armazens.pop();
      }
      //3 para 9
      while(armazens.length !=0){
      for (let i = 0; i < this.trucks.length; i++) {
        const element = armazens[i];
        var camiao = this.trucks[i];
        let camiaoArmazem:TruckArmazens;
        camiaoArmazem.armazem = (element),
        camiaoArmazem.truck = camiao.registration;
        this.trucksAramzens.push(camiaoArmazem);
        armazens.shift();
      }
armazens.reverse();
    }

for (let index = 0; index < this.trucks.length; index++) {
  const element = this.trucks[index];
  var truckRegistration = element.registration;
  var armazens:string[]=[];
    for (let index = 0; index < this.trucksAramzens.length; index++) {
      const element2 = this.trucksAramzens[index];
      if(truckRegistration == element2.truck){
armazens.push(element2.armazem);
      }
    }
    var truckRegistration = truck;
    this.planningService.addPlanning({data, armazens,truckRegistration,heuristica}as Planning).subscribe(delivery => {
      this.component.plannings.push(delivery);

    });
  }
}*/
    var truckRegistration = truck;
    console.log("Truck: " + truckRegistration);
    console.log(armazens);
    console.log("data: " + data);
    console.log("heuristica" + heuristica);
    this.planningService.addPlanning({data, armazens,truckRegistration,heuristica}as Planning).subscribe(delivery => {
      this.component.plannings.push(delivery);

    });


  }
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    this.deliveryService.getDeliveries().subscribe(deliveries => this.deliveries = deliveries);
    this.truckService.getTrucks()
    .subscribe(trucks => this.trucks = trucks);
  }
}
