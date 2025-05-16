import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';

import { messageConnectionField } from '../modules/message/messageFields';
import { AccountType } from '../modules/account/accountType.ts';
import { TransactionType } from '../modules/transaction/transactionType.ts';

import { Account } from '../modules/account/accountModel.ts';
import { Transaction } from '../modules/transaction/transactionModel.ts';

export const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		...messageConnectionField('messages'),
    account: {
      type: AccountType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: (_, { id }) => Account.findById(id),
    },
    accounts: {
      type: new GraphQLList(AccountType),
      resolve: () => Account.find(),
    },
    transaction: {
      type: TransactionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: (_, { id }) => Transaction.findById(id),
    }
	}),
});
