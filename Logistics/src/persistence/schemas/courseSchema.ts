import { ICoursePersistence } from '../../dataschema/ICoursePersistence';
import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    warehouseID1: { type: String, index: true },
    warehouseID2: { type: String, index: true },
    distance: { type: Number, index: true },
    duration: { type: Number, index: true },
    energyNeeded: { type: Number, index: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ICoursePersistence & mongoose.Document>('Course', CourseSchema);
