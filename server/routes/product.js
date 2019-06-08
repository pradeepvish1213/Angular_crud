const express = require('express');
const productRoutes = express.Router();
var Sequelize = require('sequelize');
// Require Product model in our routes module
var productModel = require('./product.model');


var sequelize = new Sequelize('test', 'root', '', {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Product = productModel(sequelize, Sequelize)
sequelize.sync({
    force: false,
    syncOnAssociation: false
  })
  .then(() => {
    console.log(`Database & tables created!`)
  });


//Defined store route
productRoutes.route('/add').post(function (req, res, next) {
  console.log('Product ', req.body);
  Product.create(req.body).then(() => {
    res.json({
      'Product': 'Product has been added successfully'
    });
  }).catch(err => {
    res.json({
      'error': "unable to save to database",
      'msg': err.original.sqlMessage
    });
  }).finally(() => {
    sequelize.close();
  });
});

// Defined get data(index or listing) route
productRoutes.route('/').get(function (req, res, next) {
  Product.findAll({}).then(result => {
    res.json(result);
  });
});

// Defined edit route
productRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Product.findByPk(id).then(product => {
    res.json(product);
  });
});

//  Defined update route
productRoutes.route('/update/:id').post(function (req, res) {
  Product.findByPk(req.params.id).then(product => {
    if (!product)
      res.status(404).send("Record not found");
    else {
      product.ProductName = req.body.ProductName;
      product.ProductDescription = req.body.ProductDescription;
      product.ProductPrice = req.body.ProductPrice;

      product.save().then(product => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
productRoutes.route('/delete/:id').get(function (req, res) {
  Product.destroy({where:{
    id: req.params.id
  }}).then(affected =>{
     res.json('Successfully removed');
  })
});

module.exports = productRoutes;
