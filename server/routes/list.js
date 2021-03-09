const express = require("express");
const router = express.Router();
const { List } = require("../models/List");

// list 저장 router
// client에서 post 요청할 때 writer 정보(User)를 함께 보내줘야 함
router.post("/save", (req, res) => {
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

module.exports = router;
