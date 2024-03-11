const express = require("express");
const list = require("../model/reminderList");
const user = require("../model/User");
const { route } = require("./Route");
const {protected}=require("../middleware/Authentication")

const router = express.Router();

router.post("/addReminder", async (req, res) => {
  try {
    const { title, description, date, time, id } = req.body;

    const existingUser = await user.findById(id);
    if (existingUser) {
      const reminder = new list({
        title,
        description,
        date,
        time,
        user: existingUser,
      });
      await reminder.save().then(() => res.status(200).json({ reminder }));
      existingUser.reminderList.push(reminder);
      existingUser.save();
    }
  } catch (error) {
    console.error(error);
  }
});

router.put("/updateReminder/:id", async (req, res) => {
  try {
    const { title, description, date, time } = req.body;
    const updateList = await list.findByIdAndUpdate(
      req.params.id,
      { title, description, date, time },
      { new: true }
    );
    if (updateList) {
      res
        .status(200)
        .json({ message: "Task Updated successfully!!!", updateList });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/deleteReminder/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await user.findByIdAndUpdate(id, {
      $pull: { reminderList: req.params.id },
    });
    if (existingUser) {
      await list
        .findByIdAndDelete(req.params.id)
        .then(() =>
          res.status(200).json({ message: " Reminder Deleted successfully" })
        );
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/getReminder/:id", protected, async (req, res) => {
  const getList = await list.find({ user: req.params.id });
  if (getList.length !== 0) {
    res.status(200).json({ getList: getList });
  } else {
    res.status(200).json({ message: "No Reminder" });
  }
});
module.exports = router;
