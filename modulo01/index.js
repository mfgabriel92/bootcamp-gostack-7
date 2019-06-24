const express = require('express')
const server = express()

server.use(express.json())

server.use((req, res, next) => {
  console.time('Request')
  console.log(`Method: ${req.method}\nURL: ${req.url}`)
  next()
  console.timeEnd('Request')
})

const users = ['Gabriel', 'Jeryanne', 'Sarita']

server.get('/users', (req, res) => {
  return res.json({ users })
})

server.get('/users/:id', checkUserExistsInArray, (req, res) => {
  return res.json(req.user)
})

server.post('/users', checkUserFieldExists, (req, res) => {
  const { name } = req.body

  users.push(name)

  return res.json({ users })
})

server.put('/users/:id', checkUserExistsInArray, checkUserFieldExists, (req, res) => {
  const { id } = req.params
  const { name } = req.body

  users[id] = name

  return res.json({ users })
})

server.delete('/users/:id', checkUserExistsInArray, (req, res) => {
  const { id } = req.params

  users.splice(id, 1)

  return res.send()
})

function checkUserFieldExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).send({ error: '"name" not found on request body' })
  }

  return next()
}

function checkUserExistsInArray(req, res, next) {
  const user = users[req.params.id]

  if (!user) {
    return res.status(404).send({ error: 'User not found on array' })
  }

  req.user = user

  return next()
}

server.listen(3333)
