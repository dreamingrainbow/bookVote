const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPass } = require('../functions')

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
})

UserSchema.pre('save', async function(next) {
  const user = this
  if (!user.isModified('password')) return next()
  user.password = await hashPass(user.password)
  next()
})

module.exports = mongoose.model('User', UserSchema)
