const db = require('./db');
const { BattleMaster } = require('./models/battleMaster');

const express = require('express');
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

app.use(express.static('client/dist'));

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
