import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import { Transaction } from '../transactionModel.ts';
import { TransactionType } from '../transactionType.ts';

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


