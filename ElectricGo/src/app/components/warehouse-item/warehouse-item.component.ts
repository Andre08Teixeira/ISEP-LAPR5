import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Warehouse } from 'src/Warehouse';
@Component({
  selector: 'app-warehouse-item',
  templateUrl: './warehouse-item.component.html',
  styleUrls: ['./warehouse-item.component.css']
})
export class WarehouseItemComponent implements OnInit {

  @Input() warehouse: Warehouse |undefined


  constructor(private warehouseService: WarehouseService) { }

  ngOnInit(): void {
  }

  enableWarehouse(warehouseId:any ):void{
      if(confirm("Are you sure you want to desactive warehouse: \n"+ warehouseId)){
          console.log("Desactivating: " +warehouseId)
          this.warehouseService.softDeleteWarehouse(warehouseId).subscribe();
          this.warehouseService.getWarehouses().subscribe();
      } 
  }

}