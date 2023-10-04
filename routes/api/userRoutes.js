const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addReaction,
    removeReaction,
} = require('../../controllers/userController');

router
.route('/')
.get(getUsers)
.post(createUser);

router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/reaction')
.post(addReaction);

router
.route('/:userId/reaction/:reactionId')
.delete(removeReaction);


module.exports = router;