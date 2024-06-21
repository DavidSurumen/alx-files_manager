// index.js

/**
 * @file index.js
 * @description This file defines all the API endpoints for the project
 */
import express from 'express';
import AppController from '.././controllers/AppController';

const router = express.Router();

/**
 * GET /status
 * @summary Returns the status of Redis and the database.
 * @returns {Object} 200 - { "redis": true, "db": true }
 */
router.get('/status', AppController.getStatus);

/**
 * GET /stats
 * @summary Returns the statistics about users and files in the database.
 * @returns {Object} 200 - { "users": 12, "files": 1231 }
 */
router.get('/stats', AppController.getStats);

export default router;
