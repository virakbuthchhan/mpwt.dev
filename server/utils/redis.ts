import Redis from 'ioredis'

let redisClient: Redis | null = null

function getRedis() {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
    try {
      redisClient = new Redis(redisUrl, {
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false,
        retryStrategy() {
          return null // disable continuous retries on offline
        }
      })

      redisClient.on('error', (err) => {
        // Silently handle redis connection errors without crashing server
      })
    } catch {
      redisClient = null
    }
  }
  return redisClient
}

export async function getCache<T>(key: string): Promise<T | null> {
  const r = getRedis()
  if (!r || r.status !== 'ready') return null
  try {
    const data = await r.get(key)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export async function setCache(key: string, value: any, ttlSeconds = 300): Promise<void> {
  const r = getRedis()
  if (!r || r.status !== 'ready') return
  try {
    await r.set(key, JSON.stringify(value), 'EX', ttlSeconds)
  } catch {
    // Ignore cache set failure
  }
}

export async function invalidateCachePattern(pattern: string): Promise<void> {
  const r = getRedis()
  if (!r || r.status !== 'ready') return
  try {
    const keys = await r.keys(pattern)
    if (keys.length > 0) {
      await r.del(...keys)
    }
  } catch {
    // Ignore cache clear failure
  }
}
