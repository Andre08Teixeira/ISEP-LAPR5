/*import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IPackageService from "../src/services/IServices/IPackageService";
import PackageController from "../src/controllers/packageController";
import IPackageDTO from '../src/dto/IPackageDTO';
import { Package } from '../src/domain/package';


describe('package controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let packageSchemaInstance = require("../src/persistence/schemas/packageSchema").default;
		Container.set("packageSchema", packageSchemaInstance);
 
		let packageRepoClass = require("../src/repos/packageRepo").default;
		let packageRepoInstance = Container.get(packageRepoClass);
		Container.set("RoleRepo", packageRepoInstance);

		let packageServiceClass = require("../src/services/packageService").default;
		let packageServiceInstance = Container.get(packageServiceClass);
		Container.set("PackageService", packageServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

    it('packageController unit test using roleService stub', async function () {
		// Arrange
        let body = { "x": 5,
        "y" : 14 ,
        "z" : 3,
        "tCarga" : 15,
        "tDescarga" : 20 };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let packageServiceInstance = Container.get("PackageService");
		sinon.stub(packageServiceInstance, "createPackage").returns( Result.ok<IPackageDTO>( {"id": "123", "x": req.body.x, "y": req.body.y, "z": req.body.z, "tCarga" : req.body.tCarga, "tDescarga" : req.body.tDescarga } ));

		const ctrl = new PackageController(packageServiceInstance as IPackageService);

		// Act
		await ctrl.createPackage(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id": "123", "x": req.body.x, "y": req.body.taye, "z": req.body.z, "tCarga" : req.body.tCarga, "tDescarga" : req.body.tDescarga}));
	});


    it('packageController + roleService integration test using packageRepoistory and Role stubs', async function () {	
		// Arrange	
        let body = { "x": 5,
        "y" : 14 ,
        "z" : 3,
        "tCarga" : 15,
        "tDescarga" : 20 };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Package, "create").returns(Result.ok({"id":"123", "x": req.body.x, "y": req.body.y, "z": req.body.z, "tCarga" : req.body.tCarga, "tDescarga" : req.body.tDescarga}));

		let packageRepoInstance = Container.get("PackageRepo");
		sinon.stub(packageRepoInstance, "save").returns(new Promise<Package>((resolve, reject) => {
			resolve(Package.create({"id":"123", "x": req.body.x, "y": req.body.y, "z": req.body.z, "tCarga" : req.body.tCarga, "tDescarga" : req.body.tDescarga}).getValue())
		}));

		let packageServiceInstance = Container.get("PackageService");

		const ctrl = new PackageController(packageServiceInstance as IPackageService);

		// Act
		await ctrl.createPackage(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "x": req.body.x, "y": req.body.y, "z": req.body.z, "tCarga" : req.body.tCarga, "tDescarga" : req.body.tDescarga}));
	});


    it('packageController + packageService integration test using spy on packageService', async function () {		
		// Arrange
        let body = { "x": 5,
        "y" : 14 ,
        "z" : 3,
        "tCarga" : 15,
        "tDescarga" : 20};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let packageRepoInstance = Container.get("PackageRepo");
		sinon.stub(packageRepoInstance, "save").returns(new Promise<Package>((resolve, reject) => {
			resolve(Package.create({"id":"123",  "x": req.body.x, "y": req.body.y, "z": req.body.z, "tCarga" : req.body.tCarga, "tDescarga" : req.body.tDescarga}).getValue())
		}));

		let packageServiceInstance = Container.get("PackageService");		
		const packageServiceSpy = sinon.spy(packageServiceInstance, "createPackage");

		const ctrl = new PackageController(packageServiceInstance as IPackageService);

		// Act
		await ctrl.createPackage(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123",  "x": req.body.x, "y": req.body.y, "z": req.body.z, "tCarga" : req.body.tCarga, "tDescarga" : req.body.tDescarga}));
		sinon.assert.calledOnce(packageServiceSpy);
		sinon.assert.calledWith(packageServiceSpy, sinon.match({x: req.body.x, y: req.body.y, z: req.body.z, tCarga : req.body.tCarga, tDescarga : req.body.tDescarga}));
	});


    it('packageController unit test using packageService mock', async function () {		
		// Arrange
        let body = { "x": 5,
        "y" : 14 ,
        "z" : 3,
        "tCarga" : 15,
        "tDescarga" : 20};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let packageServiceInstance = Container.get("PackageService");		
		const packageServiceMock = sinon.mock(packageServiceInstance, "createPackage")
		packageServiceMock.expects("createPackage")
			.once()
			.withArgs(sinon.match({x: req.body.x, y: req.body.y, z: req.body.z, tCarga : req.body.tCarga, tDescarga : req.body.tDescarga}))
			.returns(Result.ok<IPackageDTO>( {"id":"123", "x": req.body.x, "y": req.body.y, "z": req.body.z, "tCarga": req.body.tCarga, "tDescarga": req.body.tDescarga} ));

		const ctrl = new PackageController(packageServiceInstance as IPackageService);

		// Act
		await ctrl.createPackage(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		packageServiceMock.verify();
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "x": req.body.x, "y": req.body.y, "z": req.body.z, "tCarga": req.body.tCarga, "tDescarga": req.body.tDescarga}));
	});
}); */