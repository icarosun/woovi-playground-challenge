import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } from 'graphql';

import { ITransaction } from './transactionModel.ts';

const TransactionType = new GraphQLObjectType<ITransaction>({
  name: 'Transaction',
  description: "It is send transaction",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    fromAccount: {
      type: GraphQLString,
      resolve: (transaction) => transaction.fromAccount,
    },
    toAccount: {
      type: GraphQLString,
      resolve: (transaction) => transaction.toAccount,
    },
    value: {
      type: GraphQLInt,
      resolve: (transaction) => transaction.value,
    },
    createdAt: {
			type: GraphQLString,
			resolve: (transaction) => transaction.createdAt.toISOString(),
		},
  }),
});

export { TransactionType };
