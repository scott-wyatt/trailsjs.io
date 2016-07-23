'use strict'

const TrailsApp = require('trails')

before(done => {
  global.app = new TrailsApp(require('../'))
  return global.app.start().then(() => {
    done()
  }).catch(err => {
    done()
    return global.app.stop(err)
  })
})


after(() => {
  return global.app.stop()
})
