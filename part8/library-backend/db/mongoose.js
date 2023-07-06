const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.log('failed connecting to mongodb', err.message))
