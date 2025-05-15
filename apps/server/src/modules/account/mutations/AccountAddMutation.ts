import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import { Account } from '../accountModel';
import { AccountType } from '../accountType';

const AccountInput = new GraphQLInputObjectType({
  name: 'AccountAddInput',
  fields: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    cpf: { type: GraphQLString },
    balance: { type: GraphQLInt }
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
        cpf: input.cpf, 
        balance: input.balance || 0, 
      }).save();


      return {
        id: account.id, 
        firstName: account.firstName,
        lastName: account.lastName,
        cpf: account.cpf,
        balance: account.balance,
        accountNumber: account.accountNumber,
      };
    }
  }
};


