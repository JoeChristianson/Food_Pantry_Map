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
        user_name: 'NMem',
        email: 'northmem@gmail.com',
        password: 'test321',
    },
    {
        user_name: 'Groveland',
        email: 'grove@gmail.com',
        password: 'test231',
    },
    {
        user_name: 'CES',
        email: 'CES@gmail.com',
        password: 'test231',
    },
    {
        user_name: 'juptwp',
        email: 'joyce@gmail.com',
        password: 'test231',
    },
    {
        user_name: 'TAPROJ',
        email: 'thealiveness@gmail.com',
        password: 'test231',
    },
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;