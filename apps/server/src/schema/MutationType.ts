import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import { messageMutations } from '../modules/message/mutations/messageMutations';
import { accountMutations } from '../modules/account/mutations/accountMutations.ts';

export const MutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		...messageMutations,
    ...accountMutations,
	}),
});
