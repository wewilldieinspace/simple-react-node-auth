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
        check('email', 'At least don\'t screw up here!')
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

            const { email, password } = req.body

            const user = await User.findOne({ email })

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
        check('first-name', 'Required field').notEmpty(),
        check('last-name', 'Well no. But actually yes').notEmpty(),
        check('email', 'You leave him everywhere anyway').isEmail(),
        check('last-name', 'You misunderstood something. Passwords must be at least 6 characters in length ')
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

            const { firstName, lastName, email, password } = req.body

            const isCandidate = await User.findOne({ email })

            if (isCandidate) {
                return res.status(400).message({
                    message: 'Someone screwed up. User already exists'
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await new User({
                firstName, lastName, email, password: hashedPassword
            })

            await user.save()

            return res.status(201).json({
                message: 'I\'m proud of you'
            })
        } catch (e) {
            return res.status(500).json({
                message: `Oh my gosh: ${e.message}`
            })
        }
    }
)