const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const grant_type = 'password';
let token;

//edit with values ---------------------------------------------

const client_id = 'id';
const client_secret = 'client_secret';
const username = 'username';
const password = 'password';
const salesforceURL = 'salesforceurl'
// example 'https://gft29-dev-ed.develop.my.salesforce.com'

//---------------------------------------------------------------

const URL = `${salesforceURL}/services/oauth2/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&username=${username}&password=${password}`;

async function getToken() {
    const reqParams = {
        method: 'POST'
    }

    await fetch(URL, reqParams)
        .then(res => res.json())
        .then(json => token = json.access_token);
}

app.get('/', (req, res) => {
    res.send(`Running on port: ${port}`)
});

app.put('/', (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(req.body)
    };

    fetch(req.query.url, requestOptions)
        .then(response => {
            if (response.status === 401) {
                getToken().then(() => res.send('Authenticated, req again'));
            }
            else {
                response.json().then((json) => {
                    console.log(json)
                    res.send(json);
                });
            }
        })
})

app.listen(port, () => {
    getToken().then(() => console.log('Authenticated!'));
    console.log(`Running on port: ${port}`);
})