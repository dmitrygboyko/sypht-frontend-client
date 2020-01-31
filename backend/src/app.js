const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.pdf')
    }
})

var upload = multer({ storage: storage })

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.json())


const LOGIN_URL = 'https://login.sypht.com';
const API_URL = 'https://api.sypht.com';

app.post('/authenticate', async (req, res, next) => {
    try {
        let { data } = await axios.post(`${LOGIN_URL}/oauth/token`, {
            client_id: req.body.clientId,
            client_secret: req.body.clientSecret,
            audience: API_URL,
            grant_type: 'client_credentials'
        }, { timeout: 10000 });

        res.send(data);
    }
    catch (error) {
        handleError(error, res, next);
    }
});

app.post('/fileUpload', upload.single('fileToUpload'), async (req, res, next) => {
    var filePath = req.file.path;
    var fileName = path.basename(filePath);

    try {
        var fileData = fs.createReadStream(filePath);
        let formData = new FormData();
        formData.append('fileToUpload', fileData, { fileName });
        formData.append('fieldSets', JSON.stringify(['sypht.invoice', 'sypht.document']));

        let { data } = await axios.post(`${API_URL}/fileupload`, formData, {
            headers: {
                'Authorization': `${req.headers.authorization}`,
                'Content-Type': formData.getHeaders()['content-type']
            }
        },
            {
                timeout: 30000
            });

        res.send(data);
    }
    catch (error) {
        handleError(error, res, next);
    }
    finally {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
});

app.get('/results/:fileId', async (req, res, next) => {
    try {
        let { data } = await axios.get(`${API_URL}/result/final/${req.params.fileId}`, {
            headers: {
                'Authorization': `${req.headers.authorization}`
            }
        }, { timeout: 10000 });
        res.send(data);
    }
    catch (error) {
        handleError(error, res, next);
    }
});

const handleError = (error, res, next) => {
    if (error.response) {
        res.statusCode = error.response.status;
        error = new Error(error.message);
    }

    next(error);
}

app.listen(3001, () => {
    console.log('Server is up on port 3001');
});

