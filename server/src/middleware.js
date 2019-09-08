import * as expt from './exceptions'

export const logger = (req, res, next) => {
  console.group(`✉️${req.originalUrl}`)
  console.info('params: ', req.params)
  console.info('query:', req.query)
  console.groupEnd()
  next()
}

export const errorHandler = (err, req, res, next) => {
  if (err.type === 'USER_ERROR') {
    res.status(500).send({
      data: null,
      error: err
    })
  } else {
    next(err)
  }
}

export const asyncHandler = fn => (req, res, next) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(next)
}

