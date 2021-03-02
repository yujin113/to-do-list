const mongoose = require("mongoose"); // 모듈 가져오기

const userSchema = mongoose.Schema({
  nickName: {
    type: String,
    maxlength: 20,
    required: true, // 필수값
    unique: true, // 고유한 값이어야 함
  },
  email: {
    type: String,
    trim: true, // 공백 없애줌
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  image: String,
  token: {
    // 유효성 관리
    type: String,
  },
  tokenExp: {
    // 토큰 사용할 수 있는 기간
    type: Number,
  },
});

const User = mongoose.model("User", userSchema); // 스키마와 mongoDB 연결
module.exports = { User };
