import { Result } from "../../core/logic/Result";
import IPackageDTO from "../../dto/IPackageDTO";

export default interface IPackageService  {
  createPackage(packageDTO: IPackageDTO): Promise<Result<IPackageDTO>>;
  updatePackage(packageDTO: IPackageDTO): Promise<Result<IPackageDTO>>;
  getPackage (packageId: IPackageDTO): Promise<Result<IPackageDTO>>;

  getPackage (packageDTO: IPackageDTO): Promise<Result<IPackageDTO>>;
  getAllPackages (): Promise<Result<IPackageDTO[]>>;
  removePackage(packageDTO: IPackageDTO): Promise<Result<IPackageDTO>>;
}
