const express = require("express");
const router = express.Router();
const { List } = require("../models/List");

// list 저장 router
// client에서 post 요청할 때 writer 정보(User)를 함께 보내줘야 함
router.post("/saveList", (req, res) => {
  const list = new List(req.body);
  List.deleteOne(
    { writer: req.body.writer, category: req.body.category },
    (err, res) => {}
  );
  List.findOneAndUpdate(
    { writer: req.body.writer, category: req.body.category },
    { $push: { todos: req.body.todos } },
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
    todos: {
      $elemMatch: {
        year: req.body.year,
        month: req.body.month,
        today: req.body.today,
      },
    },
  }).exec((err, list) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({
      success: true,
      list,
      count: list.todos.length,
    });
    // listCount는 writer, category, date로 찾은 todos 안의 배열 개수
  });
});

// 오늘의 달성률
router.get("/getTodaySuccess", (req, res) => {
  let total = 0;
  let done = 0;
  List.find({
    writer: req.body.writer,
    todos: {
      $elemMatch: {
        year: req.body.year,
        month: req.body.month,
        today: req.body.today,
      },
    },
  })
    .exec()
    .then((list) => {
      for (i = 0; i < list.length; i++) {
        total += list[i].todos.length;
        for (j = 0; j < list[i].todos.length; j++) {
          if (list[i].todos[j].checked === true) done += 1;
        }
      }
      res.status(200).json({
        success: true,
        total,
        done,
        //list,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// 이 달의 달성률
router.get("/getMonthSuccess", (req, res) => {
  let total = 0;
  let done = 0;
  List.find({
    writer: req.body.writer,
    todos: {
      $elemMatch: {
        year: req.body.year,
        month: req.body.month,
      },
    },
  })
    .exec()
    .then((list) => {
      for (i = 0; i < list.length; i++) {
        total += list[i].todos.length;
        for (j = 0; j < list[i].todos.length; j++) {
          if (list[i].todos[j].checked === true) done += 1;
        }
      }
      res.status(200).json({
        success: true,
        total,
        done,
        //list,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
