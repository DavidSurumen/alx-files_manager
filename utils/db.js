import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';

/**
 * MongoDB utils
 */
class DBClient {
  constructor() {
    const url = `mongodb://${HOST}:${PORT}/${DATABASE}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * checks whether connection to mongodb is successful
   */
  isAlive() {
    return this.client.topology.isConnected();
  }

  /**
   * gets the number of documents in the collection 'users'
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * gets the number of documents in the collection 'files'
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
