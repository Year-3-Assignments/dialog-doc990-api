import mongoose, { Schema } from 'mongoose';

const ChannelSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  nic: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  province: { type: String, required: true, trim: true },
  isChargeChecked: { type: Boolean, required: false, default: false },
  isPDFCheck: { type: Boolean, required: false, default: false },
  channelDoctor: { type: Schema.Types.ObjectId, required: true, default: null },
  hospital: { type: Date, required: true },
});

const Channel = mongoose.model('channels', ChannelSchema);

export default Channel;
