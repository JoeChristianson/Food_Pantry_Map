const {Request} = require('../models');

const requestData = [
    {
        product_name: 'soup',
        amount: '15 cans',
        pantry_id: 1,
        open: true,
    },
    {
        product_name: 'tomato',
        amount: '18 cans',
        pantry_id: 1,
        open: true,
    },
    {
        product_name: 'Sugar',
        amount: '15 packs',
        pantry_id: 2,
        open: true,
    }
]

const seedRequest = () => Request.bulkCreate(requestData);

module.exports = seedRequest;