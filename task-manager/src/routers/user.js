const express = require('express')
const User = require('../models/user')

const router = new express.Router()
const auth = require('./../middlewares/auth')

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(500).send(error)
    } 
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
                
        res.send()
    } catch (error) {
        res.status(500).send()
    } 
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
                
        res.send()
    } catch (error) {
        res.status(500).send()
    } 
})

router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    } 
})

router.get('/users/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) res.status(404).send()
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/users/me', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every((element) => allowedUpdates.includes(element))
        if (!isValidOperation) res.status(400).send({ error: 'Invalid updates' })
        updates.forEach((element) => req.user[element] = req.body[element])
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
