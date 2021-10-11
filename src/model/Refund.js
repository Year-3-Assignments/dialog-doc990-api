import mongoose, { Schema } from 'mongoose';

const RefundSchema = new Schema(
  {
    referenceNo: { type: String, required: true, trim: true },
    isBankRefund: { type: Boolean, required: false, default: false },
    isMobileRefund: { type: Boolean, required: false, default: false },
    bankHolderName: { type: String, required: false, trim: true },
    bankName: { type: String, required: false, trim: true },
    branchName: { type: String, required: false, trim: true },
    refundRemarks: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: false, trim: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'COMPLETED'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Refund = mongoose.model('refunds', RefundSchema);
export default Refund;
