var { google } = require('googleapis');
const googleServiceAccountKey = require('./client-secret.json') // see docs on how to generate a service account
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

const googleJWTClient = new google.auth.JWT(
    googleServiceAccountKey.client_email,
    null,
    googleServiceAccountKey.private_key,
    ['https://www.googleapis.com/auth/cloud-platform'],
    null
);

const getAccessToken = () => {
    return new Promise((resolve, reject) => {
        googleJWTClient.authorize((error, access_token) => {
            if (error) {
                reject(error)
            }
            resolve(access_token)
        })
    })
}

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.get('/getAccessToken', (req, res) => {
    getAccessToken()
        .then(data => {
            res.send(data)
        });
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))



