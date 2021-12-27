const router = require('express').Router()
import express from 'express'
import { UserModel } from '../models/User'
import { check, validationResult } from 'express-validator'
import CryptoJS from 'crypto-js'
const jwt = require('jsonwebtoken')

//REGISTER
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail().isLength({
      min: 10,
      max: 40,
    }),
    check('username', 'Incorrect email').isLength({
      min: 2,
      max: 40,
    }),
    check('password', 'Minimal lenght of password is 6 symbols ')
      .isLength({ min: 6 })
      .custom((value: any, { req }: any) => {
        if (value !== req.body.password2) {
          throw new Error("Password don't match")
        } else {
          return value
        }
      }),
  ],
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { username, email, password } = req.body
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data',
        })
      }

      const candidate = await UserModel.findOne({ email })

      if (candidate) {
        res.status(400).json({ message: 'Error. Such user has already existed' })
      }

      const newUser = new UserModel({
        username,
        email,
        password: CryptoJS.AES.encrypt(
          password,
          //@ts-ignore
          process.env.SECRET_KEY,
        ).toString(),
      })

      const user = await newUser.save()
      res.status(201).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  },
)

//LOGIN
router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists(),
  ],
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
          message: 'Invalid login data',
        })
      }

      const user = await UserModel.findOne({ email: req.body.email })

      if (!user) {
        res.status(401).json('Wrong password or username!')
      } else {
        //@ts-ignore
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        if (originalPassword !== req.body.password) {
          res.status(401).json('Wrong password or username!')
        }

        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          //@ts-ignore
          process.env.SECRET_KEY,
          { expiresIn: '5d' },
        )
        //@ts-ignore
        const { password, ...info } = user._doc
        res.status(200).json({ ...info, accessToken })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  },
)

export default router
