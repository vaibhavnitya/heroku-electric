const express = require('express')
const router = express.Router()
const BlockchainModule = require('../../sample-blockchain')

router.get('/', function (req, res) {
  BlockchainModule.userModule.getAllUsers()
  .then(response => {
    if (response.code > 0) {
      res.send(response.users)
    } else {
      res.send([])
    }
  }) 
})

router.get('/checkUserRegistered', function (req, res) {
  BlockchainModule.userModule.checkUserRegistered()
  .then(response => {
    res.send({
      code: 1,
      message: 'Admin registered'
    })
  })
  .catch(error => {
    res.send({
      code: 0,
      message: 'Admin not registered'
    })
  })
})

router.get('/:userId', function (req, res) {
  if (req.params.userId) {
    BlockchainModule.userModule.getUser(req.params.userId)
    .then(response => {
      if (response.code > 0) {
        res.send(response.user)
      } else {
        res.send({})
      }
    }).catch(error => {
      res.send({})
    })
  } else {
    res.send({})
  }
})

router.post('/', function(req,res) {
  const userData = req.body || {}
  
  if (userData.userName) {
    BlockchainModule.userModule.getAllUsers()
    .then(response => {
      if (response.code > 0) {
        const data = {
          'userId': 'USER0000',
          'userName': userData.userName,
        }
        const lastUser = response.users[response.users.length - 1]
        if (lastUser) {
          const lastUserData = lastUser.Record
          let userIdCount = parseInt(lastUserData.userId.split('USER')[1])
          data.userId = `USER${('000' + ++userIdCount).slice(-4)}`
        }

        BlockchainModule.userModule.createUser(data)
        .then(createResponse => {
          if (createResponse.code > 0) {
            res.send({
              message: 'Registered user successfully',
              data
            })
          } else {
            res.send({
              message: 'Failed to register user'
            })
          }
        })
      } else {
        res.send({
          message: 'Failed to register user'
        })
      }
    })
  } else {
    res.send({
      message: 'Failed to register user. Provide userName'
    })
  }
})

module.exports = router
