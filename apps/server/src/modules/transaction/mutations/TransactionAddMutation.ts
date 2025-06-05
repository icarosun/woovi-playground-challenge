import { GraphQLInputObjectType, GraphQLNonNull, GraphQLError, GraphQLString, GraphQLInt } from 'graphql';
import { Transaction } from '../transactionModel.ts';
import { TransactionType } from '../transactionType.ts';

import { Account } from '../../account/accountModel.ts';

const SendTransactionInput = new GraphQLInputObjectType({
  name: 'SendTransactionInput',
  fields: {
    fromAccount: { type: GraphQLString },
    toAccount: { type: GraphQLString },
    value: { type: GraphQLInt }
  },
});

export const TransactionAddMutation = {
  sendTransaction: {
    type: TransactionType,
    args: {
      input: { type: new GraphQLNonNull(SendTransactionInput) },
    },
    resolve: async (_, { input }) => {
      const fromAccount = await Account.findById(input.fromAccount);

      if (fromAccount.id == input.toAccount) {
        throw new GraphQLError("Invalid transaction");
      }

      if (input.value < 0) {
        throw new GraphQLError("Invalid value in transaction");
      }

      if(!fromAccount) {
        throw new GraphQLError("Invalid token");
      }

      if ((fromAccount.balance - Math.abs(input.value)) < 0) { 
        throw new GraphQLError("No enought balance");
      }

      const updateToAccount =  await Account.findOneAndUpdate(
        { _id: input.toAccount }, 
        { $inc: { balance: input.value }}); 
      
      if (!updateToAccount) {
        throw new GraphQLError("Invalid token");
      }

      await Account.updateOne(
        {_id: fromAccount.id },
        { $inc: { balance: - input.value }}
      );

      const transaction = await new Transaction({
        fromAccount: input.fromAccount,
        toAccount: input.toAccount,
        value: input.value 
      }).save();

      return {
        id: transaction.id,
        fromAccount: transaction.fromAccount,
        toAccount: transaction.toAccount,
        value: transaction.value,
        createdAt: transaction.createdAt
      };
    }
  }
};


