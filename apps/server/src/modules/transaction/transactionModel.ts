import type { Document, Model } from 'mongoose';

import mongoose from 'mongoose';

export type ITransaction = {
  fromAccount: string;
  toAccount: string;
  value: Number;
  createdAt: Date;
} & Document;

const Schema = new mongoose.Schema<ITransaction>(
  {
    fromAccount: {
      type: String,
      description: "Account that send transction.",
      required: true,
      trim: true
    },
    toAccount: {
      type: String,
      description: "Account that receive transaction.",
      required: true,
      trim: true
    }, 
    value: {
      type: Number,
      description: "The value transaction.",
      required: true,
    },
  },
  {
    collection: 'Transaction',
    timestamps: true,
  }
);

export const Transaction: Model<ITransaction> = mongoose.model('Transaction', Schema);
