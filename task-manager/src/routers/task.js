const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then((task) => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    }) 
})

router.get('/tasks', (req, res) => {
    Task.find({})
    .then((tasks) => {
        res.status(200).send(tasks)
    }).catch((error) => {
        res.status(500).send(error)
    }) 
})

router.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id)
    .then((task) => {
        if (!task) res.status(404).send()
        res.status(200).send(task)
    }).catch((error) => {
        res.status(500).send(error)
    }) 
})

module.exports = router
