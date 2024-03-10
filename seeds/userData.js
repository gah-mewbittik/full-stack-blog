const { User } = require('../models');
const bcrypt = require('bcrypt');

const userData = [
    {
        name: 'Sal',
        email: 'sal@hotmail.com',
        password: 'password12345'
      },
      {
        name: 'Lernantino',
        email: 'lernantino@gmail.com',
        password: 'password12345'
      },
      {
        name: 'Amiko',
        email: 'amiko2k20@aol.com',
        password: 'password12345'
      },
      {
        name: 'Jordan',
        email: 'jordan99@msn.com',
        password: 'password12345'
      },
      {
        name: 'Blake',
        email: 'the_blake@yahoo.com',
        password: 'password12345'
      }

];

const seedUsers = async () => {
  //hash password before creating user
  const usersWithHashedPass = userData.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10)
  }));
  await User.bulkCreate(usersWithHashedPass);
}

module.exports = seedUsers;
