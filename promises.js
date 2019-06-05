const doWorkPromise = new Promise((resolve, reject) => {
    resolve('Things went well')
    //reject('Things went wrong')    
})

doWorkPromise.then(result => {
    console.log('Success!', result)
}).catch(error => {
    console.log('Error!', error)
})