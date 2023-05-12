const crypto = require('node:crypto')
const jwt = require('jsonwebtoken')
const express = require('express')
const userModel = require('../models/user.model')
const tokenModel = require('../models/token.model')
const { sendVerificationEmail, sendResetPasswordCode } = require('../helpers/mailer')
const { authUser } = require('../middlwares/auth')
const codeModel = require('../models/code.model')
const { generateRandomCode } = require('../helpers/generateRandomCode')
const router = express.Router()

const genarateVerificationToken = (userId) => {
  const emailVerificationToken = jwt.sign(
    { id: userId },
    process.env.TOKEN_SECRET,
    { expiresIn: '30m' }
  )

  return emailVerificationToken
}
router.post('/auth/signup', async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    username,
    bYear,
    bMonth,
    bDay,
    gender,
  } = req.body

  const checkUser = await userModel.findOne({ email }).lean()
  if (checkUser) {
    return res.status(401).json({
      code: 'xxxx',
      message: `User with email: ${email} has exist in the database`
    })
  }

  const hashedPassword = await hashPassword(password)

  const user = await userModel.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    username,
    bYear,
    bMonth,
    bDay,
    gender,
  })

  await tokenModel.create({
    user: user._id,
  })

  const emailVerificationToken = genarateVerificationToken(user._id.toString())
  const url = `${process.env.BASE_URL}/auth/activate/${emailVerificationToken}`

  await sendVerificationEmail('ngaythebetrai@gmail.com', 'gtbt', url)
  res.status(201).json(user)
})

router.get('/auth/send-verification', authUser, async (req, res) => {
  const userEntity = await userModel.findById(req.user.id)
  if (userEntity.verified === true) {
    return res.status(400).json({
      message: "This account is already activated."
    })
  }
  const emailVerificationToken = genarateVerificationToken(userEntity._id.toString())
  const url = `${process.env.BASE_URL}/auth/activate/${emailVerificationToken}`
  await sendVerificationEmail('ngaythebetrai@gmail.com', 'gtbt', url)

  return res.status(200).json({
    message: 'Check your email to verify your account'
  })
})

router.post('/auth/activate/:token', authUser, async (req, res) => {
  const token = req.params.token
  const userEntity = await userModel.findById(req.user.id)
  const check = jwt.verify(token, process.env.TOKEN_SECRET)
  if (userEntity.id !== check.id) {
    return res.status(400).json({
      message: "You don't have the authorization to complete this operation.",
    });
  }
  if (check.verified == true) {
    return res
      .status(400)
      .json({ message: "This email is already activated." })
  }

  await userModel.findByIdAndUpdate(check.id, { verified: true })

  return res
    .status(200)
    .json({ message: "Account has beeen activated successfully." })

})

router.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body
  const user = await userModel.findOne({ email })
  if (!user) {
    return res.status(401).json({
      code: 'xxx',
      message: 'Incorrect username or password.',
    })
  }
  const hashedPassword = await hashPassword(password)

  if (user.password !== hashedPassword.toString()) {
    return res.status(401).json({
      code: 'xxx',
      message: 'Incorrect username or password.',
    })
  }

  const accessToken = jwt.sign({
    id: user._id,
    verified: user.verified,
    email,
    issuer: 'http://localhost:8080',
    audience: 'http://localhost:8080',
  }, process.env.TOKEN_SECRET, { expiresIn: '8hr' })

  const refreshToken = jwt.sign({
    id: user._id,
    email,
    issuer: 'http://localhost:8080',
    audience: 'http://localhost:8080',
  }, process.env.TOKEN_SECRET, { expiresIn: '10d' })

  tokenModel.updateOne({ user: user._id }, { $push: { refreshTokens: refreshToken } })

  return res.status(200).json({
    accessToken,
    refreshToken,
  })
})

router.post('/auth/reset-password-code', async (req, res) => {
  const { email } = req.body

  const userEntity = await userModel.findOne({ email }).lean()

  if (userEntity === null) {
    return res.status(200).json({
      message: "Code sent to your email.",
    })
  }

  const code = generateRandomCode(4)
  await codeModel.findOneAndRemove({ user: userEntity._id })
  await codeModel.create({
    user: userEntity._id,
    code,
  })

  await sendResetPasswordCode("email", "name", code)

  return res.status(200).json({
    message: "Code sent to your email."
  })
})

router.post('/auth/verify-reset-password-code', async (req, res) => {
  const { email, code } = req.body
  const user = await userModel.findOne({ email }).lean()
  const codeEntity = await codeModel.findOne({ user: user._id })
  if (codeEntity.code !== code) {
    return res.status(400).json({
      message: "Verification code is wrong..",
    })
  }

  return res.status(200).json({
    message: "ok"
  })
})

router.post('/auth/change-password', async (req, res) => {
  const { email, password } = req.body
  const hashedPassword = await hashPassword(password)
  userModel.findOneAndUpdate(
    {email},
    {password: hashedPassword}
  )

  return res.status(200).json({ message: "ok" });
})

async function hashPassword(password) {
  return await new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310_000, 32, 'sha256', (err, hashedPassword) => {
      if (err) {
        reject(err)
        return
      }
      resolve(hashedPassword)
    })
  })
}
module.exports = router