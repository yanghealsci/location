export class Error {
  constructor (message, name) {
    this.message = message
    this.name = name
    this.type = 'USER_ERROR'
  }
}

export class MissingParam extends Error {
  constructor (message) {
    super(message, 'MissingParam')
  }
}

export class DBError extends Error {
  constructor(message) {
    super(message, 'DBError')
  }
}