const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = '1234senha'
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('1234senha', hashedPassword)
    console.log(isMatch)
    const isMatch2 = await bcrypt.compare('1234senhe', hashedPassword)
    console.log(isMatch2)
}   

myFunction()