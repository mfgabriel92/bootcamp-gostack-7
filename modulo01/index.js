const express = require('express')
const server = express()

server.use(express.json())

const users = ['Gabriel', 'Jeryanne', 'Sarita']

server.get('/users', (req, res) => {
  return res.json({ users })
})

server.get('/users/:id', (req, res) => {
  const { id } = req.params

  return res.json(users[id])
})

server.post('/users', (req, res) => {
  const { name } = req.body

  users.push(name)

  return res.json({ users })
})

server.put('/users/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  users[id] = name

  return res.json({ users })
})

server.delete('/users/:id', (req, res) => {
  const { id } = req.params

  users.splice(id, 1)

  return res.send()
})

server.listen(3333)
