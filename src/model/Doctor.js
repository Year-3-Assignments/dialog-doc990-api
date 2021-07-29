import mongoose, { Schema } from 'mongoose';

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Doctor name is required'],
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
});

const Doctor = mongoose.model('doctors', DoctorSchema);

export default Doctor;
