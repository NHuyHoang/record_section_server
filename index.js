var { google } = require('googleapis');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const getAccessToken = (body) => {
    const googleJWTClient = new google.auth.JWT(
        body.client_email,
        null,
        body.private_key,
        ['https://www.googleapis.com/auth/cloud-platform'],
        null
    );
    return new Promise((resolve, reject) => {
        googleJWTClient.authorize((error, access_token) => {
            if (error) {
                reject(error)
            }
            resolve(access_token)
        })
    })
}

router.get('/access-token', (req, res) => {
    res.send('Welcome')
}).post('/access-token', (req, res) => {
    if (!req.body) res.send('invalid request');
    else {
        getAccessToken(req.body)
            .then(data => {
                res.send(data)
            });
    }
})


app.use('', router)
app.listen(PORT, () => console.log(`Listening on ${PORT}`))



