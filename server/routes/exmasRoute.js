const router = require('express').Router();
const Exam = require('../models/examModel');
const authMiddleware = require('../middlewares/authMiddleware');
const Question = require('../models/questionModel');
// ADD EXAM
router.post("/add", authMiddleware, async (req, res) => {
    try {
        // EXAM ALREADY EXISTS
        const examExist = await Exam.findOne({ name: req.body.name });
        if (examExist) {
            return res.status(200).send({ message: "İmtahan artıq mövcuddur", success: false })
        }
        req.body.questions = [];
        const newExam = new Exam(req.body);
        await newExam.save();
        res.send({
            message: 'Imtahan əlavə edildi',
            success: true,
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
})

// GET ALL EXAMS
router.post("/get-all-exams", authMiddleware, async (req, res) => {
    try {
        const exams = await Exam.find({});
        res.send({
            message: 'Imtahanlar ugurla getrildi',
            data: exams,
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
})

// GET EXAM BY ID
router.post('/get-exam-by-id', authMiddleware, async (req, res) => {
    try {
        const exam = await Exam.findById(req.body.examId).populate('questions');
        res.send({
            message: 'Imtahan ugurla getrildi',
            data: exam,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
})

// EDIT EXAM BY ID
router.post('/edit-exam-by-id', authMiddleware, async (req, res) => {
    try {
        await Exam.findByIdAndUpdate(req.body.examId, req.body);
        res.send({
            message: 'Dəyişiklik qeydə alındı',
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
})

// DELETE EXAM BY ID
router.post('/delete-exam-by-id', authMiddleware, async (req, res) => {
    try {
        await Exam.findByIdAndDelete(req.body.examId);
        res.send({
            message: 'Imtahan silindi',
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
})

// ADD QUESTION TO EXAM
router.post('/add-question-to-exam', authMiddleware, async (req, res) => {
    try {
        // ADD QUESTION TO QUESTION COLLECTION
        const newQuestion = new Question(req.body);
        const question = await newQuestion.save();

        // ADD QUESTION TO EXAM
        const exam = await Exam.findById(req.body.exam);
        exam.questions.push(question._id);
        await exam.save();
        res.send({
            message: 'Sual əlavə edildi',
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
})

// EDIT QUESTION IN EXAM
router.post('/edit-question-in-exam', authMiddleware, async (req, res) => {
    try {
        // EDIT QUESTION IN QUESTION COLLECTION
        await Question.findByIdAndUpdate(req.body.questionId, req.body);
        res.send({
            message: 'Suala düzəliş edildi',
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
})

// DELETE QUETION IN THE EXAM
router.post('/delete-question-in-exam', authMiddleware, async (req, res) => {
    try {
        // DELETE QUETION IN QUESTIONS COLLECTION
        await Question.findByIdAndDelete(req.body.questionId);

        // DELETE QUETION IN EXAM
        const exam = await Exam.findById(req.body.examId);
        exam.questions = exam.questions.filter(
            (question) => question._id != req.body.questionId
        );
        await exam.save();
        res.send({
            message: 'Sual silindi',
            success: true,
        });
    } catch (error) {

    }
})
module.exports = router;