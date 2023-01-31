const mongooose = require('mongoose');

const orderSchema = new mongooose.Schema({
    item_name: String,
    quantity: Number,
    customerId: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    inventoryId: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Inventory'
    }
})

const Orders = mongooose.model('Orders', orderSchema)

module.exports = Orders;