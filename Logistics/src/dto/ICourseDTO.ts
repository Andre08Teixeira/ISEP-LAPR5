import { Distance } from "../domain/distance";
import { Duration } from "../domain/duration";
import { EnergyNeeded } from "../domain/energyNeeded";

export default interface ICourseDTO {
  id: string;
  warehouseID1: string;
  warehouseID2: string;
  distance: number;
  duration: number;
  energyNeeded: number;
}
