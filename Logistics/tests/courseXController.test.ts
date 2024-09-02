import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import ICourseService from "../src/services/IServices/ICourseService";
import CourseController from "../src/controllers/courseController";
import ICourseDTO from '../src/dto/ICourseDTO';
import { Course } from '../src/domain/course';

describe('course controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let courseSchemaInstance = require("../src/persistence/schemas/courseSchema").default;
		Container.set("courseSchema", courseSchemaInstance);

		let courseRepoClass = require("../src/repos/courseRepo").default;
		let courseRepoInstance = Container.get(courseRepoClass);
		Container.set("CourseRepo", courseRepoInstance);

		let courseServiceClass = require("../src/services/courseService").default;
		let courseServiceInstance = Container.get(courseServiceClass);
		Container.set("CourseService", courseServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

    it('courseController unit test using courseService stub', async function () {
		// Arrange
        let body = {  warehouseID1: 1, warehouseID2: 2, distance: 10 , duration : 30 , energyNeeded : 50 };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let courseServiceInstance = Container.get("CourseService");
		sinon.stub(courseServiceInstance, "createCourse").returns( Result.ok<ICourseDTO>( {"id":"123", warehouseID1: req.body.warehouseID1, warehouseID2: req.body.warehouseID2, distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded} ));

		const ctrl = new CourseController(courseServiceInstance as ICourseService);

		// Act
		await ctrl.createCourse(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", warehouseID1: req.body.warehouseID1, warehouseID2: req.body.warehouseID2, distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded}));
	});


    it('courseController + courseService integration test using courseRepoistory and Course stubs', async function () {
		// Arrange
        let body = { warehouseID1: 1, warehouseID2: 2, distance: 10 , duration : 30 , energyNeeded : 50 };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Course, "create").returns(Result.ok({"id":"123", warehouseID1: req.body.warehouseID1, warehouseID2: req.body.warehouseID2, distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded}));

		let courseRepoInstance = Container.get("CourseRepo");
		sinon.stub(courseRepoInstance, "save").returns(new Promise<Course>((resolve, reject) => {
			resolve(Course.create({"id":"123", warehouseID1: req.body.warehouseID1, warehouseID2: req.body.warehouseID2, distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded}).getValue())
		}));

		let courseServiceInstance = Container.get("CourseService");

		const ctrl = new CourseController(courseServiceInstance as ICourseService);

		// Act
		await ctrl.createCourse(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", warehouseID1: req.body.warehouseID1, warehouseID2: req.body.warehouseID2, distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded}));
	});


    it('courseController + courseService integration test using spy on courseService', async function () {
		// Arrange
        let body = { warehouseID1: 1, warehouseID2: 2, distance: 10 , duration : 30 , energyNeeded : 50 };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let courseRepoInstance = Container.get("CourseRepo");
		sinon.stub(courseRepoInstance, "save").returns(new Promise<Course>((resolve, reject) => {
			resolve(Course.create({ "id": "123", warehouseID1: req.body.warehouseID1, warehouseID2: req.body.warehouseID2, distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded}).getValue())
		}));

		let courseServiceInstance = Container.get("CourseService");
		const courseServiceSpy = sinon.spy(courseServiceInstance, "createCourse");

		const ctrl = new CourseController(courseServiceInstance as ICourseService);

		// Act
		await ctrl.createCourse(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id": "123", distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded}));
		sinon.assert.calledOnce(courseServiceSpy);
		//sinon.assert.calledTwice(courseServiceSpy);
		sinon.assert.calledWith(courseServiceSpy, sinon.match({warehouseID1: req.body.warehouseID1, warehouseID2: req.body.warehouseID2, distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded}));
	});


    it('courseController unit test using courseService mock', async function () {
		// Arrange
        let body = { warehouseID1: 1, warehouseID2: 2, distance: 10 , duration : 30 , energyNeeded : 50 };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let courseServiceInstance = Container.get("CourseService");
		const courseServiceMock = sinon.mock(courseServiceInstance, "createCourse")
		courseServiceMock.expects("createCourse")
			.once()
			.withArgs(sinon.match({distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded}))
			.returns(Result.ok<ICourseDTO>( {"id":"123", warehouseID1: req.body.warehouseID1, warehouseID2: req.body.warehouseID2, distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded} ));

		const ctrl = new CourseController(courseServiceInstance as ICourseService);

		// Act
		await ctrl.createCourse(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		courseServiceMock.verify();
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", warehouseID1: req.body.warehouseID1, warehouseID2: req.body.warehouseID2, distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded}));
	});
});


