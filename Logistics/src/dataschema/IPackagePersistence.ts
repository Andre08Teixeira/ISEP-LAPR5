import { TCarga } from "../domain/tCarga";
import { TDescarga } from "../domain/tDescarga";
import { X } from "../domain/x";
import { Y } from "../domain/y";
import { Z } from "../domain/z";

export interface IPackagePersistence {
  domainId: string;
    x: X;
    y: Y;
    z: Z;
    tCarga: TCarga;
    tDescarga: TDescarga;
  }
