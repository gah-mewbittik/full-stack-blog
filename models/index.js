const User = require('./User');
const Post = require('./Post');


// TODO: add associations HERE
User.hasMany(Project,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Post };