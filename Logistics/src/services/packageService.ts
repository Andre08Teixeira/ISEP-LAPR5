/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';
import config from "../../config";
import IPackageDTO from '../dto/IPackageDTO';
import { Package } from "../domain/package";
import IPackageRepo from '../services/IRepos/IPackageRepo';
import IPackageService from './IServices/IPackageService';
import { Result } from "../core/logic/Result";
import { PackageMap } from "../mappers/PackageMap";

@Service()
export default class PackageService implements IPackageService {
  constructor(
      @Inject(config.repos.packagee.name) private packageRepo : IPackageRepo
  ) {}

  public async getPackage( packageDTO: IPackageDTO): Promise<Result<IPackageDTO>> {
    try {
      const packagee = await this.packageRepo.findByDomainId(packageDTO.id);

      if (packagee === null) {
        return Result.fail<IPackageDTO>("Package not found");
      }
      else {
        const packageDTOResult = PackageMap.toDTO( packagee ) as IPackageDTO;
        return Result.ok<IPackageDTO>( packageDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createPackage(packageDTO: IPackageDTO): Promise<Result<IPackageDTO>> {
    try {

      const packageOrError = await Package.create( packageDTO );

      if (packageOrError.isFailure) {
        return Result.fail<IPackageDTO>(packageOrError.errorValue());
      }

      const packageResult = packageOrError.getValue();

      await this.packageRepo.save(packageResult);

      const packageDTOResult = PackageMap.toDTO( packageResult ) as IPackageDTO;
      return Result.ok<IPackageDTO>( packageDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updatePackage(packageDTO: IPackageDTO): Promise<Result<IPackageDTO>> {
    try {
      const packagee = await this.packageRepo.findByDomainId(packageDTO.id);

      if (packagee === null) {
        return Result.fail<IPackageDTO>("Package not found");
      }
      else {
        packagee.x = packageDTO.x;
        packagee.y = packageDTO.y;
        packagee.z = packageDTO.z;
        packagee.tCarga = packageDTO.tCarga;
        packagee.tDescarga = packageDTO.tDescarga;
        await this.packageRepo.save(packagee);

        const packageDTOResult = PackageMap.toDTO( packagee ) as IPackageDTO;
        return Result.ok<IPackageDTO>( packageDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getAllPackages(): Promise<Result<IPackageDTO[]>> {
    try {
      const packageList = await this.packageRepo.findAll();

      if (packageList === null) {
        return Result.fail<IPackageDTO[]>("Packages not found");
      }

      const result = packageList.map((packageList) => PackageMap.toDTO(packageList) as IPackageDTO);
      return Result.ok<IPackageDTO[]>(result);

    } catch (e) {
      throw e;
    }
  }

  public async removePackage(packageDTO: IPackageDTO): Promise<Result<IPackageDTO>> {
    try {
      const packagee = await this.packageRepo.findByDomainId(packageDTO.id);
      if (packagee === null) {
        return Result.fail<IPackageDTO>("Package not found");
      }
      else {
        await this.packageRepo.remove(packagee.id);

        const packageDTOResult = PackageMap.toDTO( packagee ) as IPackageDTO;
        return Result.ok<IPackageDTO>( packageDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
}
