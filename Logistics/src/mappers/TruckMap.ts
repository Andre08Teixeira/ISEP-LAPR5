import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import ITruckDTO from "../dto/ITruckDTO";
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import { Truck } from "../domain/truck";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class TruckMap extends Mapper<Truck> {

  public static toDTO( truck: Truck): ITruckDTO {
    return {
    id: truck.id.toString(),
    registration:truck.truckRegistration,
    tare:truck.truckTare,
    maximum_weight:truck.truckMaxWeight,
    max_charge:truck.truckMaxCharge,
    autonomy:truck.truckAutonomy,
    charge_time:truck.truckChargeTime,
    is_deleted:truck.truckIsDeleted
    } as ITruckDTO;
  }

  public static toDomain (truck: any | Model<ITruckPersistence & Document> ): Truck {
    const truckOrError = Truck.create(
      truck,
      new UniqueEntityID(truck.domainId)
    );

    truckOrError.isFailure ? console.log(truckOrError.error) : '';

    return truckOrError.isSuccess ? truckOrError.getValue() : null;
  }

  public static toPersistence (truck: Truck): any {
    return {
      domainId: truck.id.toString(),
      registration:truck.truckRegistration,
      tare:truck.truckTare,
      maximum_weight:truck.truckMaxWeight,
      max_charge:truck.truckMaxCharge,
      autonomy:truck.truckAutonomy,
      charge_time:truck.truckChargeTime,
      is_deleted:truck.truckIsDeleted
    }
  }
}