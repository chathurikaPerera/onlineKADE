const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Product = require('./models/product');
const cors = require('cors');

require('dotenv/config');
const authJwt = require('./helpers/jwt');

app.use(cors());
app.options('*', cors());
const api = process.env.API_URL;

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt);


//routes
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const categoriesRouter = require('./routes/categories');


//router
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/categories`, categoriesRouter);


//create the connetion with database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop' 
})
.then(() =>{
    console.log('connect to database');
})
.catch((err) =>{
    console.log(err);
})

//create the server
app.listen(3000, ()=>{
    console.log(api);
    console.log("server runing");
})
