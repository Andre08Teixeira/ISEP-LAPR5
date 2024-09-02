import { Request, Response, NextFunction } from 'express';

export default interface IUserController  {
  getUser(req: Request, res: Response, next: NextFunction);
  getAllUsers(req: Request, res: Response, next: NextFunction);
  getMe(req: Request, res: Response);
  anonymizeUser(req: Request, res: Response, next: NextFunction);
  SignIn(req: Request, res: Response, next: NextFunction);
}