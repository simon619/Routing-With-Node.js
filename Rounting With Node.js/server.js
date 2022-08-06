const fs = require('fs'); // For file reading and sending
const http = require('http'); // To create a server
const _ = require('lodash'); // Great function

const server = http.createServer((req, res) => {
    console.log("url: " + req.url, "method: " + req.method);
    const greeting = _.once(() => {
        console.log("Welcome To The Server");
    });

    greeting();
    
    res.setHeader("Content-Type", "text/html");

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/simon':
            res.setHeader('Location', '/about');
            res.statusCode = 301;
            res.end()
            break;
        default:
            path += 'error.html';
            res.statusCode = 404;
            break;
    }

    if (fs.existsSync(path)) {
        fs.readFile(path, (err, data) => {
            if(err) {
                console.log("Error: " + err);
            }
            else {
                // res.write(data);
                res.end(data); // We are sending only one page
                console.log('File Has Been Sent');
            }
        });
    }
    else {
        console.log("File Doesn\'t Exists");
    }
});

server.listen(3000, 'localhost', () => {
    console.log('Server is listening'); // Set port number to 3000 in localhost
});