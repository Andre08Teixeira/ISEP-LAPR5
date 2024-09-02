import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/truck";
import { TruckRegistration } from "../../domain/truckRegistration";

export default interface ITruckRepo extends Repo<Truck> {
	save(truck: Truck): Promise<Truck>;
	findByRegistration (truckRegistration: TruckRegistration | string): Promise<Truck>;
	findAll(): Promise<Truck[]>;
	remove(truckRegistration: TruckRegistration);
}