const mongoose = require('mongoose')
const User = require('./schema')
const { comparePass, loginErr } = require('../functions')

module.exports = {
  newUser: async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return loginErr(res)
    const newUser = new User({ username, password })
    const user = await newUser.save()
    res.status(201).json(user)
  },

  login: async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return loginErr(res)
    const user = await User.findOne({ username })
    if (!user) return loginErr(res)
    const compared = await comparePass(password, user.password)
    return compared ? res.status(200).json(user) : loginErr(res)
  }
}
