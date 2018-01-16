require('dotenv').config()

const server = require('express')()
const config = require('./config/config')

require('./config/express')(server, config)
require('./config/mongoose')(config)
require('./config/routes')(server)

const handler = require('./API/functions')
server.use(handler.notFound)
server.use(handler.validationErrors)
server.use(handler.pHandleErrors)

server.listen(config.port, err => {
  if (err) console.log(err)
  console.log(`server is listening on port 3333`)
})
