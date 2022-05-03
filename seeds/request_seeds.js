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
    },
    {
        product_name: 'paper towels',
        amount: '20 packs',
        pantry_id: 3,
        open: true,
    },
    {
        product_name: 'hand sanitizer',
        amount: '200 bottles',
        pantry_id: 3,
        open: true,
    },
    {
        product_name: 'face masks',
        amount: '2000 masks',
        pantry_id: 4,
        open: true,
    },
    {
        product_name: 'canned fruit',
        amount: '50 cans',
        pantry_id: 4,
        open: true,
    },
    {
        product_name: 'flour',
        amount: '4 packs',
        pantry_id: 4,
        open: true,
    },
    {
        product_name: 'canned tomatoes',
        amount: '80 cans',
        pantry_id: 5,
        open: true,
    },
    {
        product_name: 'pasta',
        amount: '50 boxes',
        pantry_id: 5,
        open: true,
    },
    {
        product_name: 'fruit',
        amount: '200 items',
        pantry_id: 5,
        open: true,
    },
    {
        product_name: 'baby food',
        amount: '300 jars',
        pantry_id: 5,
        open: true,
    },
    {
        product_name: 'fask masks',
        amount: '100 masks',
        pantry_id: 6,
        open: true,
    },
    {
        product_name: 'garbage bags',
        amount: '10 rolls',
        pantry_id: 7,
        open: true,
    },
    {
        product_name: 'flour',
        amount: '4 packs',
        pantry_id: 7,
        open: true,
    },
    {
        product_name: 'baby wipes',
        amount: '100 boxes',
        pantry_id: 3,
        open: true,
    },
    {
        product_name: 'kleenex',
        amount: '90 packs',
        pantry_id: 1,
        open: true,
    },
]

const seedRequest = () => Request.bulkCreate(requestData);

module.exports = seedRequest;