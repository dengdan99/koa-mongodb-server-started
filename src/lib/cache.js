const redis = require('redis')
const config = require('config')
const bluebird = require('bluebird')
const logger = require('../lib/logger')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient(config.get('cache.port'), config.get('cache.host'))
client.on('error', function (err) {
  logger.fatal('Redis connection error: ' + err)
})
client.on('connect', function (err) {
  logger.debug('Redis connection success')
})

module.exports = client