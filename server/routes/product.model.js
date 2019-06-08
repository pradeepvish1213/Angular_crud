module.exports = (sequelize, type) => {
  var Product = sequelize.define('product', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ProductName: type.STRING,
    ProductDescription: type.TEXT,
    ProductPrice: type.FLOAT,
  });
  return Product;
}
