const { hostname } = require('os');
const https = require('https');
const fs = require('fs');
const express = require('express')

const STACK_NAME = process.env.STACK_NAME || "Unknown Stack";
const httpsPort = 8443;
const httpsKey = '../keys/key.pem'
const httpsCert = '../keys/cert.pem'

const app = express()

if (fs.existsSync(httpsKey) && fs.existsSync(httpsCert)) {
    console.log('Starting https server')
    const message = `Hello HTTPS World from ${hostname()} in ${STACK_NAME}\n`;
    const options = { key: fs.readFileSync(httpsKey), cert: fs.readFileSync(httpsCert) };
    const server = https.createServer(options, (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(message);
    });
    // app.listen(httpsPort, hostname, () => {
    //     console.log(`Server running at http://${hostname()}:${httpsPort}/`);
    // });

    // app.get("/", (req, res) => {
    //     res.statusCode = 200;
    //     res.send("<h1>Hello World!</h1>");
    // });


} else {
    console.log('Could not find certificate/key')
}
