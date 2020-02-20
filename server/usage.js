var express = require('express')
var router = express.Router()

var usageDataArray = []

router.get('/', function (req, res) {
  res.send('This is usage API')
})

router.get('/:userId', function (req, res) {
  res.send('This is usage API' + req.params.userId)
})

router.post('/', function(req,res) {
  const usageData = req.body || {}
	const data = {
    'userId': usageData.userId || 1,
		'voltage': usageData.username,
		'current': usageData.current,
		'power': usageData.power,
		'frequency': usageData.frequency,
    'energy': usageData.energy,
	}

  usageDataArray.push(data)
  res.send({
    message: ''
  })
})

module.exports = router
