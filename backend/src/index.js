const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const constants = require('./config/constants');
const cors = require('cors');
const GameState = require('./models/game-state');
const ConnectionHandler = require('./logic/connection-handler');
const MainLoop = require('./logic/main-loop');
const Controller = require('./controllers/controller');

const port = 1234;

app.use(cors());

app.use((req, res, next) => {
    const gameState = new GameState();

    req.io = io;
    req.controller = new Controller(gameState);
    req.mainLoop = new MainLoop(gameState, io);
    req.connectionHandler = new ConnectionHandler(gameState, req.controller);
    req.connectionHandler.initialize(io);
    
    req.mainLoop.addCallback(req.controller.handleMainTick.bind(req.controller));

    next();
});

app.use('/', express.static( __dirname + '/static'));

app.get('/constants', (req, res) => {
    res.send(JSON.stringify(constants));
});

http.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
