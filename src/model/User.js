import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const UserSchema = new Schema(
  {
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
    password: {
      type: String,
      required: [true, 'Password must be provided'],
      trim: true,
    },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, 'doc990secret');
  user.token = token;
  await user.save();
  return token;
};

UserSchema.statics.findByPhoneNoPassword = async function (
  phoneNumber,
  password
) {
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password is not matched');
  }
  return user;
};

const User = mongoose.model('users', UserSchema);

export default User;
