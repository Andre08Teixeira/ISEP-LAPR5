import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { PackageId } from "./packageId";
import IPackageDTO from "../dto/IPackageDTO";
import { TCarga } from "./tCarga";
import { TDescarga } from "./tDescarga";
import { X } from "./x";
import { Y } from "./y";
import { Z } from "./z";


interface PackageProps {
  x: X;
  y: Y;
  z: Z;
  tCarga: TCarga;
  tDescarga: TDescarga;
}

export class Package extends AggregateRoot<PackageProps> {
  package: Package;
  get id (): UniqueEntityID {
    return this._id;
  }

  get packageId (): PackageId {
    return new PackageId(this.packageId.toValue());
  }


  get x (): X {
    return this.props.x;
  }

  set x ( value: X) {
    this.props.x = value;
  }

  get y (): Y {
    return this.props.y;
  }

  set y ( value: Y) {
    this.props.y = value;
  }

  get z (): Z {
    return this.props.z;
  }

  set z ( value: Z) {
    this.props.z = value;
  }

  get tCarga (): TCarga {
    return this.props.tCarga;
  }

  set tCarga ( value: TCarga) {
    this.props.tCarga = value;
  }

  get tDescarga (): TDescarga {
    return this.props.tDescarga;
  }

  set tDescarga ( value: TDescarga) {
    this.props.tDescarga = value;
  }

  

  private constructor (props: PackageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (packageDTO: IPackageDTO, id?: UniqueEntityID): Result<Package> {
    const x = packageDTO.x;
    const y = packageDTO.y;
    const z = packageDTO.z;
    const tCarga = packageDTO.tCarga;
    const tDescarga = packageDTO.tDescarga;

    if(!!x === false ){
      return Result.fail<Package>('A posição no eixo X deve ser entre 0 e 10')
    } else if(!!y === false){
        return Result.fail<Package>('A posição no eixo Y deve ser entre 0 e 20')
    } else if(!!z === false ){
        return Result.fail<Package>('A posição no eixo Z deve ser entre 0 e 8')
    }else if(!!tCarga === false){
      return Result.fail<Package>('O tempo de carga deve ser maior que 0')
    }else if(!!tDescarga === false){
        return Result.fail<Package>('O tempo de descarga deve ser maior que 0')
    }else {
      const packagee = new Package({x : x, y : y, z : z, tCarga : tCarga, tDescarga : tDescarga},id);
      return Result.ok<Package>(packagee)
    }
 }
}