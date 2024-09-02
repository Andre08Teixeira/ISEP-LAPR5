import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ICourseController from "./IControllers/ICourseController";
import ICourseService from '../services/IServices/ICourseService';
import ICourseDTO from '../dto/ICourseDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class CourseController implements ICourseController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.course.name) private courseServiceInstance : ICourseService
  ) {}

  public async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const courseOrError = await this.courseServiceInstance.createCourse(req.body as ICourseDTO) as Result<ICourseDTO>;

      if (courseOrError.isFailure) {
        return res.status(402).send();
      }

      const courseDTO = courseOrError.getValue();
      return res.json( courseDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getCourse(req: Request, res: Response, next:NextFunction) {
    try{
      const courseOrError = await this.courseServiceInstance.getCourse(req.params as unknown as ICourseDTO) as Result<ICourseDTO>;

      if (courseOrError.isFailure) {
        return res.status(404).send();
      }

      const courseDTO = courseOrError.getValue();
      return res.status(201).json( courseDTO );

    }
    catch (e) {
      return next(e);
    }
  }

  public async updateCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const courseOrError = await this.courseServiceInstance.updateCourse(req.body as ICourseDTO) as Result<ICourseDTO>;

      if (courseOrError.isFailure) {
        return res.status(404).send();
      }

      const courseDTO = courseOrError.getValue();
      return res.status(201).json( courseDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAllCourses(req: Request, res: Response, next:NextFunction) {
    try{
      const courseOrError = await this.courseServiceInstance.getAllCourses() as Result<ICourseDTO[]>;

      if (courseOrError.isFailure) {
        return res.status(404).send();
      }

      const courseDTO = courseOrError.getValue();
      return res.status(201).json( courseDTO );

    }
    catch (e) {
      return next(e);
    }
  }

  public async removeCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const courseOrError = await this.courseServiceInstance.removeCourse(req.body as ICourseDTO) as Result<ICourseDTO>;

      if (courseOrError.isFailure) {
        return res.status(404).send();
      }

      const courseDTO = courseOrError.getValue();
      return res.status(201).json( "The course was deleted successfully" );
    }
    catch (e) {
      return next(e);
    }
  };
}
