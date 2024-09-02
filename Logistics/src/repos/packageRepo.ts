import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';

import { IPackagePersistence } from '../dataschema/IPackagePersistence';
import { Package } from '../domain/package';
import IPackageRepo from '../services/IRepos/IPackageRepo';
import { PackageId } from '../domain/packageId';
import { PackageMap } from '../mappers/PackageMap';

@Service()
export default class PackageRepo implements IPackageRepo {
  private models: any;

  constructor(
    @Inject('packageSchema') private packageSchema : Model<IPackagePersistence & Document>,
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (packagee: Package): Promise<boolean> {

    const idX = packagee.id instanceof PackageId ? (<PackageId>packagee.id).toValue() : packagee.id;

    const query = { domainId: idX};
    const packageDocument = await this.packageSchema.findOne( query as FilterQuery<IPackagePersistence & Document> );

    return !!packageDocument === true;
  }

  public async save (packagee: Package): Promise<Package> {

    const query = { domainId: packagee.id.toString() };

    const packageDocument = await this.packageSchema.findOne( query );

    try {
      if (packageDocument === null ) {
        const rawPackage: any = PackageMap.toPersistence(packagee);

        const packageCreated = await this.packageSchema.create(rawPackage);

        return PackageMap.toDomain(packageCreated);
      } else {
        packageDocument.id = packagee.id;
        packageDocument.x = packagee.x;
        packageDocument.y = packagee.y;
        packageDocument.z = packagee.z;
        packageDocument.tCarga = packagee.tCarga;
        packageDocument.tDescarga = packagee.tDescarga;

        await packageDocument.save();

        return packagee;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (packageId: PackageId | string): Promise<Package> {
    const query = { domainId: packageId};
    const packageRecord = await this.packageSchema.findOne( query as FilterQuery<IPackagePersistence & Document> );

    if( packageRecord != null) {
      return PackageMap.toDomain(packageRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Package[]> {

    const packageRecord = await this.packageSchema.find();

    return packageRecord !== null ? packageRecord.map((postRecord) => PackageMap.toDomain(postRecord)): null

  }

  public async remove(packageId: PackageId | string): Promise<null>{
    const query = { domainId: packageId};
    await this.packageSchema.deleteOne( query as FilterQuery<IPackagePersistence & Document> );
    return null;
  }

}
