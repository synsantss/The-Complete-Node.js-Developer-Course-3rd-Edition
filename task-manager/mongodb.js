// Connecting to mongodb - Creating a CRUD
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017' //use the ip, don't use localhost
const databaseName = 'task-manager'
const id = new ObjectID()
console.log(id)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) 
        return console.log('Unable to connect to database') 
    console.log('Connected to database...') 

    const db = client.db(databaseName)

    // INSERT ONE USER
    // db.collection('users').insertOne({
    //     name: 'Marco', age: 23
    // }, (error, result) => {
    //     if (error) return console.log('Unable to insert user')
    //     console.log(result.ops)
    // })

    // INSERT MANY USER
    // db.collection('users').insertMany([{
    //     name: 'Arya', age: 23
    // },{
    //     name: 'Enny', age: 17
    // }], (error, result) => {
    //     if (error) return console.log('Unable to insert users')
    //     console.log(result.ops)
    // })

    // FIND ONE USER
    // db.collection('users').findOne({ name: 'Marco'}, (error, document) => {
    //     if (error) return console.log('Unable to fetch')  
    //     console.log(document)      
    // })

    // db.collection('users').findOne({ _id: new ObjectID('IDString') }, (error, document) => {
    //     if (error) return console.log('Unable to fetch')  
    //     console.log(document)      
    // })

    // FIND MANY USER (Receives a cursor and  don't have a callback)
    // db.collection('users').find({ age: 23}).toArray((error, documents) => {
    //     if (error) return console.log('Unable to fetch')  
    //     console.log(documents)      
    // })
})