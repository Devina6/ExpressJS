const express = require('express');
const router = express.Router();
const path = require('path');

const rootDir = require('../helpers/path');

router.get('/contact',(req,res,next)=>{
	res.sendFile(path.join(rootDir,'views','contactus.html'));
});

router.post('/contact',(req,res,next)=>{
	console.log(req.body);
	res.redirect('/message/message');
});


module.exports = router;
