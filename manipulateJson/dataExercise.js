// Data exercise
// Read from a file, change it and then save it in another file
const fs = require('fs')

const dataBuffer = fs.readFileSync('data.exercise.json')
const dataObject = JSON.parse(dataBuffer)
dataObject.name = 'MarcoSants'
fs.writeFileSync('data.answer.json', JSON.stringify(dataObject))
