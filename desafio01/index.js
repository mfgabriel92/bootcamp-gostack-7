const express = require('express')
const server = express()

let noOfRequests = 0
const projects = [{ id: 1, title: 'Lorem ipsum', tasks: [] }]

server.use(express.json())
server.use((req, res, next) => countNumberOfRequests(req, res, next))

server.get('/projects', (req, res) => {
  return res.json({ projects })
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body

  projects.push({ id, title, tasks: [] })

  return res.status(201).send({ projects })
})

server.put('/projects/:id', checkProjectExistsInArray, (req, res) => {
  const { title } = req.body

  req.project.title = title

  return res.json(req.project)
})

server.post('/projects/:id/tasks', checkProjectExistsInArray, (req, res) => {
  const { title } = req.body

  req.project.tasks.push(title)

  return res.json(req.project)
})

server.delete('/projects/:id', checkProjectExistsInArray, (req, res) => {
  const index = projects.findIndex(o => o.id == req.project.id)

  projects.splice(index, 1)

  return res.send()
})

function checkProjectExistsInArray(req, res, next) {
  const project = projects.find(o => o.id == req.params.id)

  if (!project) {
    return res.status(404).send({ error: 'Project not found' })
  }

  req.project = project

  return next()
}

function countNumberOfRequests(req, res, next) {
  noOfRequests++
  console.log(noOfRequests)
  return next()
}

server.listen(3333)
