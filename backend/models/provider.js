require('dotenv').config()

// Connection URL
const {mongoClient} = require('../mongodb/mongoClient');
const {ObjectId} = require("mongodb");

const dbName = process.env.MONGO_DBNAME;


const providers = [
    {
        "name": "HP Inc.",
        "address": "123 Rue des Fournisseurs, Ville, Pays",
        "phone": "0123456789",
        "category": ["Informatique", "Bureautique"],
        "products": [
            {
                "_id":new ObjectId(),
                "name": "Ordinateur portable",
                "category": "Informatique",
                "brand": "HP",
                "unit_price": 999.99
            },

            {
                "_id":new ObjectId(),
                "name": "Imprimante multifonction",
                "category": "Bureautique",
                "brand": "HP",
                "unit_price": 299.99
            },
            {
                "_id":new ObjectId(),
                "name": "New Bureautique",
                "category": "Bureautique",
                "brand": "EPSON",
                "unit_price": 299.99
            }
        ]
    },
    {
        "name": "Canon Inc.",
        "address": "456 Rue des Fournisseurs, Ville, Pays",
        "phone": "9876543210",
        "category": ["Photographie", "Bureautique"],
        "products": [
            {
                "_id":new ObjectId(),
                "name": "Appareil photo reflex",
                "category": "Photographie",
                "brand": "Canon",
                "unit_price": 899.99
            },
            {
                "_id":new ObjectId(),
                "name": "Imprimante laser",
                "category": "Bureautique",
                "brand": "Canon",
                "unit_price": 399.99
            }
        ]
    },
    {
        "name": "Fournisseur de Bureau A",
        "address": "789 Rue Elm",
        "phone": "0005559101",
        "category": ["Bureautique", "Informatique"],
        "products": [
            {
                "_id":new ObjectId(),
                "name": "Ordinateur portable",
                "category": "Informatique",
                "brand": "Lenovo",
                "unit_price": 799.99
            },
            {
                "_id":new ObjectId(),
                "name": "Imprimante",
                "category": "Bureautique",
                "brand": "HP",
                "unit_price": 299.99
            }
        ]
    },
    {
        "name": "Fournisseur de Bureau B",
        "address": "456 Avenue Oak",
        "phone": "0005555678",
        "category": ["Meubles", "Fournitures de Bureau"],
        "products": [
            {
                "_id":new ObjectId(),
                "name": "Chaise de bureau",
                "category": "Meubles",
                "brand": "Steelcase",
                "unit_price": 299.99
            },
            {
                "_id":new ObjectId(),
                "name": "Bureau",
                "category": "Meubles",
                "brand": "IKEA",
                "unit_price": 149.99
            },
            {
                "_id":new ObjectId(),
                "name": "Papier",
                "category": "Fournitures de Bureau",
                "brand": "Xerox",
                "unit_price": 9.99
            }
        ]
    },
    {
        "name": "Fournisseur de Bureau C",
        "address": "123 Rue Main",
        "phone": "0005551234",
        "category": ["Électronique", "Produits de Nettoyage"],
        "products": [
            {
                "_id":new ObjectId(),
                "name": "Écran d'Ordinateur",
                "category": "Informatique",
                "brand": "Dell",
                "unit_price": 249.99
            },
            {
                "_id":new ObjectId(),
                "name": "Nettoyant Désinfectant",
                "category": "Produits de Nettoyage",
                "brand": "Lysol",
                "unit_price": 6.99
            }
        ]
    },
    {
        "name": "Fournisseur de Bureau D",
        "address": "321 Rue Maple",
        "phone": "0005559876",
        "category": ["Électronique", "Fournitures de Bureau"],
        "products": [
            {
                "_id":new ObjectId(),
                "name": "Souris sans fil",
                "category": "Électronique",
                "brand": "Logitech",
                "unit_price": 29.99
            },
            {
                "_id":new ObjectId(),
                "name": "Stylo",
                "category": "Fournitures de Bureau",
                "brand": "Pilot",
                "unit_price": 2.99
            }
        ]
    },
    {
        "name": "Fournisseur de Bureau E",
        "address": "567 Avenue Pine",
        "phone": "0005556543",
        "category": ["Informatique", "Fournitures de Bureau"],
        "products": [
            {
                "_id":new ObjectId(),
                "name": "Clavier sans fil",
                "category": "Informatique",
                "brand": "Microsoft",
                "unit_price": 39.99
            },
            {
                "_id":new ObjectId(),
                "name": "Dossier suspendu",
                "category": "Fournitures de Bureau",
                "brand": "Avery",
                "unit_price": 12.99
            },
            {
                "_id":new ObjectId(),
                "name": "Stylo",
                "category": "Fournitures de Bureau",
                "brand": "Pilot",
                "unit_price": 2.99
            }
        ]
    },
    {
        "name": "Fournisseur de Bureau F",
        "address": "987 Rue Oak",
        "phone": "0005557890",
        "category": ["Fournitures de Bureau"],
        "products": [
            {
                "_id":new ObjectId(),
                "name": "Tapis de souris",
                "category": "Fournitures de Bureau",
                "brand": "3M",
                "unit_price": 7.99
            },
            {
                "_id":new ObjectId(),
                "name": "Papier",
                "category": "Fournitures de Bureau",
                "brand": "Xerox",
                "unit_price": 9.99
            }
        ]
    },
    {
        "name": "Fournisseur de Bureau G",
        "address": "741 Avenue Pine",
        "phone": "0005553210",
        "category": ["Électronique", "Informatique"],
        "products": [
            {
                "_id":new ObjectId(),
                "name": "Écran d'Ordinateur",
                "category": "Informatique",
                "brand": "Samsung",
                "unit_price": 279.99
            },
            {
                "_id":new ObjectId(),
                "name": "Imprimante",
                "category": "Informatique",
                "brand": "Canon",
                "unit_price": 319.99
            }
        ]
    },
    {
        "name": "Fournisseur de Bureau H",
        "address": "852 Rue Maple",
        "phone": "0005554567",
        "category": ["Meubles", "Fournitures de Bureau"],
        "products": [
            {
                "_id":new ObjectId(),
                "name": "Chaise de bureau",
                "category": "Meubles",
                "brand": "IKEA",
                "unit_price": 199.99
            },
            {
                "_id":new ObjectId(),
                "name": "Bureau",
                "category": "Meubles",
                "brand": "Steelcase",
                "unit_price": 319.99
            },
            {
                "_id":new ObjectId(),
                "name": "Stylo",
                "category": "Fournitures de Bureau",
                "brand": "Parker",
                "unit_price": 14.99
            }
        ]
    },
    {
        "name": "Fournisseur de Bureau I",
        "address": "963 Avenue Elm",
        "phone": "0005555678",
        "category": ["Informatique", "Fournitures de Bureau"],
        "products": [
            {
                "_id":new ObjectId(),
                "name": "Clé USB",
                "category": "Informatique",
                "brand": "SanDisk",
                "unit_price": 19.99
            },
            {
                "_id":new ObjectId(),
                "name": "Tapis de souris",
                "category": "Fournitures de Bureau",
                "brand": "3M",
                "unit_price": 6.99
            }
        ]
    },
    {
        "name": "Fournisseur de Bureau J",
        "address": "369 Rue Oak",
        "phone": "0005559876",
        "category": ["Meubles", "Fournitures de Bureau"],
        "products": [
            {
                "_id":new ObjectId(),
                "name": "Chaise de bureau",
                "category": "Meubles",
                "brand": "Herman Miller",
                "unit_price": 599.99
            },
            {
                "_id":new ObjectId(),
                "name": "Bureau",
                "category": "Meubles",
                "brand": "IKEA",
                "unit_price": 149.99
            },
            {
                "_id":new ObjectId(),
                "name": "Papier",
                "category": "Fournitures de Bureau",
                "brand": "Xerox",
                "unit_price": 9.99
            },
            {
                "_id":new ObjectId(),
                "name": "Stylo",
                "category": "Fournitures de Bureau",
                "brand": "Parker",
                "unit_price": 14.99
            }
        ]
    }
];
class Provider {
    constructor() {
        this.initCollection().then().catch(console.error);
        this.collectionName='providers';
    }

