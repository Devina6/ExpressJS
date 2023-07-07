const path = require('path');
const rootDir = require('../helpers/path');
const Product = require('../models/product');
const Cart = require('../models/cart');
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

exports.getProduct = (req,res,next) => {
    const prodId = req.params.ID;
    Product.findAll({where:{id:prodId}})
    .then(products => {
        fs.readFile(path.join(rootDir, 'views', 'shop/product-detail.html'), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                const html = data.replace('<!--TABLE_BODY-->', genTableBody(products));
                res.send(html);
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Internal Server Error');
    });
    
}

function genTableBody(products) {
    let html = '';
    products.forEach(product => {
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
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    fs.readFile(path.join(rootDir, 'views', 'shop/cart.html'), 'utf8', (err, data) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal Server Error');
                        } else {
                            const html = data.replace('<!--TABLE_BODY-->', generateCart(products));
                            res.send(html);
                        }
                    });
                })
                .catch(err => console.log(err))
        })
        .catch(err => {
        console.log(err);
        res.status(500).send('Internal Server Error');
        });    
};

exports.postCart = (req,res,next)=>{
   const prodId = req.params.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where:{id:prodId}})
        })
        .then(products =>{
            let product;
            if (products.length>0){
                product = products[0] 
            }
            
            if(product){
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity+1;
                return product;
            }
            return Product.findByPk(prodId)
        })
        .then(product =>{
            return fetchedCart.addProduct(product,{
                through:{quantity:newQuantity}
            })
        })
        .then(( )=> {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
}

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

function generateCart(products) {
    let html = '';
    products.forEach(product => {
        html += `
            <tr>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.cartItem.quantity}</td>
                <td><form action="/cart-delete-item/${product.id}" method="POST">
                    <input type="submit" class="btn btn-info" id="delete" value="Delete">
                    </form></td>
            </tr>
        `;
    });

    return html;
}
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
