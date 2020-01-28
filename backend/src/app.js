const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data')

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.json())
app.use(fileUpload());

app.post('/authenticate', async (req, res, next) => {
    try {
        let { data } = await axios.post(`https://login.sypht.com/oauth/token`, {
            client_id: req.body.clientId,
            client_secret: req.body.clientSecret,
            audience: 'https://api.sypht.com',
            grant_type: 'client_credentials'
        }, {timeout: 10000});

        res.send(data);
    }
    catch (error) {
        res.statusCode = error.response.status;
        var resultError = new Error(error.response.statusCode);
        next(resultError);
    }
});

app.post('/fileUpload', async (req, res) => {
    var file = req.files.fileToUpload;

    var filePath = path.join(__dirname, '../uploads', file.name);
    file.mv(filePath, (err) => {
        if (err) throw err;
    })

    try {
        var fileName = file.name;
        var fileData = fs.createReadStream(filePath);
        //var fileData = req.files.fileToUpload.data;
        let formData = new FormData();
        formData.append('fileToUpload', fileData, {fileName});
        formData.append('fieldSets', JSON.stringify(['sypht.invoice', 'sypht.document']));

        let {data} = await axios.post(`https://api.sypht.com/fileupload`, formData, {
            headers:{
                'Authorization':`${req.headers.authorization}`,
                'Content-Type': formData.getHeaders()['content-type']
            }
        },
        {
            timeout: 30000
        });

        res.send(data);
    }
    catch(error){
        throw error;
    }
});

app.get('/results/:fileId', async (req, res) => {
    try {
        let { data } = await axios.get(`https://api.sypht.com/result/final/${req.params.fileId}`, {
            headers: {
                'Authorization': `${req.headers.authorization}`
            }
        },{timeout: 10000});
        res.send(data);
    }
    catch (error) {
        console.log(error);
    }
});




app.listen(3001, () => {
    console.log('Server is up on port 3001');
});

