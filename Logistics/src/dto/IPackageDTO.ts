import { TCarga } from "../domain/tCarga";
import { TDescarga } from "../domain/tDescarga";
import { X } from "../domain/x";
import { Y } from "../domain/y";
import { Z } from "../domain/z";
export default interface IPackageDTO {
    id: string;
    x: X;
    y: Y;
    z: Z;
    tCarga: TCarga;
    tDescarga: TDescarga;
  }
  