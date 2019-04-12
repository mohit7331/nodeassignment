 const Sequelize = require('sequelize')

const Model= Sequelize.Model


const op = Sequelize.Op


const db= new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/cart_list.db'
})


class Vendor extends Model{}
Vendor.init({
    Name:
    {
        type: Sequelize.STRING,
        allowNull:false
    }
},{sequelize:db})


class Product extends Model{}
Product.init({
    Name:
    {
        type:Sequelize.STRING,
        allowNull: false
    },
    Price:
    {
        type:Sequelize.INTEGER,
        allowNull:false
    }
},{sequelize:db})


class User extends Model{}
User.init({
    Name:
    {
        type:Sequelize.STRING,
        allowNull : false
    }
},{sequelize:db})


class  Cart extends Model{}
Cart.init({

    Quantity:
    {
        type:Sequelize.INTEGER,
        allowNull : false
    }

},{sequelize:db})


Vendor.hasMany(Product,{onDelete:'cascade'})
Product.belongsTo(Vendor)


User.belongsToMany(Product,{
    through:
    {
        model:Cart,
        unique : false
    },
    foreignKey : 'UserId',
    constraints : false
});


Product.belongsToMany(User,{
    through:
    {
        model:Cart,
        unique : false
    },
    foreignKey : 'ProductId',
    
});


module.exports = {
    db, 
    Vendor, 
    Product,
    User,
    Cart
  }











