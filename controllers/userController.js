const { User, Thought } = require('../models');

module.exports = {
	async getUsers(req, res) {
		try {
			const user = await User.find();
			res.json(user);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	async getSingleUser(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.userId })
				.select('-__v')
				.populate('friends')
				.populate('thoughts');
			if (!user) {
				res.status(400).json({ message: 'Cannot find user with this Id' })
			} else {
				res.status(200).json(user);
			}
		} catch (error) {
			console.log('Error:', error)
			res.status(500).json({ message: 'Internal server error' })
		}
	},
	async createUser(req, res) {
		try {
			const newUser = await User.create(req.body);
			res.json(newUser)
		} catch (error) {
			res.status(500).json(error);
		}
	},
	async updateUser(req, res) {
		try {
			const updateUser = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $set: req.body },
				{ runValidators: true, new: true },
			);
			if (!updateUser) {
				res.status(404).json({ message: 'User with this Id is not found' });
			} else {
				res.status(200).json(updateUser)
			}
		} catch (error) {
			console.log(error)
			res.status(500).json(error)
		}
	},
	async deleteUser(req, res) {
		try {
			const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });
			// Bonus to find user thoughts and delete when user is deleted
			const deleteUserThouhts = await Thought.deleteMany();
			if (!deleteUser) {
				res.json(400).json({ message: 'User with Id not found' });
			} else {
				res.status(200).json(deleteUser)
			}
		} catch (error) {
			res.status(500).json(error)
		}
	},
	async addFriend(req, res) {
		try {
			const addFriend = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $addToSet: { friends: req.params.friendId } },
				{ runValidators: true, new: true },
			);
			if (!addFriend) {
				res.status(404).json({ message: 'Cannot find user with such Id' });
			} else {
				res.status(200).json(addFriend)
			}
		} catch (error) {
			res.status(500).json(error)
		}
	},
	async deleteFriend(req, res) {
		try {
			const deleteFriend = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $pull: {friends: req.params.friendId } },
				{ new: true }
				);
				console.log(deleteFriend)
			if (!deleteFriend) {
				res.status(404).json({ message: 'Cannot find user with such Id' })
			} else {
				res.status(200).json(deleteFriend)
			}
		} catch (error) {
			console.log(error)
			res.status(500).json(error);
		}
	},
}; 