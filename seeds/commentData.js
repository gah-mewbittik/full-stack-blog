const {Comment} = require('../models');

const commentData =  [
    {
        comment_text: 'You are right on the money!',
        user_id: 4,
        post_id: 1,
    },
    {
        comment_text: 'I do not agree!',
        user_id: 2,
        post_id: 2,
    },
    {
        comment_text: 'Think about it a bit harder.',
        user_id: 2,
        post_id: 1,
    },
    {
        comment_text: 'This is the right direction.',
        user_id: 1,
        post_id: 4,
    },
    {
        comment_text: 'What is your deal?!!',
        user_id: 2,
        post_id: 4,
    },
    {
        comment_text: 'Finally, someone who understands.',
        user_id: 3,
        post_id: 5,
    },
    {
        comment_text: 'NEXT!',
        user_id: 3,
        post_id: 3,
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;