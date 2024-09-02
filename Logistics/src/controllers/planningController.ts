import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPlanningController from "./IControllers/IPlanningController";
import IPlanningService from '../services/IServices/IPlanningService';
import IPlanningDTO from '../dto/IPlanningDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class PlanningController implements IPlanningController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.planning.name) private planningServiceInstance : IPlanningService
  ) {}

  public async createPlanning(req: Request, res: Response, next: NextFunction) {
    try {
      const planningOrError = await this.planningServiceInstance.createPlanning(req.body as IPlanningDTO) as Result<IPlanningDTO>;

      if (planningOrError.isFailure) {
        return res.status(402).send();
      }

      const planningDTO = planningOrError.getValue();
      return res.json( planningDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePlanning(req: Request, res: Response, next: NextFunction) {
    try {
      const planningOrError = await this.planningServiceInstance.updatePlanning(req.body as IPlanningDTO) as Result<IPlanningDTO>;

      if (planningOrError.isFailure) {
        return res.status(404).send();
      }

      const planningDTO = planningOrError.getValue();
      return res.status(201).json( planningDTO );
    }
    catch (e) {
      return next(e);
    }
  };


  public async getPlanning(req: Request, res: Response, next:NextFunction) {
    try{
      const planningOrError = await this.planningServiceInstance.getPlanning(req.body as IPlanningDTO) as Result<IPlanningDTO>;

      if (planningOrError.isFailure) {
        return res.status(404).send();
      }

      const planningDTO = planningOrError.getValue();
      return res.status(201).json( planningDTO );

    }
    catch (e) {
      return next(e);
    }
  }

  public async getAllPlannings(req: Request, res: Response, next:NextFunction) {
    try{
      const planningOrError = await this.planningServiceInstance.getAllPlannings() as Result<IPlanningDTO[]>;

      if (planningOrError.isFailure) {
        return res.status(404).send();
      }

      const planningDTO = planningOrError.getValue();
      return res.status(201).json( planningDTO );

    }
    catch (e) {
      return next(e);
    }
  }

  public async removePlanning(req: Request, res: Response, next: NextFunction) {
    try {
      const planningOrError = await this.planningServiceInstance.removePlanning(req.body as IPlanningDTO) as Result<IPlanningDTO>;

      if (planningOrError.isFailure) {
        return res.status(404).send();
      }

      const planningDTO = planningOrError.getValue();
      return res.status(201).json( "The planning was deleted successfully" );
    }
    catch (e) {
      return next(e);
    }
  };
}
