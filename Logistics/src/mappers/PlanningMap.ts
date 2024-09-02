import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IPlanningPersistence } from '../dataschema/IPlanningPersistence';
import IPlanningDTO from "../dto/IPlanningDTO";
import { Planning } from "../domain/planning";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { TruckRegistration } from "../domain/truckRegistration";


export class PlanningMap extends Mapper<Planning> {

  public static toDTO( planning: Planning): IPlanningDTO {
    return {
      id: planning.id.toString(),
      data: planning.data,
      armazens:planning.armazens,
      truckRegistration: planning.truckRegistration,
      heuristica: planning.heuristica
    } as IPlanningDTO;
  }


  public static toDomain (planning: any | Model<IPlanningPersistence & Document> ): Planning {
    const planningOrError = Planning.create(
      planning,
      new UniqueEntityID(planning.domainId)
    );

    planningOrError.isFailure ? console.log(planningOrError.error) : '';

    return planningOrError.isSuccess ? planningOrError.getValue() : null;
  }

  public static toPersistence (planning: Planning): any {
    return {
     domainId: planning.id.toString(),
     armazens: planning.armazens,
     data: planning.data,
     truckRegistration: planning.truckRegistration,
     heuristica: planning.heuristica
    }
  }
}
