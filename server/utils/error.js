class myError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
    this.matchGroup = []
  }
}

myError.group = (map) => {
  map.forEach(({ ...args }) => {
    if (args[2]) {
      throw new myError(args[0], args[1])
    }
  })
}

module.exports = myError