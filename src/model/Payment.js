import mongoose, { Schema } from 'mongoose';

const PaymentSchema = new Schema(
  {
    phoneNumber: { type: String, required: true, default: null },
    totalAmount: { type: Number, required: true },
    lastFourDigits: { type: Number, required: true },
    cardExpireDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model('payments', PaymentSchema);
export default Payment;
