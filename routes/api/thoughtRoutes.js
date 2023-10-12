// Requires Router
const router = require('express').Router();
// Require thought controllers by object destructuring
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');
// GET and POST routes
router.
route('/')
.get(getThoughts)
.post(createThought);
// GET, UPDATE, DELETE routes by id
router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);
// reaction POST route
router
.route('/:thoughtId/reaction')
.post(addReaction);
// reaction DELETE route by id
router
.route('/:thoughtId/reaction/:reactionId')
.delete(removeReaction);
// Exports router
module.exports = router;