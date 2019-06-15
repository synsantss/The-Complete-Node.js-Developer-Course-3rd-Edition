const express = require("express");
const User = require("../models/user");
const multer = require("multer");
const sharp = require("sharp");

const router = new express.Router();
const auth = require("./../middlewares/auth");

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every(element =>
      allowedUpdates.includes(element)
    );
    if (!isValidOperation) res.status(400).send({ error: "Invalid updates" });
    updates.forEach(element => (req.user[element] = req.body[element]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// \.(doc|docx)$ -> regular expression for serach for determined file extensions
const upload = multer({
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
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      req.user.avatar = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();

      await req.user.save();
      res.send();
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) throw new Error();
    res.set("Content-Type", "image/jpg"); // Setting a response header name/value
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
