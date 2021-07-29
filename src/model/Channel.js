import mongoose, { Schema } from 'mongoose';

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Please enter valid email address');
      }
    },
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number required'],
    trim: true,
    max: [10, 'Please enter valid phone number'],
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error('Please enter valid mobile number');
      }
    },
  },
  nic: {
    type: String,
    required: [true, 'NIC must be provided'],
    trim: true,
  },
  channelDoctor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'doctors',
  },
  dateTime: {
    type: Date,
    required: [true, 'Channel date is required'],
    trim: true,
  },
  referenceNumber: {
    type: String,
    required: [true, 'Reference number is required'],
    trim: true,
  },
  hospitalCharge: {
    type: Number,
    required: [true, 'Doctor charge is required'],
    default: 400,
  },
  bookingCharge: {
    type: Number,
    required: [true, 'Doctor charge is required'],
    default: 80,
  },
  isPaid: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Channel = mongoose.model('channels', ChannelSchema);

export default Channel;
