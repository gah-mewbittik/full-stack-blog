const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post');

class Comment extends Model{}

Comment.init(
    {
        id:{
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [5],
            },
        },
        user_id: {
            type: Datatypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
        post_id: {
            type: Datatypes.INTEGER,
            references: {
                model: Post,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
      }
);

module.exports = Comment;