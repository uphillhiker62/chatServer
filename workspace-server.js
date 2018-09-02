const net = require('net');
const fs = require('fs');
const chatsLog = __dirname + '/chatsLog.txt';

let count = 0;
let listOfUsers = [];

let server = net.createServer(client => {

    client.write('Welcome to this awesome chat group');
    count++
    client.userId = count;
    client.setEncoding('utf8');
    listOfUsers.push(client);

    write(`User${client.userId} has joined the chat`);

    client.on('data', data => {
        write(`User${client.userId}: ${data}`);
    });

    client.on('close', () => {
        write(`User${client.userId} has left the chat`);
        listOfUsers.splice((client.userId -1), 1);
    });
    
    function write(message) {
        listOfUsers.forEach((user) => {
            if (user !== client) {
                console.log(message);
                user.write(message);
                fs.appendFile(chatsLog, message + '\n', (err) => {
                    if(err) {
                        console.log(err);
                    }
                });
            }
            if(listOfUsers.length === 1) {
                console.log(message);
            }
        });
    }
}).listen(5000);

console.log('Listening on port 5000');
