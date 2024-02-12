import { createClient } from "redis";

class RedisClient {
  constructor() {
    this.client = createClient()
      .on('error', (err) => {
        console.log(`Redis client not connected to the server: ${err}`);
      })
      .on('connect', () => {
        this.alive = true;
      });
  }
}

redisClient = RedisClient();
export default redisClient;
