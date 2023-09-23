require('dotenv-safe').config({silent: true});

const database = require('./database');

test('MongoDB Connection', async () => {
    const connection = await database.connect();
    expect(connection).toBeTruthy();
},20000)

test('MongoDB Disconnection', async () => {
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})