// Object property shortland
const name = 'Jon'
const userAge = '22'

const user = {
    name: name,
    userAge: userAge
}
console.log(user)

const user2 = {
   name,
   userAge
}
console.log(user2)

// Object destructuring
const product = {
    label: 'Red notecook',
    price: 3,
    stock: 2,
    salePrice: undefined
}

console.log(product.label)

const { label } = product
console.log(label)

const { label:newName } = product
console.log(newName)

const { stock, rating=5 } = product
console.log(stock, rating)

// Function object destructuring
const things = {
    bag: 'strange',
    shoes: 'small',
    hat: 'big',
    money: undefined
}

const transaction = (name, { bag }) => {
    console.log(name + ' got a ' + bag + ' bag!')
}

transaction('Ana', things)