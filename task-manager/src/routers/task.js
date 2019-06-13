const express = require('express')
const Task = require('../models/task')
const auth = require('./../middlewares/auth')

const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        //const tasks = await Task.find({ owner: req.user._id })
        await req.user.populate('tasks').execPopulate()
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
