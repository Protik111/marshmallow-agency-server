const express = require('express');
const app = express();
// const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const userRouteHandler = require('./routeHandlers/users/orders');
const userRouteHandlerR = require('./routeHandlers/users/reviews');
const adminRouterHandler = require('./routeHandlers/admin/services');

const port = 5000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Mongdb atlas connection
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z2l8a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

//mongoose connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});


//testing server
app.get('/', (req, res) => {
    res.send('Hello World');
})


//admin route hanlders
app.use('/admin', adminRouterHandler);
app.use('/user', userRouteHandler);
app.use('/user', userRouteHandlerR);

app.listen(port, () => {
    console.log(`listening to port ${process.env.PORT} || ${port}`);
})