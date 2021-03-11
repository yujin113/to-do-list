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
    List.aggregate(
      [
        { $match: { category: req.body.category } },
        { $project: { totalCount: { $size: "$content" } } },
      ],
      (err, size) => {
        res.status(200).json({
          success: true,
          list,
          listCount: size[0].totalCount,
          //count: list[0].content.length,
        });
      }
    );
    // listCount는 writer, category, date로 찾은 리스트의 개수
  });
});

module.exports = router;
