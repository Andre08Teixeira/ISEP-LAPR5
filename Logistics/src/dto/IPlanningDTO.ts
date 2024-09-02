import { Truck } from "../domain/truck";
import { TruckRegistration } from "../domain/truckRegistration";

export default interface IPlanningDTO {
  id: string;
  armazens:string[];
  data: string;
  truckRegistration:TruckRegistration;
  heuristica:string;
}
