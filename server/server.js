const jwt = require('express-jwt');
const express = require('express');

const { BattleMaster } = require('./models/battleMaster');
const db = require('./db');
const config = require('./config.json');

const app = express()
const port = 80

app.get('/api/clans', (req, res) => {
    db.queryAllClans().then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    });
});

app.get('/api/members', (req, res) => {
    db.queryAllMembers(req.query).then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    });
});

app.get('/api/daos', (req, res) => {
    db.queryAllDaos(req.query).then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    });
});

app.get('/api/boss', (req, res) => {
    const battleMaster = new BattleMaster(req.query.gid);
    battleMaster.getChallengeProgress(1, new Date()).then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(404);
    });
});

app.get('/api/login', jwt({ secret: config.secret}), (req, res) => {
    if (req.user.uid) {
        res.send(req.user);
    } else {
        res.sendStatus(401);
    }
})

app.use(express.static('client/dist'));

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
