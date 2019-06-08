const doWork = () => {}
console.log('doWork:', doWork())

// Async functions always returns promises
const doWorkAsync = async () => {}
console.log('doWorkAsync:', doWorkAsync())

const anotherFunctionAsync = async () => {
    return 'Marco' 
    //throw new Error('Error!') 
}

anotherFunctionAsync().then((result) => {
    console.log('result:', result)
}).catch((error) => {
    console.log('error:', error)
})

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            if (a < 0 || b < 0)
                reject('Numbers must be non-negative')
            resolve(a + b)            
        }, 2000)
    })
}

const doAdd = async () => {
    const sum = await add(1, 1)
    const sum2 = await add(sum, 1)
    const sum3 = await add(sum2, -1)
    return sum3
}

doAdd().then((result) => {
    console.log('result:', result)
}).catch((error) => {
    console.log('error:', error)
})
