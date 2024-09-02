import { Repo } from "../../core/infra/Repo";
import { Planning } from "../../domain/planning";
import { PlanningId } from "../../domain/planningId";

export default interface IPlanningRepo extends Repo<Planning> {
  save(planninge: Planning): Promise<Planning>;
  findByDomainId (planningId: PlanningId | string): Promise<Planning>;
  findAll(): Promise<Planning[]>;
	remove(planningId: PlanningId);
}
