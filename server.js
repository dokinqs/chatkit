const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:8ef7f197-95d7-41db-9981-3e492b421d50',
  key: 'e0e5c715-6b83-4cae-8d6e-59473a177a1b:48zKgVzuzwBP+/I1RkDxZpCAwHGnwAm79yQQNATAv2g='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({ 
  id: username, 
  name: username 
      })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})
  
app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})
  
const PORT = 3001
app.listen(PORT, err => {
  err ? console.error(err) : console.log(`Running on port ${PORT}`)
})
