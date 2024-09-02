import { Distance } from "../domain/distance";
import { Duration } from "../domain/duration";
import { EnergyNeeded } from "../domain/energyNeeded";

export interface ICoursePersistence {
  domainId: string;
  warehouseID1: string;
  warehouseID2: string;
  distance: number;
  duration: number;
  energyNeeded: number;
}
