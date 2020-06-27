const jwt = require('express-jwt');
const express = require('express');

const { BattleMaster } = require('./models/battleMaster');
const { Member } = require('./models/member');
const { Clan } = require('./models/clan');
const { Dao } = require('./models/dao');

const db = require('./db');
const config = require('./config.json');

const app = express()
const port = 80

app.get('/api/login', jwt({ secret: config.secret}), async (req, res) => {
    try {
        const member = new Member();
        const users = await member.get({
            uid: req.user.uid, alt: req.query.gid
        });
        if (users && users.length > 0) {
            res.send(users[0]);
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        res.sendStatus(403);
    }
})

app.get('/api/clans', async (req, res) => {
    try {
        const clan = new Clan();
        res.send(await clan.get(req.query));
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.get('/api/members', async (req, res) => {
    try {
        const member = new Member();
        res.send(await member.get({ gid: req.query.gid }));
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.get('/api/daos', async (req, res) => {
    try {
        const dao = new Dao();
        res.send(await dao.get(req.query));
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

app.get('/api/boss', async (req, res) => {
    try {
        const battleMaster = new BattleMaster(req.query.gid);
        res.send(await battleMaster.getChallengeProgress(1, new Date()));
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    };
});

app.use(express.static('client/dist'));

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
