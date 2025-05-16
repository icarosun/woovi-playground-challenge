import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import { messageMutations } from '../modules/message/mutations/messageMutations';
import { accountMutations } from '../modules/account/mutations/accountMutations.ts';
import { transactionMutations } from '../modules/transaction/mutations/transactionMutations.ts';

export const MutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		...messageMutations,
    ...accountMutations,
    ...transactionMutations
	}),
});
