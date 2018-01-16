const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = Schema({
  book_id: {
    type: String,
    required: false
  },
  ISBN: {
    type: String,
    required: false
  },
  category: [
    {
      type: String
    }
  ],
  subcategory: [
    {
      type: String
    }
  ],
  author: [
    {
      type: String
    }
  ],
  title: {
    type: String,
    required: true
  },
  voteCount: {
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Book', BookSchema)
