const path = require('path');
const rootDir = require('../helpers/path');
const Product = require("../models/product");

//const { JSDOM } = require("jsdom");
//const fs = require('fs');
//const html = fs.readFileSync(path.join(rootDir,'views','shop.html'), 'utf8');
//const dom = new JSDOM(html,{runScripts:'dangerously'});
//const { document, window} = dom.window;


exports.getAddProduct = (req,res,next)=>{
	res.sendFile(path.join(rootDir,'views','add-product.html'));
}

exports.postAddProduct = (req,res,next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null,title,price,description);
    product
        .save()
        .then(()=>{
        res.redirect('/');
    })
        .catch(err=>console.log(err));
	
}

exports.getProducts = (req,res,next)=>{
    Product
         .fetchAll()
         .then(data =>{
            for (var i=0;i<data[0].length;i++){
                printData(data[0][i],data[0][i].id)
            }
     });
    res.sendFile(path.join(rootDir,'views','shop.html'));
  //const htmlWithDOMChanges = dom.serialize();
  //res.send(htmlWithDOMChanges);
    
}


