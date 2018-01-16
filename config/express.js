const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}

module.exports = (server, config) => {
  server.use(logger('dev'))
  server.use(bodyParser.json())
  server.use(cors(corsOptions))
}
