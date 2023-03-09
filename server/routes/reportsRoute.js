const authMiddleware = require("../middlewares/authMiddleware");
const Exam = require("../models/examModel");
const User = require("../models/userModel");
const Report = require("../models/reportModel");
const router = require("express").Router();

// ADD REPORT

router.post("/add-report", authMiddleware, async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.send({
      message: "Nəticə əlavə edildi",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// GET ALL REPORTS

router.post("/get-all-reports", authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find().populate('exam').populate('user').sort({createdAt: -1});;
    res.send({
      message: "Nəticə gətrildi",
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// GET ALL REPORTS BY USER

router.post("/get-all-reports-by-user", authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.body.userId }).populate('exam').populate('user').sort({createdAt: -1});
    res.send({
      message: "Nəticə gətrildi",
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});


module.exports = router;