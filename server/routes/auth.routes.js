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
            .exists(),
        check('password', 'You screwed up!').exists()
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
                { username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )

            return res.json({
                username, token
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
            const errors = validationResult(req)

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

            const token = jwt.sign(
                { username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )

            return res.json({
                username, token
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