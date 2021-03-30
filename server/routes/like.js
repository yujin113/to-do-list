const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

router.post("/getLikes", (req, res) => {
  Like.find({ commentId: req.body.commentId }).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

router.post("/getDislikes", (req, res) => {
  Dislike.find({ commentId: req.body.commentId }).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislikes });
  });
});

router.post("/upLike", (req, res) => {
  // Like collection에 클릭 정보 넣기
  const like = new Like(req.body);

  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });

    // Dislike이 클릭되어 있는 상태라면 Dislike 1 줄이기
    Dislike.findOneAndDelete({
      commentId: req.body.commentId,
      userId: req.body.userId,
    }).exec((err, dislikeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post("/unLike", (req, res) => {
  Like.findByIdAndDelete({
    commentId: req.body.commentId,
    userId: req.body.userId,
  }).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/upDislike", (req, res) => {
  // Dislike collection에 클릭 정보 넣기
  const dislike = new Dislike(req.body);

  dislike.save((err, dislikeResult) => {
    if (err) return res.json({ success: false, err });

    // like이 클릭되어 있는 상태라면 like 1 줄이기
    Like.findOneAndDelete({
      commentId: req.body.commentId,
      userId: req.body.userId,
    }).exec((err, likeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post("/unDislike", (req, res) => {
  Dislike.findByIdAndDelete({
    commentId: req.body.commentId,
    userId: req.body.userId,
  }).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
