// Connecting to mongodb - Creating a CRUD
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017' //use the ip, don't use localhost
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) 
        return console.log('Unable to connect to database') 
    console.log('Connected to database...') 

    // Mongodb operators
    const db = client.db(databaseName)
    db.collection('users').updateOne({ _id: new ObjectID('IDString') }, { $set: { name: 'Antonio' } })
    .then(result => { 
        console.log(result) 
    })
    .catch(error => { 
        console.log(error) 
    })
})