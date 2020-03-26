class RPromise {
  constructor (fn) {
    let self = this
    this.status = 'padding'
    this.value = null
    this.error = null
    this.resolveCallbacks = [] // 所有的resolve回调
    this.rejectCallbacks = [] // 所有的resolve回调
    let resolve = function (value) {
      setTimeout( () => {
        self.value = value
        self.status = 'fulfilled'
        self.resolveCallbacks.map(cb => cb(self.value))
      }, 0)
    }

    let reject = function (error) {
      setTimeout(() => {
        self.error = error
        self.status = 'rejected'
        self.rejectCallbacks.map(ca => cb(self.error))
      })
    }
    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  static then (resolvecb, rejectedcb) {

  }

  static catch () {

  }
  static all () {

  }

  static reace () {

  }

  static resolve () {
    if (this.status === 'padding') {
      this.status = 'fulfilled'
    }
  }
  static reject () {
    if (this.status === 'padding') {
      this.status = 'rejected'
    }
  }

  then () {

  }

  catch () {

  }

  finally () {

  }
}
var a = new RPromise(function(resolve, reject) {
  let dd = 0
  if (dd === 0) {
    resolve(dd)
  }
})
