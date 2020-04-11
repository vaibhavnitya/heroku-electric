var express = require('express')
var router = express.Router()
const BlockchainModule = require('../../sample-blockchain')

router.get('/', function (req, res) {
  BlockchainModule.usageModule.getAllUsage()
  .then(response => {
    if (response.code > 0) {
      res.send(response.usages)
    } else {
      res.send([])
    }
  }) 
})

router.get('/:userId', function (req, res) {
  if (req.params.userId) {
    BlockchainModule.usageModule.getUsageForUser(req.params.userId)
    .then(response => {
      if (response.code > 0) {
        res.send(response.usages)
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
  data.time = (new Date()).getTime()
  
  if (data.userId) {
    BlockchainModule.userModule.getUser(data.userId)
    .then(response => {
      if (response.code > 0) {
        BlockchainModule.usageModule.createUsage(data)
        .then(createResponse => {
          if (createResponse.code > 0) {
            res.send({
              message: 'Data updated successfully',
              data
            })
          } else {
            res.send({
              message: 'Failed to update data'
            })
          }
        })
      } else {
        res.send({
          message: 'Failed to update data. User not registered'
        })
      }
    }).catch(error => {
      res.send({
        message: 'Failed to update data. User not registered'
      })
    })
  }
})

module.exports = router
