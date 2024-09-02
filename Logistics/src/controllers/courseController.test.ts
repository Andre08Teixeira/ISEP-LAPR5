/* import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import ICourseService from "../services/IServices/ICourseService";
import CourseController from "./courseController";
import ICourseDTO from '../dto/ICourseDTO';

describe('course controller', function () {
	beforeEach(function() {
    });

    it('createCourse: returns json with id+distance+duration+distance+energyNeeded values', async function () {
        let body = {  distance: 10 , duration : 30 , energyNeeded : 50 };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let courseServiceClass = require(config.services.role.path).default;
		let courseServiceInstance = Container.get(courseServiceClass);
		Container.set(config.services.course.name, courseServiceInstance);

		courseServiceInstance = Container.get(config.services.role.name);
		sinon.stub(courseServiceInstance, "createCourse").returns( Result.ok<ICourseDTO>( {"id":"123", distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded} ));

		const ctrl = new CourseController(courseServiceInstance as ICourseService);

		await ctrl.createCourse(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", distance: req.body.distance , duration : req.body.duration , energyNeeded : req.body.energyNeeded}));
	});
}); */