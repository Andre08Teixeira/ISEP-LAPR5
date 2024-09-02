import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPackageController from '../../controllers/IControllers/IPackageController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/packages', route);

  const ctrl = Container.get(config.controllers.packagee.name) as IPackageController;

  route.post('',
    celebrate({
      body: Joi.object({
        x: Joi.number().required().min(0).max(10),
        y: Joi.number().required().min(0).max(20),
        z: Joi.number().required().min(0).max(8),
        tCarga: Joi.number().required().min(0),
        tDescarga: Joi.number().required().min(0)
      })
    }),
    (req, res, next) => ctrl.createPackage(req, res, next) );

  route.put('/byID',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        x: Joi.number().required().min(0).max(10),
        y: Joi.number().required().min(0).max(20),
        z: Joi.number().required().min(0).max(8),
        tCarga: Joi.number().required().min(0),
        tDescarga: Joi.number().required().min(0)
      }),
    }),
    (req, res, next) => ctrl.updatePackage(req, res, next) );

    route.get('/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required()
      })
  }),
  (req, res, next) => ctrl.getPackage(req, res, next) );

  route.get('',
    celebrate({
      params: Joi.object({
    })
  }),
  (req, res, next) => ctrl.getAllPackages(req, res, next) );

  route.delete('/byID',
    celebrate({
      body: Joi.object({
        id: Joi.string().required()
      })
  }),
  (req, res, next) => ctrl.removePackage(req, res, next) );

};
