var express = require("express");
var router = express.Router();
const userModel = require("./users.js");
const postModel = require("./posts.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "My WebPage" });
});

/* Feed page */
router.get("/feed", (req, res) => {
  res.render("feed");
});



// router.get('/allusers', async function (req, res, next) {
//   let alluser = await userModel
//     .findOne({ _id:  "65ae90e73b044ad5a26aed03" })
//     .populate('posts')
//   res.send(alluser)
// });

// router.get('/createuser', async (req, res) => {
//   let user = await userModel.create({
//     fullname:'Tarun Behera',
//     username: 'tarun',
//     email: 'tarun123@gmail.com',
//     password: "tarun",
//     posts: [],
//     age: 21,
//   })
//   res.send(user);
// })
// router.get('/createpost', async (req, res) => {
//   let post = await postModel.create({
//     content: 'this is my first post',
//     user: "65ae90e73b044ad5a26aed03",
//   })
//   let userInfo = await userModel.findOne({ _id: "65ae90e73b044ad5a26aed03" })
//   userInfo.posts.push(post._id)
//   await userInfo.save()
//   res.send("post created")
// })

module.exports = router;
