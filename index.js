// server.js

var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var ip = require('ip');
// var nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'chris.sannar.dev@gmail.com',
//         pass: 'Ste1nway!'
//     }
// });

var app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(bodyParser.json());

var addr = process.env.IP || ip.address() || "localhost";
var port = process.env.PORT || 8080;
app.listen(port);

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/connect', (req, res) => {
    setTimeout(function() {
        res.send(true);
    }, 2000)
});

// app.post('/email', function(req, res) {
//     try {
//         const mailOptions = {
//             from: req.body.email,
//             to: 'chris.sannar.dev@gmail.com',
//             subject: 'Chrissannar.com Contact Request',
//             text: `Recruiter Message

// From: ${ req.body.name }
// Email: ${ req.body.email }

// ${ req.body.message || ""}
//             `
//         }

//         transporter.sendMail(mailOptions)
//             .then(function() {
//                 console.log('Message Sent');
//                 res.send('DONE');
//             });

//         // res.send('DONE');

//     } catch (e) {
//         res.send(e);
//     }
// })

console.log('Server started on ' + addr + ':' + port);