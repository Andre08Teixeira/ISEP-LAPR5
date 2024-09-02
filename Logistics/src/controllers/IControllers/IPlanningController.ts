import { Request, Response, NextFunction } from 'express';

export default interface IPlanningController  {
  createPlanning(req: Request, res: Response, next: NextFunction);
  updatePlanning(req: Request, res: Response, next: NextFunction);
  getPlanning(req: Request, res: Response, next: NextFunction);
  getAllPlannings(req: Request, res: Response, next: NextFunction);
  removePlanning(req: Request, res: Response, next: NextFunction);
}
