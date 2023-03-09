;(function () {
  function EventEmitter() {
    this.events = {}
  }

  EventEmitter.prototype.on = function (eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(fn)
  }

  EventEmitter.prototype.once = function (eventName, fn) {
    var self = this
    this.on(eventName, function once() {
      fn.apply(null, arguments)
      self.off(eventName, once)
    })
  }

  EventEmitter.prototype.off = function (eventName, fn) {
    if (!fn) {
      delete this.events[eventName]
      return
    }

    var index = this.events[eventName].indexOf(fn)
    if (index !== -1) {
      this.events[eventName].splice(index, 1)
      if (this.events[eventName].length === 0) {
        delete this.events[eventName]
      }
    }
  }

  EventEmitter.prototype.emit = function () {
    var args = Array.prototype.slice.call(arguments)
    var eventName = args.shift()

    if (!this.events[eventName]) return

    this.events[eventName].forEach(function (fn) {
      fn.apply(null, args)
    })
  }

  // Node
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventEmitter
  }
  // AMD
  else if (typeof define !== 'undefined' && define.amd) {
    define([], function () {
      return EventEmitter
    })
  }
  // Browser
  else {
    window.EventEmitter = EventEmitter
  }
})()
