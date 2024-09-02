import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/Warehouse';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})


export class WarehousesComponent implements OnInit {

  warehouses: Warehouse[] = [];
  warehouse: Warehouse= null;
  constructor(private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.warehouseService.getWarehouses().subscribe((warehouses) => this.warehouses = warehouses);
  }

  softDeleteItem(id: any) {
    this.warehouseService.softDeleteWarehouse(id).subscribe();
  }

  addWarehouse(warehouse: Warehouse){
    console.log(warehouse)
    this.warehouseService.addWarehouse(warehouse).subscribe((warehouse) =>(this.warehouse=warehouse))
  }

  
}
