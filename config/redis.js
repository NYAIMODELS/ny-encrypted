'use strict';

const redis = require('redis');

// Create Redis client
const client = redis.createClient();

// Set the default TTL (time to live) to 24 hours (86400 seconds)
const DEFAULT_TTL = 86400;

// Connect to Redis server
client.on('connect', () => {
    console.log('Connected to Redis');
});

// Handle errors
client.on('error', (err) => {
    console.error('Redis error: ', err);
});

module.exports = {
    client,
    DEFAULT_TTL
};