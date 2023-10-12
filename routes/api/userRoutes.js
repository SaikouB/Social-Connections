// Requires Router
const router = require('express').Router();
// Require user controllers by object destructuring
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');
// GET and POST routes
router
.route('/')
.get(getUsers)
.post(createUser);
// GET, UPDATE, DELETE routes for user by id
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);
// POST, DELETE routes for user by friends by id
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);
// Exports router
module.exports = router;