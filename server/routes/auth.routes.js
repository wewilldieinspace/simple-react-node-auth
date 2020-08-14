const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
require('dotenv').config()

const router = Router()

// login router
router.post(
    '/login',
    [
        check('username', 'At least don\'t screw up here!')
            .normalizeEmail().isEmail(),
        check('password', 'And here').notEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data'
                })
            }

            const { username, password } = req.body

            const user = await User.findOne({ username })

            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                })
            }

            const isCorrectPassword = await bcrypt.compare(password, user.password)

            if (!isCorrectPassword) {
                return res.status(400).json({
                    message: 'Incorrect password'
                })
            }

            const token = jwt.sign(
                { uId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )

            return res.json({
                token, uId: user.id
            })
        } catch (e) {
            return res.status(500).json({
                message: `Oh my gosh: ${e.message}`
            })
        }
    })

// register router
router.post(
    '/register',
    [
        check('username', 'Required field').exists(),
        check('email', 'You leave him everywhere anyway').isEmail(),
        check('password', 'You misunderstood something. Passwords must be at least 6 characters in length ')
            .isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {

            console.log('here we go again')

            const errors = validationResult(req)

            console.log('validationResult: ', errors)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data'
                })
            }

            const { username, email, password } = req.body

            const isCandidate = await User.findOne({ username })

            if (isCandidate) {
                return res.status(400).message({
                    message: 'Someone screwed up. User already exists'
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await new User({
                username, email, password: hashedPassword
            })

            await user.save()

            console.log('all done')

            return res.status(201).json({
                message: 'I\'m proud of you'
            })
        } catch (e) {
            console.log('error: ', e.message)
            return res.status(500).json({
                message: `Oh my gosh: ${e.message}`
            })
        }
    }
)

module.exports = router