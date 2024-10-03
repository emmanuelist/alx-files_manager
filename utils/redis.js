import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.error('Redis client not connected to the server:', err.message);
    });

    this.client.on('connect', () => {
      console.log('Connected to Redis');
    });

    // Promisify Redis methods for better async/await handling
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  // Check if Redis client is connected
  isAlive() {
    return this.client.connected;
  }

  // Async method to check if Redis is connected after a potential delay
  async isAliveAsync() {
    return new Promise((resolve) => {
      if (this.client.connected) {
        resolve(true);
      } else {
        this.client.once('connect', () => resolve(true));
        this.client.once('error', () => resolve(false));
      }
    });
  }

  // Get a key from Redis
  async get(key) {
    return this.getAsync(key);
  }

  // Set a key with an expiration in Redis
  async set(key, value, duration) {
    return this.setAsync(key, value, 'EX', duration);
  }

  // Delete a key from Redis
  async del(key) {
    return this.delAsync(key);
  }
}

// Export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
