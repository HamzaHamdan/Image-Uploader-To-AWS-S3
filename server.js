const express = require('express');
const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const app = express();

if (process.env.AWS_ACCESS_ID) {

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY,
        region: 'us-east-2'
    });

    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: 'wheels-bucket',
            acl: 'bucket-owner-full-control',
            key: function (req, file, cb) {
                cb(null, Date.now().toString())
            }
        })
    });

} else {



}



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/upload', upload.array('fileUploader', 5), function (req, res, next) {

    let imagesArray = [];

    req.files.forEach((image) => {
        imagesArray.push(image.location);
    })

    res.send(imagesArray);

});

app.get('/view/:id', function (req, res, next) {

    if (process.env.AWS_ENV_VAR) {

        const s3bucket = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_ID,
            secretAccessKey: process.env.AWS_ACCESS_KEY,
            region: 'us-east-2',
            Bucket: 'wheels-bucket'
        });

        const params = {
            Bucket: 'wheels-bucket',
            Key: req.params.id
        }

        s3bucket.getObject(params, function (err, data) {
            if (err) throw err;
            const attachment = data.Body.toString('base64');
            res.send(`<img src='data:image/png;base64, ${attachment}'>`);
        })

    } else {



    }

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log('instance started on http://localhost:3000');
})