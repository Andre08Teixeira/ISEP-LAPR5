/*import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import ITruckService from "../services/IServices/ITruckService";
import TruckController from "./truckController";
import ITruckDTO from '../dto/ITruckDTO';

describe('truck controller', function () {
	beforeEach(function() {
    });

    it('createTruck: returns json with id, registration, tare, maximum weight, maximum charge, autonomy, charge time values', async function () {
        let body = { "registration":"EE-69-RT",
        "tare" : 23 ,
        "max_weight" : 24,
        "max_charge" : 25,
        "autonomy" : 26,
        "charge_time" : 27 };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let truckServiceClass = require(config.services.truck.path).default;
		let truckServiceInstance = Container.get(truckServiceClass)
		Container.set(config.services.truck.name, truckServiceInstance);

		truckServiceInstance = Container.get(config.services.truck.name);
		sinon.stub(truckServiceInstance, "createTruck").returns( Result.ok<ITruckDTO>( {"id":"123", "registration": req.body.name, "tare": req.body.tare, "maximum_weight": req.body.max_weight, "max_charge" : req.body.max_charge, "autonomy" : req.body.autonomy, "charge_time" : req.body.charge_time } ));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"123", "registration": req.body.name, "tare": req.body.tare, "maximum_weight": req.body.max_weight, "max_charge" : req.body.max_charge, "autonomy" : req.body.autonomy, "charge_time" : req.body.charge_time}));
	});
});*/