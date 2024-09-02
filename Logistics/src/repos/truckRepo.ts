import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import ITruckRepo from "../services/IRepos/ITruckRepo";
import { Truck } from "../domain/truck";
import { TruckId } from "../domain/truckId";
import { TruckMap } from "../mappers/TruckMap";
import { TruckRegistration } from '../domain/truckRegistration';

@Service()
export default class TruckRepo implements ITruckRepo {
  private models: any;

  constructor(
    @Inject('truckSchema') private truckSchema : Model<ITruckPersistence & Document>,
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (truck: Truck): Promise<boolean> {

    const idX = truck.id instanceof TruckId ? (<TruckId>truck.id).toValue() : truck.id;

    const query = { domainId: idX}; 
    const truckDocument = await this.truckSchema.findOne( query as FilterQuery<ITruckPersistence & Document> );

    return !!truckDocument === true;
  }

  public async save (truck: Truck): Promise<Truck> {

    const query = { domainId: truck.id.toString() }; 

    const truckDocument = await this.truckSchema.findOne( query );

    try {
      if (truckDocument === null ) {
        const rawTruck: any = TruckMap.toPersistence(truck);

        const truckCreated = await this.truckSchema.create(rawTruck);

        return TruckMap.toDomain(truckCreated);
      } else {
        truckDocument.registration = truck.truckRegistration;
        truckDocument.tare = truck.truckTare;
        truckDocument.maximum_weight = truck.truckMaxWeight;
        truckDocument.max_charge = truck.truckMaxCharge;
        truckDocument.autonomy = truck.truckAutonomy;
        truckDocument.charge_time = truck.truckChargeTime;
        truckDocument.is_deleted = truck.truckIsDeleted;
        await truckDocument.save();

        return truck;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByRegistration (truckRegistration: TruckRegistration | string): Promise<Truck> {
    const query = { registration: truckRegistration }; 
    const truckRecord = await this.truckSchema.findOne( query as FilterQuery<ITruckPersistence & Document>);

    if( truckRecord != null) {
      return TruckMap.toDomain(truckRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Truck[]> {

    const truckRecord = await this.truckSchema.find();

    return truckRecord !== null ? truckRecord.map((postRecord) => TruckMap.toDomain(postRecord)): null

  }

  public async remove(truckRegistration: TruckRegistration): Promise<null>{
    const query = { registration: truckRegistration }; 
    await this.truckSchema.deleteOne( query as FilterQuery<ITruckPersistence & Document> );
    return null;
  }

}