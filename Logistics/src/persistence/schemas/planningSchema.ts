import mongoose from 'mongoose';
import { IPlanningPersistence } from '../../dataschema/IPlanningPersistence';

const PlanningSchema = new mongoose.Schema(
  {
    domainId : {type: String, unique: true},
    armazens: { type: Array, of: String, index: true},
    data: { type: String, index: true},
    truckRegistration: {type: String, index: true},
    heuristica: {type: String, index: true}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPlanningPersistence & mongoose.Document>('Planning', PlanningSchema);
