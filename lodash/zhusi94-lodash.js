  var zhusi94 = {
    chunk: function(array, size) {
      if (size == undefined) {
        size = 1
      }
      var result = []
      var a = []
      var i = 0
      var counter = Math.ceil(array.length / size)
      for (i; i < array.length; i++) {
        result.push(array.slice(i, i + size))
        i += size
        i--
      }
      return result
    },

    compact: function(array) {
      var result = []
      for (var i = 0; i < array.length; i++) {
        if (array[i] == undefined || array[i] == 0 || array[i] == '' || array[i] != array[i]) {
          continue
        } else {
          result.push(array[i])
        }
      }
      return result
    },

    difference: function(array, ...values) {
      var result = []
      for (var k = 0; k < array.length; k++) {
        result[k] = array[k]
      }

      for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < values[i].length; j++) {
          if (result.indexOf(values[i][j]) != -1) {
            result.splice(result.indexOf(values[i][j]), 1)
          }
        }
      }
      return result
    },

    forEach: function(collection, action) {
      for (var key in collection) {
        action(collection[key], key)
      }
      return collection
    },

    identity: function(value) {
      return arguments[0]
    },

    differenceBy: function(array1, Array, action) {
      var f = action
      if (typeof(f) == "string") {
        f = function(obj) {
          return obj[action]
        }
      }
      var dif = Array.map(x => f(x))

      return array1.filter(item => dif.indexOf(f(item)) == -1)
    },

    negate: function(f) {
      return function(...args) {
        return !f(...args)
      }
    },

  }