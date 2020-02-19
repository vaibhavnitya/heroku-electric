const express = require('express')
const bodyParser = require('body-parser')
const httpServer = express()
const path = require('path')
const PORT = process.env.PORT || 5000

httpServer.use(bodyParser.json());                                                   
httpServer.use(bodyParser.urlencoded({     // to support URL-encoded bodies            
	extended: true
}));    
httpServer.use(express.static(__dirname));

httpServer.set('views', __dirname +'views');
httpServer.set('view engine', 'ejs');
httpServer.engine('html', require('ejs').renderFile);
httpServer.use(express.static(path.join(__dirname, 'public')))

httpServer.listen(PORT, function() {
  console.log('HTTP server listening at port', PORT);
});

httpServer.get('/', function(req,res){
  res.render('pages/index')
});

httpServer.post('/registerUser', function(req,res) {
	var data = {
		'username': req.body.username,
		'fname': req.body.fname,
		'lname': req.body.lname,
		'password': req.body.password
	},
	err = {
		'err': 'incomplete data'
	};
	if (req.body.username && req.body.fname && req.body.lname && req.body.password) {
    res.send({'err': null, 'message': 'successfully registered user'});
	} else {
		res.send(err);
	}
});
