const mongoose = require("mongoose"); // 모듈 가져오기
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema); // 스키마와 mongoDB 연결
module.exports = { Comment };
