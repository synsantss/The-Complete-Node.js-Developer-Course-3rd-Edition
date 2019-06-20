const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer({
  des: "uploadsImages", // Destination folder
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    //if (!file.originalname.endsWith(".pdf")) {
    if (file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Error in upload format"));
    }

    cb(undefined, true);
    //cb(undefined, false);
  }
});

// On postman: Body->form-data->KEY equals FIELD that equals a file
app.post("/upload", upload.single("FIELD"), async (req, res) => {
  res.send(0);
});
