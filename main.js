import redisClient from './utils/redis';

(async () => {
  // Wait for Redis connection to establish
  console.log(await redisClient.isAliveAsync()); // Should print true after connecting

  // Check the value for a key that doesn't exist yet
  console.log(await redisClient.get('myKey')); // null

  // Set a key with 5 seconds expiration
  await redisClient.set('myKey', 12, 5);
  console.log(await redisClient.get('myKey')); // 12

  // Wait 10 seconds to see if the key has expired
  setTimeout(async () => {
    console.log(await redisClient.get('myKey')); // Should be null after expiration
  }, 1000 * 10); // Wait 10 seconds
})();
