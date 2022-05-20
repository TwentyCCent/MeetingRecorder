const multer = require('multer');

class MulterController {

  save(request, response) {
    const file = request.body.file;
    try {
      const MIME_TYPES = {
        'audio/mp3': 'ogg',
        'video/x-matroska': 'mkv',
      };

      var filename;

      const storage = multer.diskStorage({
        destination: (req, file, callback) => {
          callback(null, 'uploads/');
        },
        filename: (req, file, callback) => {
          //const name = file.originalname.split(' ').join('_');
          const name = 'recording';
          const extension = MIME_TYPES[file.mimetype];
          console.log("type : " + file.mimetype);
          filename = Date.now() + "-" + name + '.' + extension;
          callback(null, filename);
        }
      });

      response.status(200).send();

    } catch (e) {
      console.log(e);
      response.status(403).send("Problem to save file");
    }
  }

}

module.exports = new MulterController();