import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ICourseController from '../../controllers/IControllers/ICourseController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/courses', route);

  const ctrl = Container.get(config.controllers.course.name) as ICourseController;

  route.post('',
    celebrate({
      body: Joi.object({
        warehouseID1: Joi.string().required(),
        warehouseID2: Joi.string().required(),
        distance: Joi.number().required().min(0),
        duration: Joi.number().required().min(0),
        energyNeeded: Joi.number().required().min(0)
      })
    }),
    (req, res, next) => ctrl.createCourse(req, res, next) );

  route.put('/byID',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        warehouseID1: Joi.string().required(),
        warehouseID2: Joi.string().required(),
        distance: Joi.number().required().min(0),
        duration: Joi.number().required().min(0),
        energyNeeded: Joi.number().required().min(0)
      }),
    }),
    (req, res, next) => ctrl.updateCourse(req, res, next) );

  route.get('/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required()
      })
  }),
    (req, res, next) => ctrl.getCourse(req, res, next) );


    route.get('',
    celebrate({
      params: Joi.object({
    })
  }),
    (req, res, next) => ctrl.getAllCourses(req, res, next) );


    route.delete('/:id',
    celebrate({
      body: Joi.object({
        id: Joi.string().required()
      })
  }),
  (req, res, next) => ctrl.removeCourse(req, res, next) );
};
