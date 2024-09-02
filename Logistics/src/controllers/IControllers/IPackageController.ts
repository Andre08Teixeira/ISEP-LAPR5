import { Request, Response, NextFunction } from 'express';

export default interface IPackageController  {
  createPackage(req: Request, res: Response, next: NextFunction);
  updatePackage(req: Request, res: Response, next: NextFunction);
  getPackage(req: Request, res: Response, next: NextFunction);
  getAllPackages(req: Request, res: Response, next: NextFunction);
  removePackage(req: Request, res: Response, next: NextFunction);
}
