import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";

import IPlanningDTO from "../dto/IPlanningDTO";
import { PlanningId } from "./planningId";
import { TruckRegistration } from "./truckRegistration";


interface PlanningProps {
    armazens:string[];
    data: string;
    truckRegistration: TruckRegistration;
    heuristica: string;
}


export class Planning extends AggregateRoot<PlanningProps> {
  planning: Planning;
  get id (): UniqueEntityID {
    return this._id;
  }

  get planningId(): PlanningId{
    return new PlanningId(this.planningId.toValue())
  }

  get armazens (): string[] {
    return this.props.armazens;
  }

  get data (): string {
    return this.props.data;
  }

  get truckRegistration () : TruckRegistration{
    return this.props.truckRegistration;
  }
  get heuristica () : string{
    return this.props.heuristica;
  }

  set heuristica ( value: string) {
    this.props.heuristica = value;
  }

  set data ( value: string) {
    this.props.data = value;
  }

  set armazens ( value: string[]) {
    this.props.armazens = value;
  }

  set truckRegistration (value: TruckRegistration){
    this.props.truckRegistration = value;
  }

  private constructor (props: PlanningProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (planningDTO: IPlanningDTO, id?: UniqueEntityID): Result<Planning> {
    const data = planningDTO.data;
    const armazens = planningDTO.armazens;
    const truckRegistration = planningDTO.truckRegistration;
    const heuristica = planningDTO.heuristica;
    const planning = new Planning({ data: data, armazens: armazens, truckRegistration, heuristica: heuristica}, id);
      return Result.ok<Planning>( planning )
    }
  }
