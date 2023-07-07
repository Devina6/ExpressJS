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
                const html = data.replace('<!--TABLE_BODY-->', generateProducts(products));
                res.send(html);
            }
        });

    })
   
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
};

exports.getProduct = (req,res,next) => {
    const prodId = req.params.ID;
    Product.findAll({where:{id:prodId}})
    .then(products => {
        fs.readFile(path.join(rootDir, 'views', 'shop/product-detail.html'), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                const html = data.replace('<!--TABLE_BODY-->', generateProduct(products));
                res.send(html);
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Internal Server Error');
    });
    
}

function generateProducts(products) {
    let html = '';
    products.forEach(product => {
        html += `
            <tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td><form action="/products/${product.id}" method="GET">
                    <input type="submit" class="btn btn-info" id="details" value="Details">
                    </form></td>
                <td><form action="/cart/${product.id}" method="POST">
                    <input type="submit" class="btn btn-success" id="AddToCart" value="Add to Cart">
                    </form></td>
                
            </tr>
        `;
    });

    return html;
}

function generateProduct(products) {
    let html = '';
    products.forEach(product => {
        html += `
            <tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.description}</td> 
                <td><form action="/cart/${product.id}" method="POST">
                    <input type="submit" class="btn btn-success" id="AddToCart" value="Add to Cart">
                    </form></td>               
            </tr>
        `;
    });

    return html;
}

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
        fs.readFile(path.join(rootDir, 'views', 'shop/index.html'), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                const html = data.replace('<!--TABLE_BODY-->', generateProducts(products));
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

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({where:{id:prodId}})
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))    
    }

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user
                .createOrder()
                .then(order => {
                    return order.addProducts(
                        products.map(product => {
                            product.orderItem = {quantity:product.cartItem.quantity};
                            return product;
                    }))
                })
                .catch(err => console.log(err))
        })
        .then(result => {
            return fetchedCart.setProducts(null);
            
        })
        .then (result => {
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
};

exports.getOrder = (req, res, next) => {
    req.user
        .getOrders({include:['products']})
        .then(orders =>{
            fs.readFile(path.join(rootDir, 'views', 'shop/orders.html'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    const html = data.replace('<!--TABLE_BODY-->', generateOrder(orders));
                    res.send(html);
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
};

function generateOrder(orders) {
    let html = '';
    orders.forEach(order => {
        order.products.forEach(product => {
            html +=`
                    <tr>
                        <td>${order.id}</td>
                        <td>${product.title}</td>
                        <td>${product.orderItem.quantity}</td>
                    </tr>`
        })
                    
    });

    return html;
}
