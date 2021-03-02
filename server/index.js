const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser"); // client에서 보낸 정보를 server에서 분석해서 가져오는 역할
const config = require("./config/key");
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");

// database 연결
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hi"));

// 회원가입 route
app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err }); // 에러 발생 시 client에게 json 형식으로 에러 있다고 전달
    return res.status(200).json({ success: true }); // 저장 성공 시 client에게 json 형식으로 정보 전달
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); // port 4000번 넣어서 이 앱을 실행하는 것
