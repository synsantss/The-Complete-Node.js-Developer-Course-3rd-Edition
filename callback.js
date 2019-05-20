
const helloWorld = (name, callback) => {
        setTimeout(() => {
            callback(name)
        }, 2000)
}

helloWorld('Andy', (name) => {
    console.log('by: '+ name + '.')
})

console.log('Hello world!')
