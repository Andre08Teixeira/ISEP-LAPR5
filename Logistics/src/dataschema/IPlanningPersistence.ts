import { TruckRegistration } from "../domain/truckRegistration";

export interface IPlanningPersistence {
    planningId: string;
    armazens: string[];
    data: string;
    truckRegistration: TruckRegistration;
    heuristica: string;
  }
