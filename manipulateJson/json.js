const fs = require('fs')

const book = {
    title: "Title",
    author: 'Marco Sants'
}

// JSON object -> JSON string (Not-accesible: bookJSON.title)
const bookJSON = JSON.stringify(book)

// JSON string -> JSON object (Accesible: parsedBook.title)
const parsedBook = JSON.parse(bookJSON)

fs.writeFileSync('json.bookJSON.json', bookJSON) // JSON string
fs.writeFileSync('json.parsedBook.json', parsedBook) // JSON Object

const dataBuffer = fs.readFileSync('json.bookJSON.json')
const dataString = dataBuffer.toString()
const dataObject = JSON.parse(dataString)

console.log('Binary: ', dataBuffer, '\n')
console.log('String: ', dataString, '\n')
console.log('Object: ', dataObject)
