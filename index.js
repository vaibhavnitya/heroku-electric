const express = require('express')
const bodyParser = require('body-parser')
const httpServer = express()
const path = require('path')
const PORT = process.env.PORT || 5000
const server = require('./server')

httpServer.use(bodyParser.json())                                 
httpServer.use(bodyParser.urlencoded({     // to support URL-encoded bodies            
	extended: true
}));    

httpServer.set('views', path.join(__dirname,'views'))
httpServer.set('view engine', 'ejs')
httpServer.engine('html', require('ejs').renderFile)
httpServer.use(express.static(path.join(__dirname, 'public')))

httpServer.listen(PORT, function() {
  console.log('HTTP server listening at port', PORT)
})

// APIs and end points
httpServer.use('/api', server)

httpServer.get('/', function(req,res){
  res.render('pages/index', {usageList: []})
})