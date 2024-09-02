import { Result } from "../../core/logic/Result";
import ITruckDTO from "../../dto/ITruckDTO";

export default interface ITruckService  {
  createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;

  getTruck (truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  getAllTrucks (): Promise<Result<ITruckDTO[]>>;
  removeTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  inhibitTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
}
