const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      // 1st param for the callback is an error
      // Name of the field on the original request: file.fieldname
      // Original file name: file.originalName
      // File size: file.size
      // etc.

      // Original way to generate this name was:
      const ext = path.extname(file.originalname);
      // const name = path.basename(file.originalname, ext)
      // callback(null, `${name}-${Date.now()}${ext}`)
      callback(
        null,
        file.originalname
          .replace(/[^\w\s]/gi, '') // Remove all special characters
          .replace(ext, '-' + Date.now() + ext),
      );
    },
  }),
};
