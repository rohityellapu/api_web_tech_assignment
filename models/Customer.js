const mongooose = require('mongoose');

const customerSchema = new mongooose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    }
})

const Customer = mongooose.model('Customer', customerSchema)

module.exports = Customer;