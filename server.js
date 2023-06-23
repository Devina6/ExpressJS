const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./helpers/database');
const controller404 = require('../controllers/404');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoutes = require('./routes/contactus');
const messageRoutes = require('./routes/message');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(shopRoutes);
app.use('/admin',adminRoutes);
app.use('/contactus',contactRoutes);
app.use('/message',messageRoutes);

app.use(controller404.get404);

sequelize.sync()
    .then(result=>{
        //console.log(result);
        app.listen(4000);
    })
    .catch(err=> console.log(err))
