const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.json())
app.use(fileUpload());

app.post('/authenticate', async (req, res) => {
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
        console.log(error)
    }
});

app.post('/fileUpload', async (req, res) => {
    // console.log(req.files.fileToUpload.name);
    // console.log(req.files.fileToUpload.data);

    try{
        var fileName = req.files.fileToUpload.name;
        var fileData = req.files.fileToUpload.data;
        let formData = new FormData();
        formData.append('fileToUpload', fileData, {fileName});
        formData.append('fieldSets', JSON.stringify(['sypht.invoice', 'sypht.document']));

        let {data} = await axios.post(`https://api.sypht.com/fileupload`, formData, {
            headers:{
                'Authorization':`Bearer ${req.headers.authorization}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(data);

        res.send(data);
    }catch(error){
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

