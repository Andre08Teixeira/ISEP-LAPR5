import { Response, Request, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import { Container} from 'typedi';

import config from '../../config';

import IUserRepo from '../services/IRepos/IUserRepo';
import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';
import IUserService from '../services/IServices/IUserService';
import IUserController from './IControllers/IUserController';
import { Result } from '../core/logic/Result';
import winston from 'winston';

@Service()
export default class UserController implements IUserController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.user.name) private userServiceInstance : IUserService
    ) {}

getMe = async function(req, res: Response) {
  
    // NB: a arquitetura ONION não está a ser seguida aqui

    const userRepo = Container.get(config.repos.user.name) as IUserRepo

    if( !req.token || req.token == undefined )
        return res.json( new Error("Token inexistente ou inválido")).status(401);

    const user = await userRepo.findById( req.token.id );
    if (!user)
        return res.json( new Error("Utilizador não registado")).status(401);

    const userDTO = UserMap.toDTO( user ) as IUserDTO;
    return res.json( userDTO ).status(200);
}

public async getUser(req: Request, res: Response, next:NextFunction) {
    try{
      const userOrError = await this.userServiceInstance.getUser(req.params as unknown as IUserDTO) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(404).send();
      }

      const userDTO = userOrError.getValue();
      return res.status(201).json( userDTO );

    }
    catch (e) {
      return next(e);
    }
  }

  public async SignIn(req: Request, res: Response, next:NextFunction) {
    const logger = Container.get('logger') as winston.Logger;
        logger.debug('Calling Sign-In endpoint with body: %o', req.body)
        try {
          const { email, password } = req.body;
          console.log("joao");
          const result = await this.userServiceInstance.SignIn(email, password);
          console.log("miranda");

          console.log(result.isFailure);

          if( result.isFailure )
            return res.status(403).send();

          const { userDTO, token } = result.getValue();
          return res.json({ userDTO, token }).status(200);

        } catch (e) {
          logger.error('🔥 error: %o',  e );
          return next(e);
        }
  }

  public async getAllUsers(req: Request, res: Response, next:NextFunction) {
    try{
      const userOrError = await this.userServiceInstance.getAllUsers() as Result<IUserDTO[]>;

      if (userOrError.isFailure) {
        return res.status(404).send();
      }

      const userDTO = userOrError.getValue();
      return res.status(201).json( userDTO );

    }
    catch (e) {
      return next(e);
    }
  }

  public async anonymizeUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.anonymizeUser(req.params as unknown as IUserDTO) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(404).send();
      }

      const userDTO = userOrError.getValue();
      return res.status(201).json( userDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}

