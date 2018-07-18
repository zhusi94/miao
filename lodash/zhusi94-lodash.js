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
      return value
    },

    property: function(propName) {
      return function(obj) {
        result obj[propName]
      }
    },

    sumBy: function(ary, iteratee) {
      var result = 0
      for (var i = 0; i < ary.length; i++) {
        result += iteratee(ary[i])
      }
      return result
    },
    sum: function(ary) {
      return sumBy(ary, identity)
    },

    differenceBy: function(array1, ...values) {
      var f = arguments[arguments.length - 1]
      var result = []

      if (typeof(f) == "string") {
        f = function(obj) {
          return obj[arguments[arguments.length - 1]]
        }
      }

      var dif = values.forEach(function(value) {
        value.forEach(function(item) {
          result.push(f(item))
        })
      })

      return array1.filter(item => dif.indexOf(f(item)) == -1)
    },

    negate: function(f) {
      return function(...args) {
        return !f(...args)
      }
    },
    differenceWith: function(array1, values, comparator) {

    },

    drop: function(array, n = 1) {
      return array.slice(n, array.length)
    },

    dropRight: function(array, n = 1) {
      if (n > array.length) {
        n = array.length
      }
      return array.slice(0, array.length - n)
    },

    dropRightWhile: function(array, predicate = zhusi94.identity) {

    },

    fill: function(array, value, start = 0, end = array.length) {
      for (var i = start; i < end; i++) {
        array[i] = value
      }
      return array
    },

    flatten: function(array) {
      var result = []

      for (var i = 0; i < array.length; i++) {
        if (typeof array[i] != "object") {
          result.push(array[i])
        } else {
          for (var j = 0; j < array[i].length; j++) {
            result.push(array[i][j])
          }
        }
      }

      return result
    },

    flattenDeep: function(array) {
      var result = []

    },
    fromPairs: function(array) {
      var result = {}

      array.forEach(function(value) {
        result[value[0]] = value[1]
      })
      return result
    },
    toPairs: function(object) {
      var result = []
      for (var key in object) {
        result.push([key, object[key]])
      }
      return result
    },

    head: function(array) {
      return array[0]
    },

    indexOf: function(array, value, fromIndex = 0) {
      for (var i = fromIndex; i < array.length; i++) {
        if (array[i] == value) {
          return i
        }
      }
    },

    initial: function(array) {
      return array.slice(0, array.length - 1)
    },

    intersection: function(...arrays) {

    },
  }