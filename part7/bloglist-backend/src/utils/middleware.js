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


module.exports = { unknownEndpoint, errorHandler }
