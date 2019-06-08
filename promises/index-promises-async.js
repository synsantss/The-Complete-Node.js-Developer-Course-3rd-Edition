const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save() 
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    } 
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    } 
})

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) res.status(404).send()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.patch('/users/:id', async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every((element) => allowedUpdates.includes(element))
        if (!isValidOperation) res.status(400).send({ error: 'Invalid updates' })
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) res.status(404).send()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) res.status(404).send()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then((task) => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    }) 
})

app.get('/tasks', (req, res) => {
    Task.find({})
    .then((tasks) => {
        res.status(200).send(tasks)
    }).catch((error) => {
        res.status(500).send(error)
    }) 
})

app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id)
    .then((task) => {
        if (!task) res.status(404).send()
        res.status(200).send(task)
    }).catch((error) => {
        res.status(500).send(error)
    }) 
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})