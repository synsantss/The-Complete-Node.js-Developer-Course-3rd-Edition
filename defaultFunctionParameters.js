const greeter = (name = 'Person') => {
    console.log('Hello ' + name)
}

greeter('Andrew')
greeter()

const greeter2 = ({ name, age } = {}) => {
    console.log('Hello ' + name + ', ' + age + ' yrs.')
}

greeter2({name: 'Phil', age: 12})
greeter2()