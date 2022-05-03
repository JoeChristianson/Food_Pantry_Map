const {User} = require('../models');

const userData = [
    {
        user_name: 'UofM',
        email: 'UofM@gmail.com',
        password: 'test123',
        
    },
    {
        user_name: 'HCMC',
        email: 'HCMC@gmail.com',
        password: 'test321',
    },
    {
        user_name: 'North Memorial Health Hospital',
        email: 'NMHH@gmail.com',
        password: 'test231',
    }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;