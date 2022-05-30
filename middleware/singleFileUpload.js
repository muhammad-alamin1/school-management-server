const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
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
    const fileName = `${uniqueName}${extName}`;

    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2000000, // 2M
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb("Only .jpeg, .jpg & .png format file allowed.!");
    }
  },
});

module.exports = upload;
