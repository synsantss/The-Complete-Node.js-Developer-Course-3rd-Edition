const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save() 
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    } 
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    } 
})

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) res.status(404).send()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/users/:id', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) res.status(404).send()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
