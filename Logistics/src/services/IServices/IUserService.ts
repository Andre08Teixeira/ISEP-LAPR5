import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  getAllUsers(): any;
  getUser(arg0: IUserDTO): any;
  SignUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
  anonymizeUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
}
