import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { TruckId } from "./truckId";
import ITruckDTO from "../dto/ITruckDTO";
import {TruckRegistration} from "./truckRegistration";
import { TruckMaxWeight } from "./truckMaxWeight";
import { TruckMaxCharge } from "./truckMaxCharge";
import { TruckAutonomy } from "./truckAutonomy";
import { TruckChargeTime } from "./truckChargeTime";
import { TruckTare } from "./truckTare";


interface TruckProps {
  registration:TruckRegistration;
  tare:TruckTare;
  maximum_weight:TruckMaxWeight;
  max_charge:TruckMaxCharge;
  autonomy:TruckAutonomy;
  charge_time:TruckChargeTime;
  is_deleted:boolean;
}

export class Truck extends AggregateRoot<TruckProps> {
  truck: Truck;
  get id (): UniqueEntityID {
    return this._id;
  }

  get truckId (): TruckId {
    return new TruckId(this.truckId.toValue());
  }

  get truckRegistration (): TruckRegistration{
    return this.props.registration;
  }

  get truckTare (): TruckTare {
    return this.props.tare;
  }

  get truckMaxWeight (): TruckMaxWeight {
    return this.props.maximum_weight;
  }

  get truckMaxCharge (): TruckMaxCharge {
    return this.props.max_charge;
  }

  get truckAutonomy (): TruckAutonomy {
    return this.props.autonomy;
  }

  get truckChargeTime (): TruckChargeTime {
    return this.props.charge_time;
  }

  get truckIsDeleted (): boolean {
    return this.props.is_deleted;
  }

  set truckRegistration (value: TruckRegistration) {
    this.props.registration = value;
  }
  
  set truckTare ( value: TruckTare) {
    this.props.tare = value;
  }

  set truckMaxWeight ( value: TruckMaxWeight) {
    this.props.maximum_weight = value;
  }

  set truckMaxCharge ( value: TruckMaxCharge) {
    this.props.max_charge = value;
  }

  set truckAutonomy ( value: TruckAutonomy) {
    this.props.autonomy = value;
  }

  set truckChargeTime ( value: TruckChargeTime) {
    this.props.charge_time = value;
  }

  set truckIsDeleted (value: boolean){
    this.props.is_deleted = value;
  }

  private constructor (props: TruckProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (truckDTO: ITruckDTO, id?: UniqueEntityID): Result<Truck> {
    const registration = truckDTO.registration;
    const tare = truckDTO.tare;
    const maximum_weight = truckDTO.maximum_weight;
    const max_charge = truckDTO.max_charge;
    const autonomy = truckDTO.autonomy;
    const charge_time = truckDTO.charge_time;
    const is_deleted = truckDTO.is_deleted;
    if (tare.value <= 0) {
      return Result.fail<Truck>('Must provide a valid tare value')
    }
    if (maximum_weight.value <= 0) {
      return Result.fail<Truck>('The maximum weight of the truck must be above 0') 
    }
    if (max_charge.value <= 0) {
      return Result.fail<Truck>('The maximum charge of the batteries must be above 0')  
    } 
    if (autonomy.value <= 0) {
      return Result.fail<Truck>('The autonomy of the truck should be above 0')  
    }
    if (charge_time.value <= 0) {
      return Result.fail<Truck>('The charge time of the batteries must be higher than 0')  
    } else {
      const truck  = new Truck({ registration: registration, tare : tare, maximum_weight : maximum_weight, max_charge : max_charge, autonomy : autonomy, charge_time : charge_time, is_deleted : is_deleted}, id);
      return Result.ok<Truck>( truck )
    }
    
  }
}