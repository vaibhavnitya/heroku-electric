var express = require('express')
var router = express.Router()

var usageDataArray = []

router.get('/', function (req, res) {
  res.send(usageDataArray)
})

router.get('/:userId', function (req, res) {
  if (req.params.userId) {
    data = usageDataArray.filter(({userId}) => (userId == req.params.userId))
    if (data.length) {
      res.send(data)
    }
  }
  res.send({
    message: 'User ID is incorrect'
  })
})

router.post('/', function(req,res) {
  const usageData = req.body || {}

	const data = {
    'userId': usageData.userId || 1,
		'voltage': usageData.voltage,
		'current': usageData.current,
		'power': usageData.power,
		'frequency': usageData.frequency,
    'energy': usageData.energy,
	}

  data.id = usageDataArray.length + 1
  usageDataArray.push(data)

  res.send({
    message: 'Data updated successfully',
    data
  })
})

module.exports = router
