const human = {
    name: 'Marco'
}

console.log('1:', JSON.stringify(human))

const human2 = {
    name: 'Marco'
}

human2.toJSON = function () {
    console.log('2:', this)
    return {}
}

console.log('3:', JSON.stringify(human2))

