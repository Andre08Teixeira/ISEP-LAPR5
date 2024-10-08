import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITruckController from "./IControllers/ITruckController";
import ITruckService from '../services/IServices/ITruckService';
import ITruckDTO from '../dto/ITruckDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class TruckController implements ITruckController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.truck.name) private truckServiceInstance : ITruckService
  ) {}

  public async createTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.createTruck(req.body as ITruckDTO) as Result<ITruckDTO>;
        
      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.json( truckDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.updateTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(201).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getTruck(req: Request, res: Response, next:NextFunction) {
    try{
      const truckOrError = await this.truckServiceInstance.getTruck(req.params as unknown as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(201).json( truckDTO );

    }
    catch (e) {
      return next(e);
    }
  }

  public async getAllTrucks(req: Request, res: Response, next:NextFunction) {
    try{
      const truckOrError = await this.truckServiceInstance.getAllTrucks() as Result<ITruckDTO[]>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(201).json( truckDTO );

    }
    catch (e) {
      return next(e);
    }
  }

  public async removeTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.removeTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }
      return res.status(201).json( "The truck was deleted successfully" );
    }
    catch (e) {
      return next(e);
    }
  };  

  public async inhibitTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.inhibitTruck(req.params as unknown as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(201).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  }; 
}