const mongoose = require('mongoose');
const { NODE_ENV, MONGO_CONNECTION_STRING } = require('../common/config');

const connect = async () => {
  const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  if (NODE_ENV === 'test') {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = new MongoMemoryServer();
    const mongoTestUri = await mongoServer.getUri();

    return mongoose.connect(mongoTestUri, mongoOptions);
  }

  return mongoose.connect(MONGO_CONNECTION_STRING, mongoOptions);
};

const disconnect = () => mongoose.disconnect();

const clear = () => mongoose.connection.dropDatabase();

module.exports = { connect, disconnect, clear };