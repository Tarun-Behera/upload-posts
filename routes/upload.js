const express = require("express");
const router = express.Router();
const userModel = require("./users.js");
const postModel = require("./posts.js");
const upload = require("./multer.js");

/* uploading file */
router.post("/upload", upload.single("post_img"), async (req, res, next) => {
  if (!req.file) {
    console.error("No file was uploaded");
    req.flash("error", "Select a file to upload!");
    return res.redirect("/profile");
  }
  const user = await userModel.findOne({ username: req.session.passport.user });
  const postData = await postModel.create({
    post_img: req.file.filename,
    post_caption: req.body.post_caption,
    user: user._id,
  });
  user.posts.push(postData._id);
  await user.save();
  res.redirect("/profile");
});

module.exports = router;
