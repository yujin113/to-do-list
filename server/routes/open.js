const express = require("express");
const router = express.Router();
const { List } = require("../models/List");

// writer, category 정보 받아서 그에 맞는 리스트 보내줌
router.post("/getList", (req, res) => {
  List.find({
    writer: req.body.writer,
    category: req.body.category,
    "todos.privated": false,
    "todos.year": req.body.year,
    "todos.month": req.body.month,
    "todos.today": req.body.today,
  }).exec((err, list) => {
    if (err) return res.status(400).send(err);
    for (i = 0; i < list.length; i++) {
      for (j = 0; j < list[i].todos.length; j++) {
        if (list[i].todos[j].privated === true) {
          list[i].todos.splice(j, 1);
        }
      }
    }
    return res.status(200).json({
      success: true,
      list,
    });
  });
});

module.exports = router;
