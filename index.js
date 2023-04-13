const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Running on port: ${port}`)
});

app.put('/', (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
    }

    const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(req.body)
    };

    fetch(req.query.url, requestOptions).then((response) => {
        res.send(JSON.stringify(response));
    })
})

app.listen(port, () => {
    console.log(`Running on port: ${port}`);
})