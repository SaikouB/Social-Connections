// Requires Express router
const router = require('express').Router();
// requires User routes
const userRoutes = require('./userRoutes');
// Requires Thought routes
const thoughtRoutes = require('./thoughtRoutes');
// Middleware using routes for User and Thought
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
// Exports routes
module.exports = router;