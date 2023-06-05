const db = require('../helpers/database');

module.exports = class Product {
    constructor(id,title,price,description){
        this.id=id;
        this.title = title;
        this.price = price;
        this.description = description;
    }
    save(){
        return db.execute('INSERT INTO products(title,price,description)VALUES(?,?,?)',[this.title,this.price,this.description])
    }
    static fetchAll(){
       return db.execute('SELECT * FROM products');
    }
    
}
