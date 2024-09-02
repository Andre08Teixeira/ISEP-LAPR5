import { Guid } from 'guid-typescript';
export interface Delivery{
    id: Guid;
    dia: number;
    mes: number;
    ano: number;
    weight: number;
    deliverywarehouseID: string;
    put_truck_time: number;
    remove_Truck_time: number;
}