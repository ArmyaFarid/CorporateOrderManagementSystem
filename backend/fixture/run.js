const {mongoClient} = require('../mongodb/mongoClient');

const {provider} = require('../models/provider')





provider.populate()
    .then()
    .catch((err)=>{
        console.log(err);
    })
    .finally(mongoClient.close);



// provider.getProductsByProductId("64b81038f15b74bbac54d8a0")
//     .then(console.log)
//     .catch((err)=>{
//         console.log(err);
//     })
//     .finally();


// order.addOne()
//     .then(console.log)
//     .catch((err)=>{
//         console.log(err);
//     })
//     .finally();