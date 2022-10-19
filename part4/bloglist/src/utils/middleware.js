const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'unknown endpoint' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'invalid or missing token' })
  }

  next(err)
}

const auth = async (req, res, next) => {
  const token = getTokenFrom(req)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    req.user = user
  } catch (err) {
    next(err)
  }
}

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  return authorization && authorization.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null
}

module.exports = { unknownEndpoint, errorHandler, auth }
