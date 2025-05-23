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

      if(!fromAccount || fromAccount.value - input.value < 0) {
        return;
      }

      await Account.findOneAndUpdate(
        { _id: input.toAccount }, 
        { $inc: { balance: input.value }}); 

      await Account.findOneAndUpdate(
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


