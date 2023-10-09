const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

connection.on('error', (error) => error);

connection.once('open', async () => {
    console.log('Connected');

    await User.deleteMany();

    await Thought.deleteMany();

    await Reaction.deleteMany();

    const users = [
        {
            username: 'Mariama',
            email: 'mariama@gmail.com',
        },
        {
            username: 'Saikou',
            email: 'saikou@gmail.com',
        }
    ];
    
    const thoughts = [
        {
            thoughtText: 'Hello, my name is Mariama, here are my thoughts...',
            username: 'Mariama',
            reactions: [
                {
                    reactionBody: `Hello Mariama, how're you?`,
                    username: 'Saikou',
                }
            ]
        },
        {
            thoughtText: 'Hello, today has been a productive day because I worked hard on my application',
            username: 'Saikou',
            reactions: [
                {
                    reactionBody: `Good job Saikou. Keep up the hard work!`,
                    username: 'Mariama',
                }
            ]
        }
    ];

    await User.collection.insertMany(users);

    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Database Seeded 🌱');
    process.exit(0);
});
