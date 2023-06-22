const util = require('util');
const db = require('../helpers/database');
const query = util.promisify(db.query).bind(db)

class Product {
    constructor(title,price,description){
        this.title = title;
        this.price = price;
        this.description = description;
    }
    save(){
        return db.execute('INSERT INTO products(title,price,description)VALUES(?,?,?)',[this.title,this.price,this.description])
    }
    static fetchAll(){
       return db.query('SELECT * FROM products');
    }
}


module.exports = Product;
