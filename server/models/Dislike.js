const mongoose = require("mongoose"); // 모듈 가져오기
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const Dislike = mongoose.model("Dislike", dislikeSchema); // 스키마와 mongoDB 연결
module.exports = { Dislike };
