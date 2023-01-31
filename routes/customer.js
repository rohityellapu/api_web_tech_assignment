const express = require('express')
const router = express.Router();
const Customer = require('../models/Customer')

router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.get('/', async (req, res) => {
    let customers = await Customer.find();

    res.render('customer.ejs', { customers: customers });
})

router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
        await Customer.create({
            name: name,
            email: email
        })
    }
    catch (err) {
        console.log(err.message);

    }
    res.redirect('/customer')
})
module.exports = router;