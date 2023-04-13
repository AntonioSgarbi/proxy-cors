const express = require('express');
const cors = require('cors')
const {response} = require("express");
//cors for own server connected with own
const app = express();

const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is ok')
});

app.put('/', (req, res) => {
    const headers = {
        'Content-Type': req.header('Content-Type'),
        'Authorization': req.headers.authorization

    }
    const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: req.body
    };

    fetch(req.query.url, requestOptions).then((response) => res.send(response))
})


app.listen(port, () => {
    console.log('Port is Ok');
})