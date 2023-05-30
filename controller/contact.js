const rootDir = require('../helpers/path');


exports.getContact = (req,res,next)=>{
	res.sendFile(path.join(rootDir,'views','contactus.html'));
}

exports.postContact = (req,res,next)=>{
	console.log(req.body);
	res.redirect('/message/message');
}

exports.getMessage = (req,res,next)=>{
	res.sendFile(path.join(rootDir,'views','message.html'));
}
