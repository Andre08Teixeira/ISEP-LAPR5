import mongoose from 'mongoose';
import { IPackagePersistence } from '../../dataschema/IPackagePersistence';

const PackageSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    x: { type: Number, index: true },
    y: { type: Number, index: true },
    z: { type: Number, index: true },
    tCarga: { type: Number, index: true },
    tDescarga: { type: Number, index: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPackagePersistence & mongoose.Document>('Package', PackageSchema);
