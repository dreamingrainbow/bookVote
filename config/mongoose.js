const mongoose = require('mongoose')

module.exports = config => {
  mongoose.connect(config.db, { useMongoClient: true })
  mongoose.Promise = global.Promise

  const db = mongoose.connection
  db.on(
    'error',
    console.error.bind(console, 'bookvote could not connect to the database')
  )
  db.once('open', () => console.log('book vote is connected to the database'))
}
