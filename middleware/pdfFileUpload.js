const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/pdf");
  },
  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    const uniqueName =
      file.originalname
        .replace(extName, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const pdfUpload = multer({
  storage,
  dest: (req, file, cb) => {
    cb(null, "public/uploads/pdf");
  },
  limits: { fileSize: 3500000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }

    return cb("The uploaded file, isn't compatible :( we're sorry");
  },
});

module.exports = pdfUpload;
