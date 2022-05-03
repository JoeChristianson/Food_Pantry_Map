const {Pantry} = require('../models');

const pantryData = [
    {
        pantry_name: 'UofM',
        street_address: '123 Univeristy Ave N',
        city: 'Minneapolis',
        latitude: 44.971829446,
        longitude: -93.233832398,
        contact_phone: '612-123-4567',
        user_id: 1,
        
    },
    {
        pantry_name: 'HCMC',
        street_address: '321 Hospital Ave NE',
        city: 'Minneapolis',
        latitude: 44.9725278,
        longitude: -93.2620452,
        contact_phone: '612-321-7654',
        user_id: 2,
    },
    {
        pantry_name: 'North Memorial Health Hospital',
        street_address: '456 Health Way',
        city: 'Minneapolis',
        latitude: 45.017007,
        longitude: -93.32284,
        contact_phone: '612-777-4444',
        user_id: 3,
    },
    {
        pantry_name: 'Groveland Emergency Food Shelf',
        street_address: '1900 Nicollet Ave',
        city: 'Minneapolis',
        latitude: 44.96382,
        longitude: -93.27903,
        contact_phone: '612-871-0277',
        user_id: 4,
    },
    {
        pantry_name: 'CES Food Shelf',
        street_address: '1900 11th Ave S',
        city: 'Minneapolis',
        latitude: 44.96364,
        longitude: -93.25839,
        contact_phone: '612-870-1125',
        user_id: 5,
    },
    {
        pantry_name: 'Joyce Uptown Food Shelf',
        street_address: '3041 Fremont Ave',
        city: 'Minneapolis',
        latitude: 44.946808,
        longitude: -93.295584,
        contact_phone: '612-825-4431',
        user_id: 6,
    },
    {
        pantry_name: 'The Aliveness Project',
        street_address: '3808 Nicollet Ave',
        city: 'Minneapolis',
        latitude: 44.933787,
        longitude: -93.278214,
        contact_phone: '612-824-5433',
        user_id: 7,
    },
]

const seedPantry = () => Pantry.bulkCreate(pantryData);

module.exports = seedPantry;