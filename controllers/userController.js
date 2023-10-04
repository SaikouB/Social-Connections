const { User, Thought } = require('../models');

module.exports = {
	async getUsers(req, res) {
		try {
			const users = await User.find();
			res.json(users);
		} catch (error) {
			res.status(500).json(error);
		}
	}
};