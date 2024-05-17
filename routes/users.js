
const { default: mongoose } = require("mongoose");
const plm = require("passport-local-mongoose");
// const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  dp: {
    type: String,
  },
  fullname: {
    type:String,
    required:true
  },
  age: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(plm);
// create an user model
const User = mongoose.model("User", userSchema);
// console.log(User)
module.exports = User;
