import { Service, Inject } from 'typedi';
import config from "../../config";
import ITruckDTO from '../dto/ITruckDTO';
import { Truck } from "../domain/truck";
import ITruckRepo from '../services/IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import { Result } from "../core/logic/Result";
import { TruckMap } from "../mappers/TruckMap";

@Service()
export default class TruckService implements ITruckService {
  constructor(
      @Inject(config.repos.truck.name) private truckRepo : ITruckRepo
  ) {}

  public async getTruck( truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByRegistration(truckDTO.registration);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {

      const truckOrError = await Truck.create( truckDTO );

      if (truckOrError.isFailure) {
        return Result.fail<ITruckDTO>(truckOrError.errorValue());
      }

      const truckResult = truckOrError.getValue();
      truckResult.truckIsDeleted = Boolean(false);

      await this.truckRepo.save(truckResult);

      const truckDTOResult = TruckMap.toDTO( truckResult ) as ITruckDTO;
      return Result.ok<ITruckDTO>( truckDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByRegistration(truckDTO.registration);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        truck.truckRegistration = truckDTO.registration;
        truck.truckTare = truckDTO.tare;
        truck.truckMaxWeight = truckDTO.maximum_weight;
        truck.truckMaxCharge = truckDTO.max_charge;
        truck.truckAutonomy = truckDTO.autonomy;
        truck.truckChargeTime = truckDTO.charge_time;
        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getAllTrucks(): Promise<Result<ITruckDTO[]>> {
    try {
      const truckList = await this.truckRepo.findAll(); 

      if (truckList === null) {
        return Result.fail<ITruckDTO[]>("Trucks not found");
      }

      const result = truckList.map((truckList) => TruckMap.toDTO(truckList) as ITruckDTO);
      return Result.ok<ITruckDTO[]>(result);

    } catch (e) {
      throw e;
    }
  }

  public async removeTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByRegistration(truckDTO.registration);
      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        await this.truckRepo.remove(truck.truckRegistration);

        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async inhibitTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByRegistration(truckDTO.registration);
      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        truck.truckIsDeleted = Boolean(true);
        await this.truckRepo.save(truck);
        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}
