//TODO:Dept News route

const router = require("express").Router();
const DeptPost = require("../models/DeptPost");
const User = require("../models/User");

// create a DeptPost

router.post("/", async (req, res) => {
  const deptPost = await new DeptPost(req.body);
  try {
    const savedDeptPost = await deptPost.save();
    res.status(200).json(savedDeptPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update DeptPost

router.put("/:id", async (req, res) => {
  try {
    const deptPost = await DeptPost.findById(req.params.id);
    await deptPost.updateOne({ $set: req.body });
    res.status(200).json("DeptPost has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a DeptPost
router.delete("/:id", async (req, res) => {
  try {
    const deptPost = await DeptPost.findById(req.params.id);
    await deptPost.deleteOne();
    res.status(200).json("DeptPost has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a DeptPost by id
router.get("/:id", async (req, res) => {
  try {
    const deptPost = await DeptPost.findById(req.params.id);
    res.status(200).json(deptPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all dept posts for specific department
router.get("/", async (req, res) => {
  try {
    const deptPosts = await DeptPost.find({ department: req.query.department });
    res.status(200).json(deptPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
