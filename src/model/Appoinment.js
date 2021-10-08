import mongoose, { Schema } from 'mongoose';

const AppoinmentSchema = new Schema(
  {
    time: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    nic: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    province: {
      type: String,
      trim: true,
    },
    isChargeChecked: {
      type: Boolean,
    },
    isPDFChecked: {
      type: Boolean,
    },
    referenceNo: {
      type: String,
      trim: true,
    },
    hospitalName: {
        type: String,
        trim: true,
    },
    date: {
        type: String,
        trim: true,
    },
    totalAmount: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Appoinment = mongoose.model('appoinment', AppoinmentSchema);

export default Appoinment;
