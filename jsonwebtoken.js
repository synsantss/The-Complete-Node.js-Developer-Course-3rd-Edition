const jwt = require('jsonwebtoken')

const myFunction = async () => {
    // Creating a token (what the token will contains, a secret used to encrypt, options)
    const token = jwt.sign({ _id: 'idUnique' }, 'thisismynewcourse', { expiresIn: '7 days' })
    console.log(token)

    // Verifying a token (token, secret used to encrypt)
    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

myFunction()