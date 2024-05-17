const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
    post_img:{
        type:String
    },
    post_caption: {
        type: String
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Array,
        default: []
    },
});
const post = mongoose.model('post', postSchema);
module.exports = post;