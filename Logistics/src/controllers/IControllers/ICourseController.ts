import { Request, Response, NextFunction } from 'express';

export default interface ICourseController  {
  createCourse(req: Request, res: Response, next: NextFunction);
  updateCourse(req: Request, res: Response, next: NextFunction);
  getCourse(req: Request, res: Response, next: NextFunction);
  getAllCourses(req: Request, res: Response, next: NextFunction);
  removeCourse(req: Request, res: Response, next: NextFunction);
}
