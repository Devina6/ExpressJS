//const http = require('http'); not required since app.listen 

const express = require('express');

const app = express();

app.use((req,res,next)=>{
	console.log("in middleware  1");
	next();//allows the request to next middleware in line
});

app.use((req,res,next)=>{
	console.log("in  middleware  2");
	res.send('<h1>Hello from express</h1>');
});
/*const server = http.createServer(app);

server.listen(4000);*/
//shorter version

app.listen(4000);
