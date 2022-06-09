const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const request = require("request");

app.use(express.json());

app.listen(port, () => {
    console.log(`This is the download server running on port ${port}`)
});

const downloadImage = (uri, filename, callback) => {
    request.head(uri, (err, res, body) => {
        console.log('content-type', res.headers['content-type']);
        console.log('content-length', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

downloadImage("https://flyclipart.com/kansas-city-chiefs-png-transparent-kansas-city-chiefs-images-chiefs-logo-png-622012", "./temp-download-files/chiefs.png", () => {
    console.log('done');
});