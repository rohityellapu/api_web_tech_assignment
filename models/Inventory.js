const mongooose = require('mongoose');

const inventorySchema = new mongooose.Schema({
    type: String,
    name: String,
    available: Number
})

const Inventory = mongooose.model('Inventory', inventorySchema)

module.exports = Inventory;