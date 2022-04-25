//TODO:Notices route
const router = require("express").Router();
const Notice = require("../models/Notice");
const User = require("../models/User");

// create a notice

router.post("/", async (req, res) => {
  const newNotice = await new Notice(req.body);
  try {
    const savedNotice = await newNotice.save();
    res.status(200).json(savedNotice);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update notice

router.put("/:id", async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    await notice.updateOne({ $set: req.body });
    res.status(200).json("Notice has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a notice
router.delete("/:id", async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    await notice.deleteOne();
    res.status(200).json("Notice has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a notice by id
router.get("/:id", async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    res.status(200).json(notice);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
