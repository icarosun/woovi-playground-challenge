import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } from 'graphql';

import { IAccont } from './accountModel.ts';

const AccountType = new GraphQLObjectType<IAccont>({
  name: 'Account',
  description: "Represents an account",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    firstName: {
      type: GraphQLString,
      resolve: (account) => account.firstName,
    },
    lastName: {
      type: GraphQLString,
      resolve: (account) => account.lastName,
    },
    cpf: {
      type: GraphQLString,
      resolve: (account) => account.cpf,
    },
    accountNumber: {
      type: GraphQLInt,
      resolve: (account) => account.accountNumber,
    },
    balance: {
      type: GraphQLInt,
      resolve: (account) => account.balance,
    }
  }),
});

export { AccountType };
