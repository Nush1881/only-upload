const express = require('express');
const multer = require('multer');
const path = require('path');
const helpers = require('./helpers');

const app = express();

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.post('/upload-user-file', (req, res) => {
    
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('user_file');

    upload(req, res, function(err) {
        
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select a file to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        res.send("Your file has been uploaded")
        console.log(req.file.path);
    });
});


app.listen(3000, () => console.log(`Listening on port 3000...`));