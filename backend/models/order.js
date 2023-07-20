require('dotenv').config()

const {mongoClient} = require('../mongodb/mongoClient');
const {ObjectId} = require("mongodb");

const dbName = process.env.MONGO_DBNAME;
class Order {
    constructor() {
        this.init().then().catch(console.error);
        this.collectionName='orders';

    }

    async init() {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);

        //const collectionName = 'orders';

        // Check if the collection already exists
        const collectionNames = await db.listCollections().toArray();
        const collectionExists = collectionNames.some((coll) => coll.name === this.collectionName);

        if (!collectionExists) {
            // Collection does not exist, create it
            await db.createCollection("orders", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        title: "Orders Object Validation",
                        required: ["name", "category", "brand", "unit_price", "quantity", "state", "providerId"],
                        properties: {
                            name: {
                                bsonType: "string",
                                description: "The name of the product",
                            },
                            category: {
                                bsonType: "string",
                                description: "The category of the product",
                            },
                            brand: {
                                bsonType: "string",
                                description: "The brand of the product",
                            },
                            unit_price: {
                                bsonType: "double",
                                minimum: 0,
                                description: "The unit price of the product",
                            },
                            quantity: {
                                bsonType: "int",
                                minimum: 0,
                                description: "The quantity of the product",
                            },
                            state: {
                                bsonType: "string",
                                enum: ["WAITING", "CANCEL", "PAYMENT" ,"DELIVERING","DELIVERED","DELETED"],
                                description: "The state of the product",
                            },
                            providerId: {
                                bsonType: "objectId",
                                description: "Reference to a document in the 'providers' collection",
                            },
                        },
                    },
                },
            });

            console.log(`Collection '${this.collectionName}' created successfully.`);
        } else {
            console.log(`Collection '${this.collectionName}' already exists3444.`);
        }
    }

    async addOne(orderToAdd) {
        await mongoClient.connect();
        console.log('Connected successfully to server');
        const db = mongoClient.db(dbName);

        await db.collection(this.collectionName).insertOne(orderToAdd);
    }

    async getManyWithProvider() {
        await mongoClient.connect();
        console.log('Connected successfully to server');
        const db = mongoClient.db(dbName);
        const productsCollection = db.collection(this.collectionName); // Replace 'products' with your collection name

        // Perform the aggregation using $lookup to get products with their related providers
        return await productsCollection.aggregate([
                       {
                           $lookup: {
                               from: 'providers', // The collection to join with (providers collection)
                               localField: 'providerId', // The field from the products collection to match
                               foreignField: '_id', // The field from the providers collection to match
                               as: 'providerInfo', // The field to store the joined provider document(s)
                           },
                       },
                   ]).toArray();
    }

    async getOrdersBySate(states) {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const ordersCollection = db.collection(this.collectionName);

        const query = {state: {$in: states}};

        return await ordersCollection.find(query).toArray();
    }

    async getGroupedOrdersBySate(states) {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const ordersCollection = db.collection(this.collectionName);

        // Query for products with the specified state
        const query = {state: {$in: states}};

        //const ordersWithState = await ordersCollection.find(query).toArray();

        return await ordersCollection.aggregate([
            {
                $match: query
            },
            {
                $group: {
                    _id: '$state',
                    orders: {$push: '$$ROOT'}
                }
            }
        ]).toArray();
    }

    async getOrderById(id) {
        await mongoClient.connect();
        const db = mongoClient.db(dbName); // Replace 'mydatabase' with your database name
        const ordersCollection = db.collection(this.collectionName); // Replace 'products' with your collection name


        const orderId = new ObjectId(id);

        // Aggregation pipeline to join the orders collection with the providers collection
        const pipeline = [
            {
                $match: { _id: orderId },
            },
            {
                $lookup: {
                    from: 'providers', // Replace with the providers collection name
                    localField: 'providerId',
                    foreignField: '_id',
                    as: 'providerInfo',
                },
            },
            {
                $unwind: '$providerInfo',
            },
            {
                $project: {
                    _id: 1,
                    state: 1,
                    name:1,
                    category:1,
                    brand:1,
                    quantity: 1,
                    unit_price: 1,
                    providerInfo: {
                        _id: 1,
                        name: 1,
                        address: 1,
                        phone: 1,
                        // Add other fields you want to include from the provider collection
                    },
                },
            },
        ];

        // Execute the aggregation pipeline
        const order = await ordersCollection.aggregate(pipeline).toArray();

        console.log(`Order with ID "${id}":`);
        console.log(order); // Debug statement

        if (order.length < 0){
            return null
        }
        return order[0];
    }

    async updateOrder(orderId,updatedFields){
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const ordersCollection = db.collection(this.collectionName);

        // Convert the provided productId to an ObjectId instance
        const objectId = new ObjectId(orderId);

        // Filter to find the product by its ObjectId
        const filter = { _id: objectId };

        // Update operation to apply the changes to the product
        const updateOperation = { $set: updatedFields };

        // Perform the update using updateOne
        const result = await ordersCollection.updateOne(filter, updateOperation);

        // Check if the update was successful
        if (result.matchedCount === 1) {
            console.log('Product updated successfully.');
        } else {
            console.log('Product not found. No update performed.');
        }
    }

}

const order = new Order();

exports.order = order ;