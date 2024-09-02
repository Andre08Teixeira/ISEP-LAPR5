import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPackageController from "./IControllers/IPackageController";
import IPackageService from '../services/IServices/IPackageService';
import IPackageDTO from '../dto/IPackageDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class PackageController implements IPackageController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.packagee.name) private packageServiceInstance : IPackageService
  ) {}

  public async createPackage(req: Request, res: Response, next: NextFunction) {
    try {
      const packageOrError = await this.packageServiceInstance.createPackage(req.body as IPackageDTO) as Result<IPackageDTO>;

      if (packageOrError.isFailure) {
        return res.status(402).send();
      }

      const packageDTO = packageOrError.getValue();
      return res.json( packageDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePackage(req: Request, res: Response, next: NextFunction) {
    try {
      const packageOrError = await this.packageServiceInstance.updatePackage(req.body as IPackageDTO) as Result<IPackageDTO>;

      if (packageOrError.isFailure) {
        return res.status(404).send();
      }

      const packageDTO = packageOrError.getValue();
      return res.status(201).json( packageDTO );
    }
    catch (e) {
      return next(e);
    }
  };


  public async getPackage(req: Request, res: Response, next:NextFunction) {
    try{
      const packageOrError = await this.packageServiceInstance.getPackage(req.params as unknown as IPackageDTO) as Result<IPackageDTO>;

      if (packageOrError.isFailure) {
        return res.status(404).send();
      }

      const packageDTO = packageOrError.getValue();
      return res.status(201).json( packageDTO );

    }
    catch (e) {
      return next(e);
    }
  }

  public async getAllPackages(req: Request, res: Response, next:NextFunction) {
    try{
      const packageOrError = await this.packageServiceInstance.getAllPackages() as Result<IPackageDTO[]>;

      if (packageOrError.isFailure) {
        return res.status(404).send();
      }

      const packageDTO = packageOrError.getValue();
      return res.status(201).json( packageDTO );

    }
    catch (e) {
      return next(e);
    }
  }

  public async removePackage(req: Request, res: Response, next: NextFunction) {
    try {
      const packageOrError = await this.packageServiceInstance.removePackage(req.body as IPackageDTO) as Result<IPackageDTO>;

      if (packageOrError.isFailure) {
        return res.status(404).send();
      }

      const packageDTO = packageOrError.getValue();
      return res.status(201).json( "The package was deleted successfully" );
    }
    catch (e) {
      return next(e);
    }
  };
}
