import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    registration: {
      type: String,
      unique: true
    },

    tare: {
      type: Number
    },

    maximum_weight: {
      type: Number
    },

    max_charge: {
        type: Number
    },

    autonomy: {
        type: Number
    },

    charge_time: {
        type: Number
    },

    is_deleted: {
      type: Boolean
    }
  },
  { timestamps: true },
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);
