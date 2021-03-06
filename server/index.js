const express = require('express')
const router = express.Router()

// Import modules
const usage = require('./usage')
const user  = require('./user') 

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log(`Time: ${Date.now()} : ${req.originalUrl}`)
  next()
})

router.use('/usage', usage)
router.use('/user', user)

// define the default
router.get('/', function (req, res) {
  res.send('Welcome to the heroku electric APIs')
})

module.exports = router