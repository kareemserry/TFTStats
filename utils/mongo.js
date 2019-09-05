const consts = require('./consts');

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://TFTBot:<password>@tftstats-srw3l.gcp.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db('test').collection('devices');
    // perform actions on the collection object
    client.close();
});