const path = require('path');
const rootDir = require('../helpers/path');
const Product = require("../models/product");
const fs = require('fs');



exports.getAddProduct = (req,res,next)=>{
	res.sendFile(path.join(rootDir,'views','add-product.html'));
}

exports.postAddProduct = (req,res,next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
   Product.create({
        title:title,
        price:price,
        description:description
    }).then(result=>{
        //console.log(result);
        consolelog("Created Product")
    }).catch(err=>console.log(err))
	
}

exports.getProducts = (req,res,next)=>{
    Product.findAll()
         .then(products => {
            fs.readFile(path.join(rootDir, 'views', 'shop.html'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    const html = data.replace('<!--TABLE_BODY-->', generateTableBody(products));
                    res.send(html);
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
}

function generateTableBody(products) {
    let html = '';
    products[0].forEach(product => {
        html += `
            <tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
            </tr>
        `;
    });

    return html;
}
