import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/trucks', route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  route.post('',
    celebrate({
      body: Joi.object({
        registration: Joi.string().uppercase().regex(/([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})/).required(),
        tare: Joi.number().required().min(1),
        maximum_weight : Joi.number().required().min(1),
        max_charge: Joi.number().required().min(1),
        autonomy: Joi.number().required().min(1),
        charge_time: Joi.number().required().min(1),
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next) );

  route.put('/byregistration',
    celebrate({
      body: Joi.object({
        registration: Joi.string().uppercase().regex(/([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})/).required(),
        tare: Joi.number().required().min(1),
        maximum_weight : Joi.number().required().min(1),
        max_charge: Joi.number().required().min(1),
        autonomy: Joi.number().required().min(1),
        charge_time: Joi.number().required().min(1)
      }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next) );

  route.get('/:registration',
    celebrate({
      params: Joi.object({
        registration: Joi.string().uppercase().regex(/([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})/).required()
    })
  }),
  (req, res, next) => ctrl.getTruck(req, res, next) );

  route.get('',
    celebrate({
      params: Joi.object({
    })
  }),
  (req, res, next) => ctrl.getAllTrucks(req, res, next) );

  route.delete('/byregistration',
    celebrate({
      body: Joi.object({
        registration: Joi.string().uppercase().regex(/([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})/).required()
    })
  }),
  (req, res, next) => ctrl.removeTruck(req, res, next) );

  route.patch('/inhibit/:registration',
    celebrate({
      params: Joi.object({
        registration: Joi.string().uppercase().regex(/([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})/).required()
    })
  }),
  (req, res, next) => ctrl.inhibitTruck(req, res, next) );  
}; 