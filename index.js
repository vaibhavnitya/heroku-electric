const express = require('express')
const bodyParser = require('body-parser')
const httpServer = express()
const path = require('path')
const PORT = process.env.PORT || 5000
const server = require('./server')
let BlockchainModule = null
try {
  BlockchainModule = require('../sample-blockchain')
} catch(err) {
  console.log('Missing dependency! This application is dependent on another repository.')
  console.log('To proceed further, clone "https://github.com/vaibhavnitya/sample-blockchain" repository in the parent directory.')
}

httpServer.use(bodyParser.json())                                 
httpServer.use(bodyParser.urlencoded({     // to support URL-encoded bodies            
	extended: true
}));    

httpServer.set('views', path.join(__dirname,'views'))
httpServer.set('view engine', 'ejs')
httpServer.engine('html', require('ejs').renderFile)
httpServer.use(express.static(path.join(__dirname, 'public')))

// Initialize blockchain ledgers
if (BlockchainModule) {
  BlockchainModule.userModule.initializeUserModule()
  BlockchainModule.usageModule.initializeUsageModule()
}

httpServer.listen(PORT, function() {
  console.log('HTTP server listening at port', PORT)
})

// APIs and end points
httpServer.use('/api', server)

httpServer.get('/', function(req,res){
  res.render('pages/index')
})

httpServer.get('/users/', function(req,res){
  res.render('pages/users')
})

httpServer.get('/usages/', function(req,res){
  res.render('pages/usages')
})

httpServer.get('/usage/:id', function(req,res){
  res.render('pages/usage', { userId: req.params.id })
})