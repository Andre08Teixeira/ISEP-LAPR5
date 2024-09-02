import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import ITruckService from "../src/services/IServices/ITruckService";
import TruckController from "../src/controllers/truckController";
import ITruckDTO from '../src/dto/ITruckDTO';
import { Truck } from '../src/domain/truck';

describe('truck controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let truckSchemaInstance = require("../src/persistence/schemas/truckSchema").default;
		Container.set("truckSchema", truckSchemaInstance);

		let truckRepoClass = require("../src/repos/truckRepo").default;
		let truckRepoInstance = Container.get(truckRepoClass);
		Container.set("TruckRepo", truckRepoInstance);

		let truckServiceClass = require("../src/services/truckService").default;
		let truckServiceInstance = Container.get(truckServiceClass);
		Container.set("TruckService", truckServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

    it('truckController unit test using truckService stub', async function () {
		// Arrange
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

		let truckServiceInstance = Container.get("TruckService");
		sinon.stub(truckServiceInstance, "createTruck").returns( Result.ok<ITruckDTO>( {"id": "123", "registration": req.body.name, "tare": req.body.tare, "maximum_weight": req.body.max_weight, "max_charge" : req.body.max_charge, "autonomy" : req.body.autonomy, "charge_time" : req.body.charge_time} ));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id": "123", "registration": req.body.name, "tare": req.body.tare, "maximum_weight": req.body.max_weight, "max_charge" : req.body.max_charge, "autonomy" : req.body.autonomy, "charge_time" : req.body.charge_time}));
	});


    it('roleController + roleService integration test using roleRepoistory and Role stubs', async function () {	
		// Arrange	
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

		sinon.stub(Truck, "create").returns(Result.ok({"id":"123", "registration": req.body.name, "tare": req.body.tare, "maximum_weight": req.body.max_weight, "max_charge" : req.body.max_charge, "autonomy" : req.body.autonomy, "charge_time" : req.body.charge_time}));

		let truckRepoInstance = Container.get("TruckRepo");
		sinon.stub(truckRepoInstance, "save").returns(new Promise<Truck>((resolve, reject) => {
			resolve(Truck.create({"id":"123", "registration": req.body.name, "tare": req.body.tare, "maximum_weight": req.body.max_weight, "max_charge" : req.body.max_charge, "autonomy" : req.body.autonomy, "charge_time" : req.body.charge_time}).getValue())
		}));

		let truckServiceInstance = Container.get("TruckService");

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "registration": req.body.name, "tare": req.body.tare, "maximum_weight": req.body.max_weight, "max_charge" : req.body.max_charge, "autonomy" : req.body.autonomy, "charge_time" : req.body.charge_time}));
	});


    it('truckController + truckService integration test using spy on truckService', async function () {		
		// Arrange
        let body = { "registration":"EE-69-RT",
        "tare" : 23 ,
        "max_weight" : 24,
        "max_charge" : 25,
        "autonomy" : 26,
        "charge_time" : 27  };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let truckRepoInstance = Container.get("TruckRepo");
		sinon.stub(truckRepoInstance, "save").returns(new Promise<Truck>((resolve, reject) => {
			resolve(Truck.create({"id":"123",  "registration": req.body.name, "tare": req.body.tare, "maximum_weight": req.body.max_weight, "max_charge" : req.body.max_charge, "autonomy" : req.body.autonomy, "charge_time" : req.body.charge_time}).getValue())
		}));

		let truckServiceInstance = Container.get("TruckService");		
		const truckServiceSpy = sinon.spy(truckServiceInstance, "createTruck");

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123",  "registration": req.body.name, "tare": req.body.tare, "maximum_weight": req.body.max_weight, "max_charge" : req.body.max_charge, "autonomy" : req.body.autonomy, "charge_time" : req.body.charge_time}));
		sinon.assert.calledOnce(truckServiceSpy);
		sinon.assert.calledWith(truckServiceSpy, sinon.match({registration: req.body.name, tare: req.body.tare, maximum_weight: req.body.max_weight, max_charge : req.body.max_charge, autonomy : req.body.autonomy, charge_time : req.body.charge_time}));
	});


    it('roleController unit test using roleService mock', async function () {		
		// Arrange
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

		let truckServiceInstance = Container.get("TruckService");		
		const truckServiceMock = sinon.mock(truckServiceInstance, "createTruck")
		truckServiceMock.expects("createTruck")
			.once()
			.withArgs(sinon.match({registration: req.body.name, tare: req.body.tare, maximum_weight: req.body.max_weight, max_charge : req.body.max_charge, autonomy : req.body.autonomy, charge_time : req.body.charge_time}))
			.returns(Result.ok<ITruckDTO>( {"id":"123", "registration": req.body.name, "tare": req.body.tare, "maximum_weight": req.body.max_weight, "max_charge": req.body.max_charge, "autonomy": req.body.autonomy, "charge_time" : req.body.charge_time} ));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		truckServiceMock.verify();
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "registration": req.body.name, "tare": req.body.tare, "maximum_weight": req.body.max_weight, "max_charge": req.body.max_charge, "autonomy": req.body.autonomy, "charge_time" : req.body.charge_time}));
	});
}); 