    async initCollection(){
        await mongoClient.connect();
        console.log('Connected successfully to server');
        const db = mongoClient.db(dbName);

        const collectionName = this.collectionName;

        // Check if the collection already exists
        const collectionNames = await db.listCollections().toArray();
        const collectionExists = collectionNames.some((coll) => coll.name === collectionName);

        if (!collectionExists) {
            // Collection does not exist, create it
            await db.createCollection("providers", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        title: "Providers Object Validation",
                        required: [ "name", "address", "phone", "category", "products"],
                        properties: {
                            name: {
                                bsonType: "string",
                                description: "The name  of the provider",
                            },
                            address: {
                                bsonType: "string",
                                description: "The address of the provider",
                            },
                            phone: {
                                bsonType: "string",
                                "pattern": "^\\d{8,}$",
                                description: "The phone number of the provider (10 digits)",
                            },
                            category: {
                                bsonType: "array",
                                description: "The categories the provider is associated with",
                                items: {
                                    bsonType: "string",
                                },
                            },
                            products: {
                                bsonType: "array",
                                description: "The list of products offered by the provider",
                                items: {
                                    bsonType: "object",
                                    required: ["name", "category", "brand", "unit_price"],
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
                                    },
                                },
                            },
                        },
                    },
                },
            });

            console.log(`Collection '${collectionName}' created successfully.`);
        } else {
            console.log(`Collection '${collectionName}' already exists.`);
        }

        await mongoClient.close();
    }
    async addOne() {

        await mongoClient.connect();
        console.log('Connected successfully to server');
        const db = mongoClient.db(dbName);
        // const collection1 = db.collection('documents');

        //await mongoClient.close();
        return await db.collection(this.collectionName).insertOne({
            "name": "HP Inc.",
            "address": "123 Rue des Fournisseurs, Ville, Pays",
            "phone": "0123456789",
            "category": ["Informatique", "Bureautique"],
            "products": [
                {
                    "name": "Ordinateur portable",
                    "category": "Informatique",
                    "brand": "HP",
                    "unit_price": 999.99
                },
                {
                    "name": "Imprimante multifonction",
                    "category": "Bureautique",
                    "brand": "HP",
                    "unit_price": 299.99
                }
            ]
        });
    }

    async addMany() {
        await mongoClient.connect();
        console.log('Connected successfully to server');
        const db = mongoClient.db(dbName);
        return await db.collection(this.collectionName).insertMany(providers);
    }

    async populate(){
        setTimeout(async () => {
            await mongoClient.connect();
            const db = mongoClient.db(dbName);
            await db.collection(this.collectionName).deleteMany({});
            await db.collection("orders").deleteMany({});
            await this.addMany();
            await mongoClient.close();
        },1000)
    }
    async getAllProvider(){

        await mongoClient.connect();
        console.log('Connected successfully to server');
        const db = mongoClient.db(dbName);
    }

    async getAllCategories(){
        await mongoClient.connect();
        console.log('Connected successfully to server');
        const db = mongoClient.db(dbName);
        const collection = db.collection(this.collectionName);
        return await collection.distinct("category", {});
    }


    async getProductsByCategory(category){
        await mongoClient.connect();
        console.log('Connected successfully to server');
        const db = mongoClient.db(dbName);
        const collection = db.collection(this.collectionName);

        return await collection.aggregate([
            {
                $unwind: '$products'
            },
            {
                $match: {
                    'products.category': category
                }
            },
            {
                $project: {
                    providerId: '$_id',
                    providerName: '$name',
                    product: '$products'
                }
            }
        ]).toArray();
    }

    async getProductsByProductId(productId){
        await mongoClient.connect();
        console.log('Connected successfully to server');
        const db = mongoClient.db(dbName);
        const collection = db.collection(this.collectionName);

        const result = await collection.findOne(
            {
                'products._id':new ObjectId(productId),
            },
            { projection: { _id: 1, 'products.$': 1 } }
        );

        if (result && result.products.length === 1) {
            const product = result.products[0];
            return {
                providerId: result._id,
                product,
            };
        } else {
            return null;
        }
    }

}


const provider = new Provider();

exports.provider = provider ;