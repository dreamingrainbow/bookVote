module.exports = server => {
  server.use('/API/User', require('../API/user'))

  // server.use('API/Book', require('../API/book'))
  // server.use('API/Search', require('../API/search'))
  // server.use('API/Vote', require('../API/vote'))

  server.get('/', (req, res) => {
    res.send('You Have Reached the API')
  })
}
