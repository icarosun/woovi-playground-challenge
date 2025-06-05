import request from 'supertest';
import { app } from '../server/app.ts';
import mongoose from 'mongoose';
import { config } from '../config.ts';
import { Account } from '../modules/account/accountModel.ts';
import { Transaction } from '../modules/transaction/transactionModel.ts';

const MONGO_TEST_URI = config.MONGO_URI || 'mongodb://localhost:27018/woovi-playground-test';

let fromAccount, toAccount;

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

beforeEach(async () => {
  await Transaction.deleteMany();
  await Account.deleteMany();
  const [accA, accB] = await Account.create([
    {
      firstName: "testName",
      lastName: "TestName",
      cpf: "12345678900",
      balance: 10000
    },
    {
      firstName: "secondName",
      lastName: "secondLastNameTest",
      cpf: "00011122234",
      balance: 20000
    }
  ]);

  fromAccount = accA.id;
  toAccount = accB.id;
});

describe('Transaction Integration test', () => {
  it('should create a transaction', async () => {
    const mutation = `
      mutation {
        sendTransaction(input: {
            value: 500, 
            fromAccount: "${fromAccount}", 
            toAccount: "${toAccount}"}
        ) {
          id
          value
          fromAccount
          toAccount
        }
      }
    `;

    const res = await request(app.callback())
      .post('/graphql')
      .send({ query: mutation});

    expect(res.status).toBe(200);
  });

  it('should not create a transaction with insufficient balance', async () => {

    const mutation = `
      mutation {
        sendTransaction(input: {
            value: 11000, 
            fromAccount: "${fromAccount}",
            toAccount: "${toAccount}"}
          ) {
            id
            value
            fromAccount
            toAccount
        }
      }
    `;

    const res = await request(app.callback())
      .post('/graphql')
      .send({ query: mutation});

    expect(res.status).toBe(200);
    expect(res.text).toContain("errors");
  });

  it('should not create a transaction to the same person', async () => {

    const mutation = `
      mutation {
        sendTransaction(input: {
            value: 500, 
            fromAccount: "${fromAccount}",
            toAccount: "${fromAccount}"}
          ) {
            id
            value
            fromAccount
            toAccount
        }
      }
    `;

    const res = await request(app.callback())
      .post('/graphql')
      .send({ query: mutation});

    expect(res.status).toBe(200);
    expect(res.text).toContain("errors");
  });

  it('shoud not create a transaction with negative value', async () => {

    const mutation = `
      mutation {
        sendTransaction(input: {
            value: -50, 
            fromAccount: "${fromAccount}",
            toAccount: "${fromAccount}"}
          ) {
            id
            value
            fromAccount
            toAccount
        }
      }
    `;

    const res = await request(app.callback())
      .post('/graphql')
      .send({ query: mutation});

    expect(res.status).toBe(200);
    expect(res.text).toContain("errors"); 
  });

  it('should not create a transaction without account to receive', async () => {

    const mutation = `
      mutation {
        sendTransaction(input: {
            value: 50, 
            fromAccount: "${fromAccount}",
            toAccount: "invalidtoken"}
          ) {
            id
            value
            fromAccount
            toAccount
        }
      }
    `;

    const res = await request(app.callback())
      .post('/graphql')
      .send({ query: mutation});

    expect(res.status).toBe(200);
    expect(res.text).toContain("errors"); 
  });

  it('should not create a transaction with invalid token from account to send value', async () => {

    const mutation = `
      mutation {
        sendTransaction(input: {
            value: 50, 
            fromAccount: "invalid token",
            toAccount: "${fromAccount}"}
          ) {
            id
            value
            fromAccount
            toAccount
        }
      }
    `;

    const res = await request(app.callback())
      .post('/graphql')
      .send({ query: mutation});

    expect(res.status).toBe(200);
    expect(res.text).toContain("errors"); 
  });
});
