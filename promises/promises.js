// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout( () => {
//         resolve('Things went well')
//         //reject('Things went wrong') 
//     }, 2000)   
// })

// doWorkPromise.then(result => {
//     console.log('Success!', result)
// }).catch(error => {
//     console.log('Error!', error)
// })

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            resolve(a + b)
            //reject('Things went wrong') 
        }, 2000)
    })
}

// Promises callback
add(1,2).then(result => {
    add(result,2).then(result2 => {
        console.log('Success!', result2)
    }).catch(error => {
        console.log('Error!', error)
    })
}).catch(error => {
    console.log('Error!', error)
})

// Promises chaining
add(1,2).then(result => {
    return add(result, 2)
}).then(result2 => {
    console.log('Success!', result2)
}).catch(error => {
    console.log('Error!', error)
})