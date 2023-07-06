const path = require('path');
const rootDir = require('../helpers/path');
const Product = require("../models/product");
const fs = require('fs');



exports.getAddProduct = (req,res,next)=>{
    fs.readFile(path.join(rootDir, 'views', 'include', 'navigation.html'), 'utf8', (err, navigationContent) => {
        if (err) {
          console.error('Error reading navigation.html', err);
          return next();
        }
    
        fs.readFile(path.join(rootDir, 'views', 'admin', 'add-product.html'), 'utf8', (err, addProductContent) => {
          if (err) {
            console.error('Error reading add-product.html', err);
            return next();
          }
    
          // Combine the navigation and add-product contents
          const combinedContent = addProductContent.replace('<!-- INCLUDE_NAVIGATION -->', navigationContent);
    
          // Send the combined content as the response
          res.send(combinedContent);
        });
      });
    }

exports.postAddProduct = (req,res,next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
   req.user.createProduct({
        title:title,
        price:price,
        description:description,
    }).then(result=>{
        //console.log(result);
        consolelog("Created Product")
    }).catch(err=>console.log(err))
	
}

exports.getProducts = (req,res,next)=>{
    Product.findAll()
         .then(products => {
            fs.readFile(path.join(rootDir, 'views', 'admin/products.html'), 'utf8', (err, data) => {
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
		<td><form action="/admin/edit-product/${product.id}" method="GET">
                    <input type="submit" class="btn btn-info" id="edit" value="Edit">
                    </form></td>
                <td><form action="/admin/delete-product/${product.id}"method="POST>"
                    <input type="submit" class="btn btn-danger" id="delete">Delete</button>
                    </form></td>
            </tr>
        `;
    });

    return html;
}

exports.getEditProduct = (req, res, next) => {
    /*const editMode = req.query.edit;  //?edit=true
    if(!editMode){
        return res.redirect('/');
    }*/
    const prodId = req.params.ProductId;
    //Product.findById(prodId)
    Product.findAll({where:{id:prodId}})
        .then(products => {
        if(!products){
            return res.redirect('/');
        }
        fs.readFile(path.join(rootDir, 'views', 'admin/edit-product.html'), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                const html = data.replace('<!--TITLE_VALUE-->', products[0].title)
                           .replace('<!--PRICE_VALUE-->', products[0].price)
                           .replace('<!--DESCRIPTION_VALUE-->', products[0].description);
                res.send(html);
                }
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
};


exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    Product.findById(prodId)
        .then(product =>{
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            return product.save();
        })
        .then(result=>{
            console.log("updated product");
            res.redirect('/admin/products');
        })
        .catch(err=>console.log(err))
    
  };

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.params.ID;
    Product.destroy({where:{id:prodId}})
        .then(result => {
            console.log("Deleted Product");
            res.redirect('/admin/products');
        })
        .catch(err=>console.log(err));
  };
  
