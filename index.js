const express = require('express')
const app = express()
const mongooose = require('mongoose');

mongooose.connect('mongodb://localhost:27017/api_web_tech_assignment', (err) => err ? console.log(err) : console.log('Database Connected'))

const PORT = 3005;
const ejs = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const customerRoutes = require('./routes/customer');
const inventoryRoutes = require('./routes/inventory')
const orderRoutes = require('./routes/order')

app.engine('ejs', ejs)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.redirect('/inventory');
})
app.use('/customer', customerRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/orders', orderRoutes);

app.use('*', (req, res) => {
    res.render('err.ejs');
})


app.listen(PORT, () => console.log('Server is on PORT', PORT));
