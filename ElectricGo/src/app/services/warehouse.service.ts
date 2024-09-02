import { Injectable } from '@angular/core';
import { Warehouse } from 'src/Warehouse';
import { Observable,of } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private apiUrl = "https://localhost:5001/api/warehouse"
  constructor(private http: HttpClient) { }

  getWarehouses(): Observable<Warehouse[]>{
    return this.http.get<Warehouse[]>(this.apiUrl);
  }


  softDeleteWarehouse(id: any) {
    console.log("estou no servico");
    return this.http.delete(`https://localhost:5001/api/warehouse/${id}`);
  }

  addWarehouse(warehouse: Warehouse){
    return this.http.post<Warehouse>(this.apiUrl,warehouse)
  }


// getWarehouses(): Observable<Warehouse[]>{
// const warehouses =of(WAREHOUSES);
// return warehouses;
// }

}
