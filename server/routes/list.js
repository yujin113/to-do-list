const express = require("express");
const router = express.Router();
const { List } = require("../models/List");

// list 저장 router
// client에서 post 요청할 때 writer 정보(User)를 함께 보내줘야 함
router.post("/saveList", (req, res) => {
  const list = new List(req.body);
  List.findOneAndUpdate(
    { writer: req.body.writer, category: req.body.category },
    { $push: { content: req.body.content } },
    (err, info) => {
      if (!info) {
        list.save((err, listInfo) => {
          if (err) return res.json({ success: false, err });
        });
        return res.json({ success: true, list });
      }
      return res.status(200).json({ success: true, info });
    }
  );
});

// list를 database에서 불러와 client에게 전달
router.get("/getList", (req, res) => {
  // client에서 writer, category, date 정보 전달해줘야 함
  List.findOne({
    writer: req.body.writer,
    category: req.body.category,
    content: { $elemMatch: { date: req.body.date } },
  }).exec((err, list) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      success: true,
      list,
      count: list.content.length,
    });
    // listCount는 writer, category, date로 찾은 content 안의 배열 개수
  });
});

// 오늘의 달성률
router.get("/getSuccess", (req, res) => {
  let total = 0;
  let done = 0;
  List.find(
    {
      writer: req.body.writer,
      // content: { $elemMatch: { done: true } },
    },
    (err, list) => {
      for (i = 0; i < list.length; i++) {
        total += list[i].content.length;
      }
      List.find(
        {
          writer: req.body.writer,
          content: { $elemMatch: { done: true } },
        },
        (err, list) => {
          if (err) res.status(400).send(err);
          for (i = 0; i < list.length; i++) {
            for (j = 0; j < list[i].content.length; j++) {
              if (list[i].content[j].done === true) done += 1;
            }
          }
          res.status(200).json({
            success: true,
            total,
            done,
          });
        }
      );
    }
  );
});

module.exports = router;
