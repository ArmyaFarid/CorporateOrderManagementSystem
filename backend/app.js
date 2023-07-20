const express = require('express');

const bodyParser = require("express");

const orderRoutes = require('./routes/order');

const providerRoutes = require('./routes/provider');

const app = express();

require('dotenv').config()

// Connection URL
const {mongoClient} = require('./mongodb/mongoClient');

const dbName = process.env.MONGO_DBNAME;



app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());

app.get('/api/statistics', async (req, res) => {
    try {
        await mongoClient.connect();

        const db = mongoClient.db(dbName); // Replace 'your_database_name' with your actual database name

        // Get the number of orders
        const numOrders = await db.collection('orders').estimatedDocumentCount();

        // Get the number of providers
        const numProviders = await db.collection('providers').estimatedDocumentCount();

        // Get the number of orders with the "DELIVERED" state
        const numDeliveredOrders = await db.collection('orders').countDocuments({ state: "DELIVERED" });

        const query = { state: { $in: ["DELIVERED", "DELIVERING"] } };
        // Calculate the total cost of orders in the "DELIVERING" state
        const deliveringOrders = await db.collection('orders').find(query).toArray();
        let totalCost = 0;
        deliveringOrders.forEach((order) => {
            totalCost += order.quantity * order.unit_price;
        });

        res.json({
            numOrders,
            numProviders,
            numDeliveredOrders,
            totalCost,
        });
    } catch (err) {
        console.error('Error retrieving statistics:', err);
        res.status(500).json({ error: 'Error retrieving statistics' });
    }
});


app.use('/api/provider', providerRoutes);
app.use('/api/order', orderRoutes);

module.exports = app;