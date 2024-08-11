// src/middleware/cache.ts
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import config from '../config/config';

const redis = new Redis(config.redisUrl);

interface ResponseWithOriginalSend extends Response {
  originalSend: (data: any) => void;
}

export const cacheMiddleware = async (
  req: Request,
  res: ResponseWithOriginalSend,
  next: NextFunction
) => {
  const key = req.originalUrl;
  const cachedResponse = await redis.get(key);

  if (cachedResponse) {
    res.status(200).json(JSON.parse(cachedResponse));
  } else {
    res.originalSend = res.send;
    res.send = (data) => {
      redis.set(key, JSON.stringify(data), 'EX', 60); // Cache for 1 minute
      res.originalSend(data);
      return res;
    };
    next();
  }
};