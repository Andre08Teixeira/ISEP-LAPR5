import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';

import { IPlanningPersistence } from '../dataschema/IPlanningPersistence';
import { Planning } from '../domain/planning';
import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import { PlanningId } from '../domain/planningId';
import { PlanningMap } from '../mappers/PlanningMap';

@Service()
export default class PlanningRepo implements IPlanningRepo {
  private models: any;

  constructor(
    @Inject('planningSchema') private planningSchema : Model<IPlanningPersistence & Document>,
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (planning: Planning): Promise<boolean> {

    const idX = planning.id instanceof PlanningId ? (<PlanningId>planning.id).toValue() : planning.id;

    const query = { domainId: idX};
    const planningDocument = await this.planningSchema.findOne( query as FilterQuery<IPlanningPersistence & Document> );

    return !!planningDocument === true;
  }

  public async save (planning: Planning): Promise<Planning> {

    const query = { domainId: planning.id.toString() };

    const planningDocument = await this.planningSchema.findOne( query );

    try {
      if (planningDocument === null ) {
        const rawPlanning: any = PlanningMap.toPersistence(planning);

        const planningCreated = await this.planningSchema.create(rawPlanning);

        return PlanningMap.toDomain(planningCreated);
      } else {
        planningDocument.id = planning.id;
        planningDocument.armazens = planning.armazens;
        planningDocument.data = planning.data;
        planningDocument.truckRegistration = planning.truckRegistration;
        planningDocument.heuristica = planning.heuristica;

        await planningDocument.save();

        return planning;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (planningId: PlanningId | string): Promise<Planning> {
    const query = { domainId: PlanningId};
    const planningRecord = await this.planningSchema.findOne( query as FilterQuery<IPlanningPersistence & Document> );

    if( planningRecord != null) {
      return PlanningMap.toDomain(planningRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Planning[]> {

    const planningRecord = await this.planningSchema.find();

    return planningRecord !== null ? planningRecord.map((postRecord) => PlanningMap.toDomain(postRecord)): null

  }

  public async remove(planningId: PlanningId | string): Promise<null>{
    const query = { domainId: planningId};
    await this.planningSchema.deleteOne( query as FilterQuery<IPlanningPersistence & Document> );
    return null;
  }

}
