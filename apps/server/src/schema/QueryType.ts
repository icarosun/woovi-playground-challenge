import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLID } from 'graphql';

import { messageConnectionField } from '../modules/message/messageFields';
import { AccountType } from '../modules/account/accountType.ts';

import { Account } from '../modules/account/accountModel.ts';

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
      type: AccountType,
      resolve: () => Account.find(),
    }
	}),
});
