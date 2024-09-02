import { Result } from "../../core/logic/Result";
import IPlanningDTO from "../../dto/IPlanningDTO";

export default interface IPlanningService  {
  createPlanning(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>;
  updatePlanning(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>;
  getPlanning (planningId: IPlanningDTO): Promise<Result<IPlanningDTO>>;

  getPlanning (planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>;
  getAllPlannings (): Promise<Result<IPlanningDTO[]>>;
  removePlanning(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>>;
}
