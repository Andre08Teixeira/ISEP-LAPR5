/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';
import config from "../../config";
import IPlanningDTO from '../dto/IPlanningDTO';
import { Planning } from "../domain/planning";
import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import IPlanningService from './IServices/IPlanningService';
import { Result } from "../core/logic/Result";
import { PlanningMap } from "../mappers/PlanningMap";

@Service()
export default class PlanningService implements IPlanningService {
  constructor(
      @Inject(config.repos.planning.name) private planningRepo : IPlanningRepo
  ) {}

  public async getPlanning( planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>> {
    try {
      const planning = await this.planningRepo.findByDomainId(planningDTO.id);

      if (planning === null) {
        return Result.fail<IPlanningDTO>("Trip not found");
      }
      else {
        const planningDTOResult = PlanningMap.toDTO( planning ) as IPlanningDTO;
        return Result.ok<IPlanningDTO>( planningDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createPlanning(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>> {
    try {

      const planningOrError = await Planning.create( planningDTO );

      if (planningOrError.isFailure) {
        return Result.fail<IPlanningDTO>(planningOrError.errorValue());
      }

      const planningResult = planningOrError.getValue();

      await this.planningRepo.save(planningResult);

      const planningDTOResult = PlanningMap.toDTO( planningResult ) as IPlanningDTO;
      return Result.ok<IPlanningDTO>( planningDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updatePlanning(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>> {
    try {
      const planning = await this.planningRepo.findByDomainId(planningDTO.id);

      if (planning === null) {
        return Result.fail<IPlanningDTO>("Planning not found");
      }
      else {
        planning.armazens = planningDTO.armazens;
        planning.data = planningDTO.data;
        planning.truckRegistration = planningDTO.truckRegistration;
        planning.heuristica = planningDTO.heuristica;
        await this.planningRepo.save(planning);

        const planningDTOResult = PlanningMap.toDTO( planning ) as IPlanningDTO;
        return Result.ok<IPlanningDTO>( planningDTOResult)
        }
    } catch (e) {
      throw e;
    }
  }

  public async getAllPlannings(): Promise<Result<IPlanningDTO[]>> {
    try {
      const planningList = await this.planningRepo.findAll();

      if (planningList === null) {
        return Result.fail<IPlanningDTO[]>("Plannings not found");
      }

      const result = planningList.map((planningList) => PlanningMap.toDTO(planningList) as IPlanningDTO);
      return Result.ok<IPlanningDTO[]>(result);

    } catch (e) {
      throw e;
    }
  }

  public async removePlanning(planningDTO: IPlanningDTO): Promise<Result<IPlanningDTO>> {
    try {
      const planning = await this.planningRepo.findByDomainId(planningDTO.id);
      if (planning === null) {
        return Result.fail<IPlanningDTO>("Planning not found");
      }
      else {
        await this.planningRepo.remove(planning.id);

        const planningDTOResult = PlanningMap.toDTO( planning ) as IPlanningDTO;
        return Result.ok<IPlanningDTO>( planningDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
}
