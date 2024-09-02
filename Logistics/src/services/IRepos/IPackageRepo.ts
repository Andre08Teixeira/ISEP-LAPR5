import { Repo } from "../../core/infra/Repo";
import { Package } from "../../domain/package";
import { PackageId } from "../../domain/packageId";

export default interface IPackageRepo extends Repo<Package> {
  save(packagee: Package): Promise<Package>;
  findByDomainId (packageId: PackageId | string): Promise<Package>;
  findAll(): Promise<Package[]>;
	remove(packageId: PackageId);  
  
}