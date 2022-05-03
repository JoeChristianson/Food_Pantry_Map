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
    }
]

const seedPantry = () => Pantry.bulkCreate(pantryData);

module.exports = seedPantry;