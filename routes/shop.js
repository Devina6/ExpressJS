const express = require('express');

const router = express.Router();

const path = require('path');

router.get('/',(req,res,next)=>{
	res.sendFile(path.join(__dirname,'../','views','shop.html'));
	//dirname points to routes folder 
	//../ go up one level
});


module.exports = router;
