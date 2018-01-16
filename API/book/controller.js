const mongoose = require('mongoose')
const uuid = require('uuid')
const Book = require('./schema')

module.exports = {
  getAllBooks: async (req, res) => {
    const books = await Book.find({})
    res.status(200).json(books)
  },

  getBookById: async (req, res) => {
    const { _id } = req.params
    if (!_id) throw new TypeError('Missing parameters')
    const book = await Book.find({ _id })
    !!book.length
      ? res.status(200).json(book)
      : res.status(404).json({ Error: `No book found with _id ${_id}` })
  },

  getBookBybook_id: async (req, res) => {
    const { book_id } = req.params
    const book = await Book.find({ book_id })
    !!book.length
      ? res.status(200).json(book)
      : res.status(404).json({ Error: `No book found with book_id ${book_id}` })
  },

  addBook: async (req, res) => {
    const { ISBN, category, subcategory, author, title } = req.body
    if (
      !ISBN ||
      category.length === 0 ||
      subcategory.length === 0 ||
      author.length === 0 ||
      !title
    ) {
      throw new TypeError('Missing parameters')
    } else {
      const newBook = Book({
        book_id: uuid.v4(),
        ISBN,
        category,
        subcategory,
        author,
        title
      })
      const response = await newBook.save()
      res.status(200).json(response)
    }
  },

  updateBook: async (req, res) => {
    const { _id } = req.params
    const { ISBN, category, subcategory, author, title } = req.body
    const newValues = {}
    if (ISBN) newValues.ISBN = ISBN
    if (category) newValues.category = category
    if (subcategory) newValues.subcategory = subcategory
    if (author) newValues.author = author
    if (title) newValues.title = title
    const book = await Book.findByIdAndUpdate(_id, newValues, { new: true })
    !!book
      ? res.status(200).json(book)
      : res.status(404).json({ Error: `No book found with _id ${_id}` })
  },

  deleteBook: async (req, res) => {
    const { _id } = req.params
    const book = await Book.findByIdAndRemove(_id)
    !!book
      ? res.status(200).json(book)
      : res.status(404).json({ Error: `No book found with _id ${_id}` })
  }
}
