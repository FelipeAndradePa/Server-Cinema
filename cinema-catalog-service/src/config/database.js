const MongoClient = require('mongodb').MongoClient;
let client = null;

async function connect() {
    if (!client) {
        //instancia de um novo client Mongo
        client = new MongoClient(process.env.MONGO_CONNECTION); 
    }
    await client.connect(); //gera a conexão
    return client.db(process.env.DATABASE); //passa o nome do db para a função db
}
 
async function disconnect() {
    if (!client){
        return true;
    }
    await client.close(); //encerra a conexão 
    client = null; //atribui null ao client
    return true;
}

module.exports = {connect, disconnect}