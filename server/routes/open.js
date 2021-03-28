const express = require("express");
const router = express.Router();
const { List } = require("../models/List");

router.post("/getList", (req, res) => {
  List.find({
    writer: req.body.writer,
    category: req.body.category,
    "todos.privated": false,
  }).exec((err, list) => {
    if (err) return res.status(400).send(err);
    //   if (!list) return res.json({ list });
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
