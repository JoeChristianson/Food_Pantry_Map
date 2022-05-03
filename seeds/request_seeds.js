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
        product_name: 'Apple Juice',
        amount: '8 packs',
        pantry_id: 1,
        open: true,
    },
    {
        product_name: 'Orange Juice',
        amount: '10 packs',
        pantry_id: 1,
        open: true,
    },
    {
        product_name: 'Sugar',
        amount: '15 packs',
        pantry_id: 2,
        open: true,
    },
    {
        product_name: 'Salt',
        amount: '9 cans',
        pantry_id: 2,
        open: true,
    },
    {
        product_name: 'flour',
        amount: '4 packs',
        pantry_id: 3,
        open: true,
    }
]

const seedRequest = () => Request.bulkCreate(requestData);

module.exports = seedRequest;