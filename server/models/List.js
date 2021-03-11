const mongoose = require("mongoose"); // 모듈 가져오기
const Schema = mongoose.Schema;

const listSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    required: true,
  },
  content: [
    new mongoose.Schema(
      {
        toDo: String,
        date: { type: String, required: true },
        private: { type: Boolean, default: true },
        done: { type: Boolean, default: false },
      },
      { _id: false }
    ),
  ],
});

const List = mongoose.model("List", listSchema); // 스키마와 mongoDB 연결
module.exports = { List };
