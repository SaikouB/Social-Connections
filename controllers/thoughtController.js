const { User, Thought } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const users = await Thought.find();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate('reactions');
      if (!thought) {
        res.status(404).json({ message: 'Cannot get thought post' });
      } else {
        res.status(200).json(thought);
      }
    } catch (error) {
      res.status(500).json(error)
    }
  },
  async createThought (req, res) {
    try {
      const newThought = await Thought.create(req.body);
      res.status(200).json(newThought)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  async updateThought (req, res) {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body.thoughtId },
        { runValidators: true, new: true },
        );
        if (!updateThought) {
          res.status(404).json({ message: 'Cannot find thought to update'} );
        } else {
          res.status(200).json(updateThought)
        }
    } catch (error) {
      res.status(500).json(error)
    }
  },
  async deleteThought (req, res) {
    try {
      const deleteThought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
      if (!deleteThought) {
        res.status(404).json({ message: 'Cannot find thought' });
      };

      const user = await User.findOneAndUpdate(
        { thoughts: read.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId} },
        { new: true },
      );
      if (!user) {
        res.status(404).json({ message: 'Thought is updated but no user associated' })
      } else {
        res.status(200).json({ message: 'Thought successfully updated!'})
      }
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async addReaction (req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.ThoughtId },
				{ $addToSet: { reaction: req.body } },
				{ runValidators: true, new: true },
			);
			if (!thought) {
				res.status(404).json({ message: 'Cannot add reaction to post' });
			} else {
				res.status(200).json(thought);
			}
		} catch (err) {
			res.status(500).json(err)
		}
	},
	async removeReaction (req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoguhtId },
				{ $pull: { reaction: { reactionId: req.params.reactionId } } },
				{ runValidators: true, new: true },
			);
			if (!thought) {
				res.status(404).json({ message: 'Cannot find thought' })
			} else {
				res.status(200).json(thought)
			}
		} catch (err) {
			res.status(500).json(err)
		}
	},
}; 