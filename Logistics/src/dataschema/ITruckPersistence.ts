import { TruckAutonomy } from "../domain/truckAutonomy";
import { TruckChargeTime } from "../domain/truckChargeTime";
import { TruckMaxCharge } from "../domain/truckMaxCharge";
import { TruckMaxWeight } from "../domain/truckMaxWeight";
import { TruckRegistration } from "../domain/truckRegistration";
import { TruckTare } from "../domain/truckTare";

export interface ITruckPersistence {
	  _id: string;
    registration:TruckRegistration;
	  tare:TruckTare;
    maximum_weight:TruckMaxWeight;
    max_charge:TruckMaxCharge;
    autonomy:TruckAutonomy;
    charge_time:TruckChargeTime;
    is_deleted:boolean;
  }