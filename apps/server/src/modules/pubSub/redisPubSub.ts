import { RedisPubSub } from 'graphql-redis-subscriptions';
import { config } from '../../config.ts';

export const redisPubSub = new RedisPubSub({
	connection: config.REDIS_URI,
});
