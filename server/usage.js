var express = require('express')
var router = express.Router()
var fs = require('fs');

const usageFile = 'usage.txt'
var usageDataArray = []

const readUsageData = (next) => {
  fs.readFile(usageFile, 'utf-8', (err, fileData) => {
    if (err) {
      next(null)
    } else {
      const usageDataArray = fileData.split(';').map(usage => usage ? JSON.parse(usage) : null)
      !usageDataArray[usageDataArray.length - 1] ? usageDataArray.pop() : null
      next(usageDataArray)
    }    
  })
}

router.get('/', function (req, res) {
  readUsageData((usageData) => {
    if (usageData) {
      res.send(usageData)
    } else {
      res.send([])
    }
  })
})

router.get('/:userId', function (req, res) {
  if (req.params.userId) {
    readUsageData((usageData) => {
      if (usageData) {
        data = usageData.filter(({userId}) => (userId == req.params.userId))
        if (data.length) {
          res.send(data)
        }
      } else {
        res.send([])
      }
    })
  } else {
    res.send([])
  }
})

router.post('/', function(req,res) {
  const usageData = req.body || {}

	const data = {
    'userId': usageData.userId || 1,
		'voltage': usageData.voltage || '',
		'current': usageData.current || '',
		'power': usageData.power || '',
		'frequency': usageData.frequency || '',
    'energy': usageData.energy || '',
	}

  data.id = usageDataArray.length + 1
  data.date = Date.now()
  usageDataArray.push(data)
  
  fs.appendFile(usageFile, `${JSON.stringify(data)};`, (err) => {
    if (err) {
      res.send({
        message: 'Failed to update data'
      })
    } else {
      res.send({
        message: 'Data updated successfully',
        data
      })
    }
  })
})

module.exports = router
