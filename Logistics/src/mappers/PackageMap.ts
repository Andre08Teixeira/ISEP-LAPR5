import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IPackagePersistence } from '../dataschema/IPackagePersistence';
import IPackageDTO from "../dto/IPackageDTO";
import { Package } from "../domain/package";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


export class PackageMap extends Mapper<Package> {


public static toDTO( packagee: Package): IPackageDTO {
  return {
    id: packagee.id.toString(),
    x:packagee.x,
    y:packagee.y,
    z:packagee.z,
    tCarga:packagee.tCarga,
    tDescarga:packagee.tDescarga,
  } as IPackageDTO;
}


  public static toDomain (packagee: any | Model<IPackagePersistence & Document> ): Package {
    const packageOrError = Package.create(
      packagee,
      new UniqueEntityID(packagee.domainId)
    );

    packageOrError.isFailure ? console.log(packageOrError.error) : '';

    return packageOrError.isSuccess ? packageOrError.getValue() : null;
  }

  public static toPersistence (packagee: Package): any {
    return {
     domainId: packagee.id.toString(),
     x: packagee.x,
     y: packagee.y,
     z: packagee.z,
     tCarga: packagee.tCarga,
     tDescarga: packagee.tDescarga
    }
  }
}