import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { Account } from '../accountModel';
import { AccountType } from '../accountType';

const AccountInput = new GraphQLInputObjectType({
  name: 'AccountAddInput',
  fields: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  },
});

export const AccountAddMutation = {
  createAccount: {
    type: AccountType,
    args: {
      input: { type: new GraphQLNonNull(AccountInput) },
    },
    resolve: async (_, { input }) => {
      const account = await new Account({
        firstName: input.firstName,
        lastName: input.lastName,
      }).save();


      return {
        id: account.id, 
        firstName: account.firstName,
        lastName: account.lastName,
        balance: 0,
      };
    }
  }
};


