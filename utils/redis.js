import { createClient } from 'redis';
import { promisify } from 'util';


class RedisClient {
  constructor() {
    this.alive = true;
    this.client = createClient()
      .on('error', (err) => {
        console.log(`Redis error encountered: ${err}`);
        this.alive = false;
      })
      .on('connect', () => {
        this.alive = true;
      });
  }

  isAlive() {
    return this.alive;
  }

  async get(key) {
    const getPromise = new Promise(
      (resolve, reject) => {
        this.client.get(
          key,
          (err, value) => {
            if (err) {
              reject(err);
            } else {
              resolve(value);
            }
          },
        );
      },
    );
    return getPromise;
  }

  async set(key, value, duration) {
    return promisify(this.client.setex)
      .bind(this.client)(key, duration, value);
  }

  async del(key) {
    return promisify(this.client.del)
      .bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
