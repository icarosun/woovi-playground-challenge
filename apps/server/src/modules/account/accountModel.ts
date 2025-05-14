import type { Document, Model } from 'mongoose';
import mongoose from 'mongoose';

const Schema = new mongoose.Schema<IAccount>(
  {
    firstName: {
      type: String,
      description: "The user's first name.",
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      description: "The user's last name.",
      required: true,
      trim: true
    }, 
    balance: {
      type: Number,
      description: "The user's balance.",
      required: true,
      default: 0
    },
  },
  {
    collection: 'Account',
    timestamps: true,
  }
);

export type IAccount = {
  firstName: string;
  lastName: string;
  balance: Number;
} & Document;

export const Account: Model<IAccount> = mongoose.model('Account', Schema);
