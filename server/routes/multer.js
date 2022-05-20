var express = require('express');
var router = express.Router();
const multer = require('multer');
//const fs = require('fs');
var path = require('path');
const DailyMeetingService = require('../services/dailyMeetingsService')
const PathFileService = require('../services/pathFileService')

const MIME_TYPES = {
    'audio/mp3': 'ogg',
    'video/webm': 'ogg',
};

// Path server directory
var appDir = path.dirname(__dirname);
var filename;

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        //const name = file.originalname.split(' ').join('_');
        var name;
        const extension = MIME_TYPES[file.mimetype];
        console.log("type : " + file.mimetype);
        
        if(file.mimetype === 'audio/mp3'){
            name = 'audio';
        }else if(file.mimetype === 'video/webm'){
            name = 'video';
        }
        filename = file.originalname + "-" + name + "-" + Date.now() + '.' + extension;
        callback(null, filename);
        console.table(file);
        
    }
});

const upload = multer({ storage: storage }).single('audio');

router.post('/', upload, (req, res) => {

    const filePath = appDir + "/uploads/" + filename
    console.log("filePath : " + filePath);
    console.log("Filename : " + filename);
    //console.log(req.body.meetingId);

    DailyMeetingService.updateMeeting(req.body.meetingId, filePath)
    PathFileService.createPathFile(req.body.meetingId, filePath)

    res.status(200).send();
});

router.get('/:Id', async function(req, res){

    const meetingId = req.params.Id;
    //console.log(meetingId);

    const filePath = await DailyMeetingService.getFilePath(meetingId)

    const filePaths = await PathFileService.getFilePath(meetingId)
    console.table(filePaths);

    console.log(filePath.dataValues.filePath);
    res.sendFile(filePath.dataValues.filePath);
    console.log("FILE : " + filePath.dataValues.filePath);
    //res.status(200).send("filePath : " + filePath.dataValues.filePath);

    // let files = fs.readdirSync(path.join(__dirname, 'uploads'));
    // files = files.filter((file) => {
    //     // check that the files are audio files
    //     const fileNameArr = file.split('.');
    //     return fileNameArr[fileNameArr.length - 1] === 'ogg';
    // }).map((file) => `/${file}`);
    // return res.json({ success: true, files });
});



module.exports = router;

// const filePath = new Promise((resolve, reject) => {
//     console.log(meetingId);
//     DailyMeetingService.getFilePath(meetingId)
// // let files = fs.readdirSync(path.join(__dirname, 'uploads'));
// // files = files.filter((file) => {
// //     // check that the files are audio files
// //     const fileNameArr = file.split('.');
// //     return fileNameArr[fileNameArr.length - 1] === 'ogg';
// // }).map((file) => `/${file}`);
// // return res.json({ success: true, files });
// }).then(function(res){
//     console.log(res);
//     resolve(res);
//     res.status(200).send("filePath : " + filePath);
// }).catch(function (error) {
//     // console.log("data: " + error.response.data);
//     // console.log("status: " + error.response.status);
//     reject(error.response);
// })
