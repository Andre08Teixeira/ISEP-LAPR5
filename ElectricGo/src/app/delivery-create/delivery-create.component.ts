import { Component,OnInit } from '@angular/core';
import { Delivery } from '../delivery';
import { DeliveryService } from '../delivery.service';
import { DeliveriesComponent } from '../deliveries/deliveries.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Warehouse } from 'src/Warehouse';
import { WarehouseService } from '../services/warehouse.service';



@Component({
  selector: 'app-delivery-create',
  templateUrl: './delivery-create.component.html',
  styleUrls: ['./delivery-create.component.css']
})
export class DeliveryCreateComponent implements OnInit {

  warehouses: Warehouse[] = [];
  constructor(private deliveryService: DeliveryService,private component:DeliveriesComponent,private location: Location,private warehouseService: WarehouseService){}


  add(firstDate:string,weight2:string, deliverywarehouseID2:string,put_truck_time2:string,remove_truck_time2:string): void {
   // var id = Guid.parse(id2);
    var arrayData = firstDate.split("-");
    
    var dia = parseInt(arrayData[2]);
    var mes = parseInt(arrayData[1]);
    var ano:number = parseInt(arrayData[0]);
    
    console.log("ano " + arrayData[0] +" mes "+ arrayData[1] + "dia" +arrayData[2]);
    var weight = Number(weight2);
    if (weight <1) {
      alert("The weight must be positive");
      return;
    }
    if (weight <1) {
      alert("The weight must be positive");
      return;
    }

    var deliverywarehouseID = (deliverywarehouseID2);
    var put_truck_time = Number(put_truck_time2);
    if (put_truck_time <1) {
      alert("The time to put in the truck must be positive");
      return;
    }
    var remove_Truck_time = Number(remove_truck_time2);
    if (remove_Truck_time <1) {
      alert("The time to put in the truck must be positive");
      return;
    }
    
    this.deliveryService.addDelivery({/*id, */ dia, mes, ano, weight, deliverywarehouseID, put_truck_time, remove_Truck_time } as Delivery)
      .subscribe(delivery => {
        this.component.deliveries.push(delivery);
      });

  }
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
this.getWarehouses();
  }
  getWarehouses(): void {
    this.warehouseService.getWarehouses()
    .subscribe(warehouses => this.warehouses = warehouses);
  }

  
}
