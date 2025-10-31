const express = require('express');
const router = express.Router();
const { getUsers, seedUsers } = require('../controllers/userController');

// GET /api/users - Get filtered and paginated users
router.get('/', getUsers);

// POST /api/users/seed - Seed database with sample data
router.post('/seed', seedUsers);

module.exports = router;