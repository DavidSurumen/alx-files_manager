import { createClient } from 'redis';
import { promisify } from 'util';

/**
 * A redis client.
 */
class RedisClient {
  constructor() {
    // creates a redis instance
    this.isClientConnected = true;

    this.client = createClient()
      .on('error', (err) => {
        this.isClientConnected = false;
        console.error('Redis Client failed to connect:', err.message || err.toString());
      });

    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * checks if connection to the redis server by this client is active
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * gets the value of a given key
   */
  async get(key) {
    // async. takes in a string key as argument and returns the Redis value stored for this key
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * stores a key, its value, and its expiration
   */
  async set(key, value, duration) {
    await promisify(this.client.setex).bind(this.client)(key, duration, value);
  }

  /**
   * removes a given key
   */
  async del(key) {
    // async. takes in a string key as argument and remove the value in Redis for this key
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

// create and export an instance of RedisClient called redisClient
const redisClient = new RedisClient();
export default redisClient;
