const express = require('express')
const router = express.Router();
const Inventory = require('../models/Inventory')

router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.get('/', async (req, res) => {
    let inventories = await Inventory.find();

    res.render('inventory.ejs', { inventories: inventories });
})

router.get('/:type', async (req, res) => {
    let typeOfInventories = await Inventory.find({ type: req.params.type })
    res.render('inventory.ejs', { inventories: typeOfInventories });
})

router.post('/', async (req, res) => {
    const { name, type, quantity } = req.body;
    if (!name || !type || !quantity) res.redirect('/');
    try {
        await Inventory.create({
            name: name,
            type: type,
            available: quantity
        })


    }
    catch (e) {
        console.log(e.message);
    }
    res.redirect('/inventory');
})
module.exports = router;