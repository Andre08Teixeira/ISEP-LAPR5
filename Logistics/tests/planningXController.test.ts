import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IPlanningService from "../src/services/IServices/IPlanningService";
import PlanningController from "../src/controllers/planningController";
import IPlanningDTO from '../src/dto/IPlanningDTO';
import { Planning } from '../src/domain/planning';

describe('planning controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let planningSchemaInstance = require("../src/persistence/schemas/planningSchema").default;
		Container.set("planningSchema", planningSchemaInstance);

		let planningRepoClass = require("../src/repos/planningRepo").default;
		let planningRepoInstance = Container.get(planningRepoClass);
		Container.set("PlanningRepo", planningRepoInstance);

		let planningServiceClass = require("../src/services/planningService").default;
		let planningServiceInstance = Container.get(planningServiceClass);
		Container.set("PlanningService", planningServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

    it('planningController unit test using planningService stub', async function () {
		// Arrange
        let body = {  truckID: 1, data: 2};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let planningServiceInstance = Container.get("PlanningService");
		sinon.stub(planningServiceInstance, "createPlanning").returns( Result.ok<IPlanningDTO>( {"id":"123", truckID: req.body.truckID, data: req.body.data} ));

		const ctrl = new PlanningController(planningServiceInstance as IPlanningService);

		// Act
		await ctrl.createPlanning(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", truckID: req.body.truckID, data: req.body.data}));
	});


    it('planningController + planningService integration test using planningRepoistory and Planning stubs', async function () {
		// Arrange
        let body = {  truckID: 1, data: 2};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Planning, "create").returns(Result.ok({"id":"123", truckID: req.body.truckID, data: req.body.data}));

		let planningRepoInstance = Container.get("PlanningRepo");
		sinon.stub(planningRepoInstance, "save").returns(new Promise<Planning>((resolve, reject) => {
			resolve(Planning.create({"id":"123", truckID: req.body.truckID, data: req.body.data}).getValue())
		}));

		let planningServiceInstance = Container.get("PlanningService");

		const ctrl = new PlanningController(planningServiceInstance as IPlanningService);

		// Act
		await ctrl.createPlanning(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", truckID: req.body.truckID, data: req.body.data}));
	});


    it('planningController + planningService integration test using spy on planningService', async function () {
		// Arrange
        let body = {  truckID: 1, data: 2};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let planningRepoInstance = Container.get("PlanningRepo");
		sinon.stub(planningRepoInstance, "save").returns(new Promise<Planning>((resolve, reject) => {
			resolve(Planning.create({ "id": "123", truckID: req.body.truckID, data: req.body.data}).getValue())
		}));

		let planningServiceInstance = Container.get("PlanningService");
		const planningServiceSpy = sinon.spy(planningServiceInstance, "createPlanning");

		const ctrl = new PlanningController(planningServiceInstance as IPlanningService);

		// Act
		await ctrl.createPlanning(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id": "123", truckID: req.body.truckID, data: req.body.data}));
		sinon.assert.calledOnce(planningServiceSpy);
		//sinon.assert.calledTwice(planningServiceSpy);
		sinon.assert.calledWith(planningServiceSpy, sinon.match({ truckID: req.body.truckID, data: req.body.data}));
	});


    it('planningController unit test using planningService mock', async function () {
		// Arrange
        let body = {  truckID: 1, data: 2};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let planningServiceInstance = Container.get("PlanningService");
		const planningServiceMock = sinon.mock(planningServiceInstance, "createPlanning")
		planningServiceMock.expects("createPlanning")
			.once()
			.withArgs(sinon.match({distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded}))
			.returns(Result.ok<IPlanningDTO>( {"id":"123", truckID: req.body.truckID, data: req.body.data} ));

		const ctrl = new PlanningController(planningServiceInstance as IPlanningService);

		// Act
		await ctrl.createPlanning(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		planningServiceMock.verify();
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", truckID: req.body.truckID, data: req.body.data}));
	});
});


