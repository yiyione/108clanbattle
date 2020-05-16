const db = require('./db');
/*const http = require('http');
const path = require('path');
const fs = require('fs').promises;*/

const express = require('express');
const app = express()
const port = 80

app.get('/api', (req, res) => {
    db.queryAllClan().then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    });
});

app.use(express.static('client/dist'));

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
