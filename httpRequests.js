const request = require('request')

const url = 'https://jsonplaceholder.typicode.com/todos/1'

request({ url: url }, (error, response) => {
    const dataObject = JSON.parse(response.body)
    console.log('Hand: ', dataObject.title)
})

request({ url: url, json: true }, (error, response) => {
    console.log('Built-in: ', response.body.title)
})