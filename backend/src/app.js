const express = require('express');
const axios = require('axios');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.post('/authenticate', async (req, res) => {
    try {
        let { data } = await axios.post(`https://login.sypht.com/oauth/token`, {
            client_id: '',
            client_secret: '',
            audience: 'https://api.sypht.com',
            grant_type: 'client_credentials'
        },
            {
                timeout: 10000
            });

        res.send(data);
    }
    catch (error) {
        console.log(error)
    }
});

app.get('/results/:fileId', async (req, res) => {

    try {
        let { data } = await axios.get(`https://api.sypht.com/result/final/${req.params.fileId}`, {
            headers: {
                'Authorization': `${req.headers.authorization}`
            }
        },
            {
                timeout: 10000
            });
        res.send(data);
    }
    catch (error) {
        console.log(error);
    }
});




app.listen(3001, () => {
    console.log('Server is up on port 3001');
});

