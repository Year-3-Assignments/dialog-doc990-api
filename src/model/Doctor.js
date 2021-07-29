import mongoose, { Schema } from 'mongoose';

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [true, 'Profile image is required'],
    trim: true,
  },
  specialization: {
    type: String,
    required: [true, 'Specilization is required'],
    trim: true,
  },
  availableDetails: [
    {
      hospitalName: {
        type: String,
        required: [true, 'Hospital name is required'],
        trim: true,
      },
      doctorCharge: {
        type: Number,
        required: [true, 'Doctor charge is required'],
      },
      dateTime: {
        type: Date,
        required: [true, 'Available date is required'],
        trim: true,
      },
    },
  ],
  notes: [
    {
      type: String,
      required: false,
      trim: true,
    },
  ],
  appointments: {
    type: Number,
    required: true,
  },
});

const Doctor = mongoose.model('doctors', DoctorSchema);

export default Doctor;
