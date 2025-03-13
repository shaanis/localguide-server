require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const hotelRouter = require('./routes/hotelRouter');
const eventRouter = require('./routes/eventRouter');
require('./database/dbConnection');

const lgServer = express();

lgServer.use(cors());
lgServer.use(express.json());
lgServer.use(router);
lgServer.use(hotelRouter);
lgServer.use(eventRouter);
lgServer.use('/uploads', express.static('./uploads'));

const PORT = process.env.PORT || 3000;

lgServer.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});

lgServer.get('/', (req, res) => {
    res.status(200).send("<h3>pfserver running and waiting for client request</h3>");
});

lgServer.post('/', (req, res) => {
    res.status(200).send('send post request');
});

//  WebSocket Server Setup
// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 });

// let adminSocket = null;

// wss.on('connection', (ws) => {    
//     ws.on('error', console.error);
//     ws.on('message', (message) => {
//         const data = JSON.parse(message);

//         if (data.role === "admin") {
//             if (adminSocket && adminSocket.readyState === WebSocket.OPEN) {
//                 adminSocket.close(); // Close the existing admin connection
//             }
//             adminSocket = ws; // Store the new admin WebSocket
//             console.log("Admin connected");
//         } else if (data.role === "user") {
//             if (adminSocket && adminSocket.readyState === WebSocket.OPEN) {
//                 adminSocket.send(JSON.stringify({ title: "New Booking", message: `A new ticket has been booked by ${data.user}.` }));
//             } else {
//                 console.log("No admin connected to receive notifications.");
//             }
//         }
//     });

//     // ws.on('close', () => {
//     //     console.log("Connection closed");
//     //     if (ws === adminSocket) {
//     //         adminSocket = null; // Clear admin socket if it disconnects
//     //     }
//     // });
// });


console.log("WebSocket server running on ws://localhost:8080");
