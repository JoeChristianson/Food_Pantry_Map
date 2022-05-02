const {Request} = require('../models');

const requestData = [
    {
        product_name: 'soup cans',
        amount: '15 cans',
        pantry_id: 1,
    },
    {
        product_name: 'soup cans',
        amount: '15 cans',
        pantry_id: 2,
    }
]

const seedRequest = () => Request.bulkCreate(requestData);

module.exports = seedRequest;