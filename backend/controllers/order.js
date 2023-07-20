const {order} = require('../models/order')
const {provider} = require("../models/provider");

exports.getAllOrders = (req, res, next) => {

    let STATES = ['PAYMENT','WAITING',"DELIVERING","CANCEL","DELIVERED"];

    if(req.query.isPaid){
        STATES = ["DELIVERING","DELIVERED"];
    }

    order.getOrdersBySate(STATES)
        .then(
        (orders) => {
            // Check if the "name" query parameter is defined and not empty
            if (req.query.name && req.query.name.trim() !== '') {
                const productName = req.query.name;

                // Filtering the data based on the provided query parameter (productName)
                const filteredData = orders.filter((order) =>
                    order.name.toLowerCase().includes(productName.toLowerCase())
                );

                res.status(200).json(filteredData);
            } else {
                res.status(200).json(orders);
            }
        }
    ).catch(
        (error) => {
            console.log(error)
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getHistoryOrders = (req, res, next) => {

    order.getOrdersBySate(['CANCEL','OK'])
        .then(
            (order) => {
                res.status(200).json(order);
            }
        ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getOneOrder = (req, res, next) => {

    order.getOrderById(req.params.id)
        .then(
            (order) => {
                if (order){
                    res.status(200).json(order);
                }else{
                    res.status(404).json({
                        error: "Not found"
                    });
                }

            }
        ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.createOrder = (req, res, next) => {

    req.body.formData = JSON.parse(JSON.stringify(req.body));



    req.body.order = JSON.parse(JSON.stringify(req.body));

    // console.log(req.body.order);


    console.log(req.body.formData.productId);



    provider.getProductsByProductId(req.body.formData.productId).then((product)=>{
        if (product){
            const orderToAdd ={
                name: product.product.name,
                category: product.product.category,
                brand: product.product.brand,
                unit_price: product.product.unit_price,
                quantity: Number(req.body.formData.quantity),
                state: "WAITING",
                providerId: product.providerId
            }
            order.addOne(orderToAdd)
                .then(
                    () => {
                        res.status(201).json({
                            message: 'Post saved successfully!'
                        });
                    }
                ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
        }else{
            res.status(400).json({
                error: "The product you want is unavailable"
            });
            console.log("The product you want is unavailable");
        }

    });


};

exports.modifyOrder = (req, res, next) => {
    req.body.order = JSON.parse(JSON.stringify(req.body));

    // console.log(req.body.order);
    var orderToUpdate = null;


    if(req.body.order.quantity){
         orderToUpdate ={
            quantity: Number(req.body.order.quantity)
        }
    }else{
         orderToUpdate = req.body.order;

    }

    console.log(orderToUpdate)

    order.updateOrder(req.params.id,orderToUpdate)
        .then(
        () => {
            res.status(201).json({
                message: 'Order updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};


