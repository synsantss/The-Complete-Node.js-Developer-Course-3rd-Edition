require('./db/mongoose')
const express = require('express')
const userRoute = require('./routers/user')
const taskRoute = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.send('Get requests are disable!')
    } else {
        next()
    }
})

app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})