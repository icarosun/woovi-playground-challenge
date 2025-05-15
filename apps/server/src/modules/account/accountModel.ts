import type { Document, Model } from 'mongoose';

import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const AutoIncrementPlugin = AutoIncrement(mongoose);

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
    cpf: {
      type: String, 
      description: "The user's cpf",
      required: true,
      trim: true,
      unique: true
    },
    accountNumber: {
      type: Number,
      description: "The user's account number",
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
  cpf: string;
  accountNumber: Number;
  balance: Number;
} & Document;

Schema.plugin(AutoIncrementPlugin, { inc_field: 'accountNumber'});

export const Account: Model<IAccount> = mongoose.model('Account', Schema);
