import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPlanningController from '../../controllers/IControllers/IPlanningController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/trips', route);

  const ctrl = Container.get(config.controllers.planning.name) as IPlanningController;

  route.post('',
    celebrate({
      body: Joi.object({
        armazens: Joi.array().items(Joi.string().required()).min(2).error(new Error('Armazens is required and must contain at least 2 items')),
        data: Joi.string().required(),
        truckRegistration : Joi.string().uppercase().regex(/([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})/).required(),
        heuristica: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createPlanning(req, res, next) );

    route.get('',
    celebrate({
      body: Joi.object({
      })
    }),
    (req, res, next) => ctrl.getAllPlannings(req, res, next) );

};
