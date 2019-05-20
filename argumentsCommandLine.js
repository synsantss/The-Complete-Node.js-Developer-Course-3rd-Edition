// Using process global object
//console.log(process.argv[2]) //node app.js arguments_01
//console.log(process.argv[3]) //node app.js arguments_01 arguments_02

// Using yargs 
const yargs = require('yargs')

yargs.version('1.1.0')

// node argumentsCommandLine.js see
yargs.command({ 
    command: 'see',
    describe: 'See a new note',
    handler() { return console.log('Seeing a note!') }
})

// node argumentsCommandLine.js add --title="My title" --body="My body"
yargs.command({ 
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOptions: true,
            type: 'string'
        } ,
        body: {
            describe: 'Note body',
            demandOptions: true,
            type: 'string'
        }  
    },
    handler(argv) {
        debugger
        console.log('Title: ' + argv.title + '\n');
        console.log('Body: ' + argv.body);
    }
})

yargs.parse()
