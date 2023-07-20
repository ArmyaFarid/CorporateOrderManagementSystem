const {order} = require("../models/order");
const {provider} = require("../models/provider");
exports.getAlProviders = (req, res, next) => {

    order.getOrdersBySate(['PAYMENT','WAITING'])
        .then(
            (thing) => {
                res.status(200).json(thing);
            }
        ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};


exports.getAllCatories = (req, res, next) => {

    provider.getAllCategories()  .then(
        (categories) => {
            res.status(200).json(categories);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getProductByCategory = (req, res, next) => {

    provider.getProductsByCategory(req.params.category)
        .then(
            (products) => {
                res.status(200).json(products);
            }
        ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};


exports.populateProvider = (req, res, next) => {
    provider.populate()
        .then(
            () => {
                res.status(200).json({message:true});
            }
        ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};
