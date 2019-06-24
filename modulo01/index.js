const express = require('express')
const server = express()

server.get('/users/:id', (req, res) => {
  const { name } = req.query
  const { id } = req.params

  return res.json({
    message: `Hello, ${name}`,
    id
  })
})

server.listen(3333)
