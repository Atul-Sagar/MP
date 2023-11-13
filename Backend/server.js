const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express();
const port = 3030

const uploadDir = './uploads'
if(!fs.existsSync(uploadDir))
    fs.mkdirSync(uploadDir)


app.post('/upload', (req, res) => {
    console.log("req", req.body);
    res.status(200).json({
        result : 'Hello'
    })
});


app.listen(port, () =>{
    console.log("server running on port : ", port);
})