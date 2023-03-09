const router = require('express').Router();
const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

//  USER REGISTER

router.post('/register', async (req, res) => {
    try {
        // user already exist
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            return res.status(200).send({ message: 'İstifadəçi artıq mövcuddur', success: false })
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        
        // create a new user
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            message: 'İstifadəçi uğurla yaradıldı',
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


// USER LOGIN

router.post('/login', async (req, res) => {
    try {
        // check user
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(200)
                .send({ message: 'İstifadəçi tapılmadı!', success: false })
        }

        // chceck password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res
                .status(200)
                .send({ message: 'Parol yalnışdir!', success: false })
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.send({
            message: 'İstifadəçi daxil oldu! ',
            success: true,
            data: token,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }

})


// GET USER INFORMATION

router.post('/get-user-info', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            message: 'İstifadəçi məlumatı uğurla alındı',
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
})

module.exports = router;