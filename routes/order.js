const express = require('express')
const router = express.Router();
const Orders = require('../models/Orders')
const Customer = require('../models/Customer')
const Inventory = require('../models/Inventory');
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.get('/', async (req, res) => {
    let orders = await Orders.find();
    let customers = await Customer.find();
    let inventories = await Inventory.find();
    res.render('orders.ejs', { orders, customers, inventories, err: null });
})

router.post('/', async (req, res) => {

    const { name, email, quantity } = req.body;
    try {
        let inventory = await Inventory.findOne({ name: name });
        if (inventory.available < quantity) {
            let orders = await Orders.find();
            let customers = await Customer.find();
            let inventories = await Inventory.find();
            return res.render('orders.ejs', { orders, customers, inventories, err: "Out Of Stock" });
        }

        let customer = await Customer.findOne({ email: email });
        await Orders.create({
            item_name: inventory.name,
            quantity: quantity,
            customerId: customer._id,
            inventoryId: inventory._id
        })
        await Inventory.findByIdAndUpdate({ _id: inventory._id }, { $set: { available: inventory.available - quantity } })

    }
    catch (err) {
        console.log(err.message);
    }
    res.redirect('/orders');
})
module.exports = router;