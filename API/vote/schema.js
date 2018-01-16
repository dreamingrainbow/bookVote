const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VoteSchema = Schema({
  votes: [
    {
      vote: {
        type: String,
        enum: ['Up', 'Down']
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book'
  },
  // Alternative Schema
  // upCount: {
  //   type: Number,
  //   default: 0
  // },
  // downCount: {
  //   type: Number,
  //   default: 0
  // },
  // book: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Book'
  // },
  // votes: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   vote: { type: Number, default: 0 },
  //   voted: { type: Boolean, default: false }
  // },]
})

module.exports = mongose.model('Vote', VoteSchema)
