const path = require('path');
const rootDir = require('../helpers/path');
const Product = require('../models/product');
const fs = require('fs');

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        fs.readFile(path.join(rootDir, 'views', 'shop/product-list.html'), 'utf8', (err, data) => {
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
};

function generateTableBody(products) {
    let html = '';
    products.forEach(product => {
        html += `
            <tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td><button type="button" class="btn btn-info">Details</button></td>
            </tr>
        `;
    });

    return html;
}

exports.getIndex = (req, res, next) => {
    Product.findAll().then(products => {
        fs.readFile(path.join(rootDir, 'views', 'shop/index.html'), 'utf8', (err, data) => {
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
};

exports.getCart = (req, res, next) => {
    Product.findAll().then(products => {
        fs.readFile(path.join(rootDir, 'views', 'shop/cart.html'), 'utf8', (err, data) => {
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
};

exports.getOrders = (req, res, next) => {
    Product.findAll().then(products => {
        fs.readFile(path.join(rootDir, 'views', 'shop/orders.html'), 'utf8', (err, data) => {
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
};

exports.getCheckOut = (req, res, next) => {
    Product.findAll().then(products => {
        fs.readFile(path.join(rootDir, 'views', 'shop/checkout.html'), 'utf8', (err, data) => {
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
};
