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

    property: function(propName) {
      return function(obj) {
        return obj[propName]
      }
    },

    sumBy: function(ary, iteratee) {
      var result = 0
      if (typeof iteratee == 'string') {
        var s = iteratee
        iteratee = function(obj) {
          return obj[s]
        }
      }
      for (var i = 0; i < ary.length; i++) {
        result += iteratee(ary[i])
      }
      return result
    },
    sum: function(ary) {
      return zhusi94.sumBy(ary, zhusi94.identity)
    },
    matches: function(src) {
      return function(obj) {
        for (var key in src) {
          if (src[key] != obj[key]) {
            return false
          }
        }
        return true
      }
    },

    differenceBy: function(array1, ...values) {
      var f = arguments[arguments.length - 1]
      var h = f
      if (typeof(f) == "string") {
        f = function(obj) {
          return obj[h]
        }
      } else if (Array.isArray(f)) {
        var dif = []
        for (var i = 1; i < arguments.length; i++) {
          dif = [...dif, ...arguments[i]]
        }
        return array1.filter(item => dif.indexOf(item) == -1)
      } else {
        var dif = []
        for (var i = 1; i < arguments.length - 1; i++) {
          var tmp = arguments[i].map(x => f(x))
          dif = [...dif, ...tmp]
        }
        return array1.filter(item => dif.indexOf(f(item)) == -1)
      }
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
      //一：
      // var result = []

      // for (var i = 0; i < array.length; i++) {
      //   if (!Array.isArray(array[i])) {
      //     result.push(array[i])
      //   } else {
      //     for (var j = 0; j < array[i].length; j++) {
      //       result.push(array[i][j])
      //     }
      //   }
      // }

      // return result

      //二：
      // return array.reduce((result, item) => {
      //   if (!Array.isArray(item)) {
      //     result.push(item)
      //   } else {
      //     //result.splice(result.length,0,...item)
      //     result = [...result, ...item]
      //   }
      // }, [])

      //三：
      return [].concat(...array)
      // return flattenDepth(array,1)
    },

    flattenDeep: function(array) {
      var result = []
      for (var i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
          var tmp = zhusi94.flattenDeep(array[i])
          result = [...result, ...tmp]
        } else {
          result.push(array[i])
        }
      }
      return result
    },
    flattenDepth: function(array, depth = 1) {
      if (depth === 0) {
        return array.slice() //[...array]
      }
      var result = []
      for (var i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
          var tmp = zhusi94.flattenDepth(array[i], depth - 1)
          result = [...result, ...tmp]
        } else {
          result.push(array[i])
        }
      }
      return result
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
        if (object.hasOwnProperty(key)) {
          result.push([key, object[key]])
        }
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
      if (arguments.length == 2) {
        return arguments[0].filter(item => arguments[1].indexOf(item) != -1)
      } else {
        var ary = [...arrays].slice(1, arguments.length)
        return arguments[0].filter(item => zhusi94.intersection(...ary).indexOf(item) != -1)
      }
    },

    join: function(array, separator = ',') {
      return array.reduce((result, item) =>
        '' + result + separator + item
      )
    },

    last: function(array) {
      return array[array.length - 1]
    },
    lastIndexOf: function(array, value, fromIndex = array.length - 1) {
      for (var i = fromIndex; i >= 0; i--) {
        if (array[i] == value) {
          return i
        }
      }
      return -1
    },
    nth: function(array, n = 0) {
      if (n >= 0) {
        return array[n]
      } else {
        return array[array.length + n]
      }
    },

    pull: function(array, ...values) {
      for (var i = 0; i < array.length; i++) {
        if (values.indexOf(array[i]) !== -1) {
          array.splice(i, 1)
          i--
        }
      }
      return array
    },
    pullAll: function(array, values) {
      for (var i = 0; i < array.length; i++) {
        if (values.indexOf(array[i]) !== -1) {
          array.splice(i, 1)
          i--
        }
      }
      return array
    },

    reverse: function(ary) {
      var l = Math.floor(ary.length / 2)
      var a
      var len = ary.length
      for (var i = 0; i <= l; i++) {
        a = ary[i]
        ary[i] = ary[len - 1 - i]
        ary[len - 1 - i] = a
      }
      return ary
    },

    sortedIndex: function(array, value) { // 二分查找适合的插入位置
      var low = 0
      var high = array.length - 1
      var mid = Math.floor((low + high) / 2)

      while (high - low > 1) {
        mid = Math.floor((low + high) / 2)
        if (array[mid] < value) {
          low = mid
        } else {
          high = mid
        }
      }
      if (array[mid] < value) {
        mid++
      }
      return mid
    },

    sortedIndexOf: function(array, value) { //要用二分查找
      var low = 0
      var high = array.length - 1
      var mid = Math.floor((low + high) / 2)

      while (high - low > 1) {
        mid = Math.floor((low + high) / 2)
        if (array[mid] < value) {
          low = mid
        } else {
          high = mid
        }
      }
      if (array[mid] < value) {
        mid++
      }
      if (array[mid] == value) {
        return mid
      } else {
        return -1
      }
    },

    sortedLastIndex: function(array, value) {
      var low = 0
      var high = array.length - 1
      var mid = Math.floor((low + high) / 2)

      while (high - low > 1) {
        mid = Math.floor((low + high) / 2)
        if (array[mid] < value) {
          low = mid
        } else {
          high = mid
        }
      }
      if (array[mid] < value) {
        mid++
      }
      if (array[mid] == value) {
        return array.length - mid
      } else {
        return -1
      }
    },
    sortedUniq: function(array) { //已经排好序的单个数组去重
      for (var i = 0; i < array.length; i++) {
        if (array[i] == array[i + 1]) {
          array.splice(i + 1, 1)
          i--
        }
      }
      return array
    },
    sortedUniqBy(array, iteratee) {
      if (iteratee != undefined) {
        for (var i = 0; i < array.length; i++) {
          if (iteratee(array[i]) == iteratee(array[i + 1])) {
            array.splice(i + 1, 1)
            i--
          }
        }
        return array
      } else {
        return zhusi94.sortedUniq(array)
      }
    },
    tail: function(array) {
      return array.slice(1, array.length)
    },
    take: function(array, n = 1) {
      return array.slice(0, n)
    },
    takeRight: function(array, n = 1) {
      return array.slice(array.length - n > 0 ? array.length - n : 0, array.length)
    },
    union: function(...arrays) {
      var a = [].concat(...arrays)
      return a.reduce(function(result, item) {
        if (result.indexOf(item) == -1) {
          result.push(item)
        }
        return result
      }, [])
    },
    uniq: function(array) {
      return array.reduce(function(result, item) {
        if (result.indexOf(item) == -1) {
          result.push(item)
        }
        return result
      }, [])
    },
    zip: function(...arrays) {
      var result = []
      var a = [...arrays]
      var g = []
      var j = 0
      while (j < a[0].length) {
        g = []
        for (var i = 0; i < a.length; i++) {
          g.push(a[i][j])
        }
        result.push(g)
        j++
      }
      return result
    },
    unzip: function(array) {
      var result = new Array(array[0].length).fill(0).map(it => [])

      for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[0].length; j++) {
          result[j].push(array[i][j])
        }
      }

      return result
    },

    without: function(array, ...values) {
      var result = []
      array.forEach(function(item) {
        if ([].concat(...values).indexOf(item) == -1) {
          result.push(item)
        }
      })
      return result
    },
    xor: function(...arrays) {
      var arg = [].concat(...arrays)
      var result = []

      for (var i = 0; i < arg.length; i++) {
        if (arg.indexOf(arg[i]) == arg.lastIndexOf(arg[i])) {
          result.push(arg[i])
        }
      }
      return result
    },
    zipObject: function(props = [], values = []) {
      var result = {}
      if (!props) {
        return result
      }
      for (var i = 0; i < props.length; i++) {
        result[props[i]] = values[i]
      }
      return result
    },
    includes: function(collection, value, fromIndex = 0) {
      if (Array.isArray(collection)) {
        for (var i = fromIndex; i < collection.length; i++) {
          if (collection[i] == value) {
            return true
          }
        }
        return false
      }

      if (typeof collection == 'string') {
        var c = collection.split("")
        var v = value.split("")

        for (var i = 0; i < c.length; i++) {
          if (c[i] == v[0]) {
            var j = i
            var k = 0
            while (c[j] == v[k] && k < v.length) {
              j++
              k++
            }
            if (k == v.length && c[j - 1] == v[k - 1]) {
              return true
            }
          }
        }
        return false
      }

      if (typeof collection == 'object') {
        for (var key in collection) {
          if (collection[key] == value) {
            return true
          }
        }
        return false
      }
    },
    size: function(collection) {
      if (typeof collection == 'object' && !Array.isArray(collection)) {
        var result = 0
        for (var key in collection) {
          result++
        }
        return result
      } else {
        return collection.length
      }

    },


    iteratee: function(func = zhusi94.identity) {
      if (typeof func == 'function') {
        return func
      }
      if (typeof func == 'string') {
        return function(func) {
          return func
        }
      }

    },
    isMatch: function(object, source) {
      for (var key in object) {
        if (!zhusi94.isEqual(boject[key], source[key])) {
          return false
        }
      }
      return true
    },

    isEqual: function(val, other) {
      if (val === other) {
        return true
      }
      if (val !== val && other !== other) {
        return true
      }
      if (value == null || typeof(value) != 'object' || typeof(other) != 'object' || other == null) return false
      let propA = 0
      let propB = 0
      for (let prop in value) {
        propA++
      }
      for (let prop in other) {
        propB++
        if (!(prop in value) || !isEqual(value[prop], other[prop])) return false
      }
      return propA == propB
    },
    isNaN: function(val) {
      if (val !== val) {
        return true
      } else {
        return false
      }
    },
    matches: function(source) {
      return function(object) {
        for (var key in source) {
          if (!zhusi94.isEqual(source[key], object[key])) {
            return false
          }
          return true
        }
      }
    },
    matchesProperty: function(pro, val) {
      return function(ary) {
        for (var i = 0; i < ary.length; i++) {
          if (isEqual(ary[i][pro], val)) {
            return ary[i]
          }
        }
      }
    },
    isArray: function(ary) {
      return Object.prototype.toString.call(ary) === '[object Array]'
    },
    isRegExp: function(value) {
      return Object.prototype.toString.call(value) === '[object RegExp]'
    },
    iteratee: function(iter) {
      // isObject
      if (Object.prototype.toString.call(iter) === '[object Object]') {
        return zhusi94.matches(iter)
      }

      // isArray
      // TODO: 不应该比较大小
      if (zhusi94.isArray(iter)) {
        // !!! 只写了数组 length === 2 的情况
        return obj => zhusi94.isEqual(obj[iter[0]], iter[1])
      }

      // isRegExp
      // /(?<=\/).*?(?=\/)/
      if (zhusi94.isRegExp(iter)) {
        return str => iter.exec(str)
      }

      // isString
      if (typeof iter === 'string') {
        return sanvvv.property(iter)
      }

      // isFunction
      if (typeof iter === 'function') {
        return iter
      }
    },

    every: function(collection, predicate = zhusi94.identity) {
      var f = zhusi94.iteratee(predicate)

      for (var item of collection) {
        if (!f(item)) {
          return false
        }
      }
      return true
    },
    find: function(collection, predicate = zhusi94.identity, fromIndex = 0) {
      var f = zhusi94.iteratee(predicate)
      for (var item of collection) {
        if (f(item)) {
          return item
        }
      }
      return undefined
    },
    groupBy: function(collection, iteratee) {
      var f = zhusi94.iteratee(iteratee)

      return collection.reduce(function(result, item, index, ary) {
        var val = f(item)
        if (!result[val]) {
          result[val] = [item]
        } else {
          result[val].push(item)
        }
        return result
      }, {})
    },
    some: function(collection, predicate = zhusi94.identity) {
      var f = zhusi94.iteratee(predicate)
      // return !zhusi94.every(collection,negate(f))

      for (var itrm of collection) {
        if (f(item)) {
          return true
        }
      }
      return false
    },

    castArray: function(array) {
      if (Array.isArray(array)) {
        return array
      } else {
        return [array]
      }
    },
    conformsTo: function(object, source) {
      for (var key in source) {
        return source[key](object[key])
      }
    },

    eq: function(value, other) {
      if (typeof value !== typeof other) {
        return false
      } else {
        if (value !== value && other !== other) {
          return true
        }

        if (zhusi94.isEqual(value, other)) {
          return true
        }
        if (value === other) {
          return true
        }
      }
    },

  }