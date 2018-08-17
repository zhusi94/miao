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
      }

      var dif = []
      for (var i = 1; i < arguments.length - 1; i++) {
        var tmp = arguments[i].map(x => f(x))
        dif = [...dif, ...tmp]
      }
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

    dropWhile: function(array, predicate = zhusi94.identity) {
      f = zhusi94.iteratee(predicate)
      for (var i = 0; i < array.length; i++) {
        if (!f(array[i])) {
          break
        }
      }
      return array.slice(i, array.length)
    },

    dropRight: function(array, n = 1) {
      if (n > array.length) {
        n = array.length
      }
      return array.slice(0, array.length - n)
    },

    dropRightWhile: function(array, predicate = zhusi94.identity) {
      f = zhusi94.iteratee(predicate)
      for (var i = array.length - 1; i >= 0; i--) {
        if (!f(array[i])) {
          break
        }
      }
      return array.slice(0, i + 1)
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



    isMatch: function(object, source) {
      for (var key in source) {
        if (!zhusi94.isEqual(object[key], source[key])) {
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
      if ((val == null || typeof(val) != 'object') || (typeof(other) != 'object' || other == null)) {
        return false
      }
      let propA = 0
      let propB = 0
      for (let prop in val) {
        propA++
      }
      for (let prop in other) {
        propB++
        if (!(prop in val) || !zhusi94.isEqual(val[prop], other[prop])) {
          return false
        }
      }
      return propA == propB
    },
    isNaN: function(val) {
      return Object.prototype.toString.call(val) === '[object Number]' && isNaN(val)
    },
    matches: function(source) {
      return function(object) {
        for (var key in source) {
          if (!zhusi94.isEqual(object[key], source[key])) {
            return false
          }
        }
        return true
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
        return zhusi94.property(iter)
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

      for (var item of collection) {
        if (f(item)) {
          return true
        }
      }
      return false
    },

    castArray: function(array) {
      if (arguments.length == 0) {
        return []
      }
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
    filter: function(collection, predicate = _.identity) {
      if (predicate == undefined) {
        return collection
      } else {
        var f = zhusi94.iteratee(predicate)
      }
      var result = []
      for (var i = 0; i < collection.length; i++) {
        if (f(collection[i])) {
          result.push(collection[i])
        }
      }
      return result
    },
    countBy: function(collection, iteratee = _.identity) {
      var result = {}
      if (iteratee == undefined) {
        for (var i = 0; i < collection.length; i++) {
          result[collection[i]] = 1
        }
      } else {
        var f = zhusi94.iteratee(iteratee)

        for (var i = 0; i < collection.length; i++) {
          if (f(collection[i]) in result) {
            result[f(collection[i])]++
          } else {
            result[f(collection[i])] = 1
          }
        }
      }
      return result
    },
    forEachRight: function(collection, iteratee = _.identity) {
      var r = []
      for (var key in collection) {
        r.unshift(key)
      }
      for (var i = 0; i < r.length; i++) {
        iteratee(collection[i])
      }
      return collection
    },



    //String方法：


    camelCase: function(string = '') {
      string = string.toLowerCase()
      return string.replace(/(?<=\s|[\_\-])[a-z]/g, function(s) {
          return s.toUpperCase()
        })
        .replace(/[\ \_\-]+|\s+/g, '')
        .replace(/^\w/, function(s) {
          return s.toLowerCase()
        })
    },

    capitalize: function(string = '') {
      string = string.toLowerCase()
      return string.replace(/^\w/, function(s) {
        return s.toUpperCase()
      })
    },
    endsWith: function(string = '', target, position = string.length) {
      return string[position - 1] == target
    },
    escape: function(string = '') {
      return string.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39")
    },
    escapeRegExp: function(string = '') {
      return string.replace(/([\^$.*+?()\[\]\{\}\|])/g, '\\$1')
    },

    kebabCase: function(string = '') {
      string = string.replace(/(?<=[a-z])(?=[A-Z])/g, '-')
      string = string.toLowerCase()
      return string.replace(/\-+|\_+|\s+/g, '-')
        .replace(/^\-+|\-+$/g, '')
    },
    lowerCase: function(string = '') {
      string = string.replace(/^(\s|[\-\_])+|(\s|[\-\_])+$/g, '')
        .replace(/(?<=[a-zA-Z])(\s|[\-\_])+(?=[a-zA-Z])|(?<=[a-z])(\s|[\-\_])*(?=[A-Z])/g, ' ')
      string = string.toLowerCase()
      return string
    },
    lowerFirst: function(string = '') {
      return string[0].toLowerCase() + string.slice(1)
    },
    pad: function(string = '', length = 0, chars = ' ') {
      var len = string.length
      if (len < length) {
        var c = length - len
        var m = Math.floor(c / 2)
        var h = c - m
        var cont = 0
        var p = ''
        for (var i = 0; i < m; i++) {
          p += chars[cont++]
          if (cont >= chars.length) {
            cont = 0
          }
        }
        string = p + string
        for (var i = 0; i < h; i++) {
          string += chars[cont++]
          if (cont >= chars.length) {
            cont = 0
          }
        }
        return string
      } else {
        return string
      }
    },

    padEnd: function(string = '', length = 0, chars = ' ') {
      var len = string.length
      if (len < length) {
        var c = length - len
        var cont = 0
        for (var i = 0; i < c; i++) {
          string += chars[cont++]
          if (cont >= chars.length) {
            cont = 0
          }
        }
        return string
      } else {
        return string
      }
    },

    padStart: function(string = '', length = 0, chars = ' ') {
      var len = string.length
      if (len < length) {
        var c = length - len
        var cont = 0
        var p = ''
        for (var i = 0; i < c; i++) {
          p += chars[cont++]
          if (cont >= chars.length) {
            cont = 0
          }
        }
        return p + string
      } else {
        return string
      }
    },

    repeat: function(string = '', n = 1) {
      var s = string
      if (n == 0) {
        return ''
      }
      for (var i = 2; i <= n; i++) {
        string += s
      }
      return string
    },
    replace: function(string = '', pattern, replacement) {
      return string.replace(pattern, replacement)
    },
    snakeCase(string = '') {
      string = string.replace(/(?<=[a-z])(?=[A-Z])/g, '_')
      string = string.toLowerCase()
      return string.replace(/^(\s|[\-\_])+|(\s|[\-\_])+$/g, '')
        .replace(/(?<=[a-z])(\s|[\-\_])+(?=[a-z])/g, '_')
    },
    split: function(string = '', separator, limit = Infinity) {
      var result = []
      var i = 0
      var j = 0
      var cont = 0
      while (j < string.length) {
        if (string[j] == separator) {
          result.push(string.slice(i, j))
          j++
          i = j
          cont++
          if (cont == limit) {
            return result
          }
        } else {
          j++
        }
      }
      if (string.slice(i) != '') {
        result.push(string.slice(i))
      }
      return result
    },
    startCase: function(string = '') {
      return string.replace(/(?<![a-zA-Z])[a-zA-Z]/g, function(s) {
          return s.toUpperCase()
        })
        .replace(/^(\s|[\-\_])+|(\s|[\-\_])+$/g, '')
        .replace(/(?!^)(\s|[\-\_])+|(?<=[a-z])(?=[A-Z])/g, ' ')
    },

    startsWith: function(string = '', target, position = 0) {
      return string[position] == target
    },
    toLower: function(string = '') {
      var s = string.split('')
      for (var i = 0; i < s.length; i++) {
        if (string.charCodeAt(i) >= 65 && string.charCodeAt(i) <= 90) {
          s[i] = String.fromCharCode(string.charCodeAt(i) + 32)
        }
      }
      return s.join('')
    },
    toUpper: function(string = '') {
      var s = string.split('')
      for (var i = 0; i < s.length; i++) {
        if (string.charCodeAt(i) >= 97 && string.charCodeAt(i) <= 122) {
          s[i] = String.fromCharCode(string.charCodeAt(i) - 32)
        }
      }
      return s.join('')
    },

    parseJson: function() {

      var i = 0
      var str
      return function parse(strInput) {
        i = 0
        str = strInput
        return parseval()
      }

      function parseval() {
        var c = str[i]
        if (c === '[') {
          return parseArray()
        } else if (c === '{') {
          return parseObject()
        } else if (c === '\"') {
          return parseString()
        } else if (c === 't') {
          return parseTrue()
        } else if (c === 'f') {
          return parseFalse()
        } else if (c === 'n') {
          return parseNull()
        } else {
          return parseNumber()
        }
      }

      function parseString() {
        for (var j = i + 1;; j++) {
          if (str[j] === '"') {
            break
          }
        }
        var result = str.slice(i + 1, j)
        i = j + 1
        return result
      }

      function parseTrue() {
        var token = str.slice(i, i + 4)
        if (token === 'true') {
          i += 4
          return true
        } else {
          throw new SyntaxEeeor('unexpected token' + i)
        }
      }

      function parseFalse() {
        var token = str.slice(i, i + 5)
        if (token === 'false') {
          i += 5
          return false
        } else {
          throw new SyntaxEeeor('unexpected token' + i)
        }
      }

      function parseNull() {
        var token = str.slice(i, i + 4)
        if (token === 'null') {
          i += 4
          return null
        } else {
          throw new SyntaxEeeor('unexpected token' + i)
        }
      }

      function parseArray() {
        i++
        var result = []
        var val
        if (str[i] === ']') {
          return result
        }
        for (;;) {
          val = parseval()
          result.push(val)
          if (str[i] === ',') {
            i++
            continue
          } else if (str[i] === ']') {
            i++
            return result
          }
        }
      }

      function parseObject() {
        i++
        if (str[i] === '}') {
          return {}
        }
        var result = {}
        while (true) {
          var key = parseString()
          i++
          var val = parseval()
          result[key] = val
          if (str[i] === ',') {
            i++
            continue
          } else if (str[i] === '}') {
            i++
            return result
          }
        }
      }

      function isNumberChar(c) {
        if (c >= '0' && c <= '9') {
          return true
        }
        if (c === '+' || c === '-' || c === '.' || c === 'e' || c === 'E') {
          return true
        }
        return false
      }

      function parseNumber() {
        var j = i
        while (isNumberChar(str[j])) {
          j++
        }
        var nString = str.slice(i, j)
        i = j
        return parseFloat(nString)
      }
    }(),

    trim: function(string = '', chars = ' ') {
      if (chars == ' ') {
        return string.trim()
      }
      var i = 0
      var j = string.length - 1

      while (chars.includes(string[i]) || chars == string[i]) {
        i++
      }
      while (chars.includes(string[j]) || chars == string[i]) {
        j--
      }

      return string.slice(i, j + 1)
    },
    trimEnd: function(string = '', chars = ' ') {
      if (chars == ' ') {
        return string.trimEnd()
      }
      var j = string.length - 1
      while (chars.includes(string[j])) {
        j--
      }
      return string.slice(0, j + 1)
    },
    trimStart(string = '', chars = ' ') {
      if (chars == ' ') {
        return string.trimStart()
      }
      var j = 0
      while (chars.includes(string[j])) {
        j++
      }
      return string.slice(j)
    },
    truncate: function(string = '', options = {}) {
      var length = 30
      var omission = '...'
      var separator = ''
      if (options.length) {
        length = options.length
      }
      if (options.omission) {
        omission = options.omission
      }
      if (options.separator) {
        if (typeof options.separator === 'string') {
          separator = options.separator
          string = string.split(separator)
          string.pop()
          string = string.join(separator)
        } else {
          separator = new RegExp(options.separator, 'g')
          separator = string.match(separator).pop()
          string = string.slice(0, string.lastIndexOf(separator))
        }
      }


      if (string.length + omission.length > length) {
        return string.slice(0, 30 - omission.length).concat(omission)
      } else {
        return string.concat(omission)
      }
    },

    unescape: function(string = '') {
      return string.replace(/(?<=\W)&amp;/, '\&')
        .replace(/(?<=\W)&lt;/, '\<')
        .replace(/(?<=\W)&gt;/, '\>')
        .replace(/(?<=\W)&quot;/, '')
    },
    upperCase: function(string = '') {
      return string.replace(/(?<=[a-z])(?=[A-Z])/g, ' ')
        .replace(/^(\s|\-|\_)+|(\s|\-|\_)+$/g, '')
        .replace(/(\s|\-|\_)+/g, ' ').toUpperCase()
    },
    upperFirst: function(string = '') {
      return string.replace(/^(\s|\-|\_)+|(\s|\-|\_)+$/g, '').replace(/^\w/, it => it.toUpperCase())
    },
    words: function(string = '', pattern) {
      if (pattern == undefined) {
        return string.match(/\b\w+\b/g)
      } else {
        return string.match(pattern)
      }
    },

    bindAll: function(object, ...methodNames) {
      for (var i = 0; i < methodNames.length; i++) {
        if (typeof methodNames[i] === 'string') {
          object[methodNames[i]] = object[methodNames[i]].bind(object)
        } else {
          object[methodNames[i][0]] = object[methodNames[i][0]].bind(object)
        }
      }
    },
    defaultTo: function(value, defaultValue) {
      if (zhusi94.isNaN(value)) {
        return defaultValue
      }
      if (value === null || value === undefined) {
        return defaultValue
      }
      return value
    },

    range(start = 0, end, step = 1) {
      var result = []
      if (arguments.length == 1) {
        end = arguments[0]
        start = 0
        step = 1
      }
      if (step < 0) {
        step = -step
      }
      if (step === 0) {
        var c = Math.abs(end - start)
        for (var i = 0; i < c; i++) {
          result.push(start)
        }
        return result
      }
      if (end >= start) {
        for (var i = start; i < end; i += step) {
          result.push(i)
        }
      } else {
        for (var i = start; i > end; i -= step) {
          result.push(i)
        }
      }
      return result
    },
    rangeRight(start = 0, end, step = 1) {
      var result = []
      if (arguments.length == 1) {
        end = arguments[0]
        start = 0
        step = 1
      }
      if (step < 0) {
        step = -step
      }
      if (step === 0) {
        var c = Math.abs(end - start)
        for (var i = 0; i < c; i++) {
          result.unshift(start)
        }
        return result
      }
      if (end >= start) {
        for (var i = start; i < end; i += step) {
          result.unshift(i)
        }
      } else {
        for (var i = start; i > end; i -= step) {
          result.unshift(i)
        }
      }
      return result
    },
    times: function(n, iteratee = zhusi94.identity) {
      var result = []
      for (var i = 0; i < n; i++) {
        result.push(iteratee(i))
      }
      return result
    },
    constant: function(value) {
      return function() {
        return value
      }
    },
    gt: function(value, other) {
      return value > other
    },
    gte: function(value, other) {
      return value >= other
    },
    isArguments: function(value) {
      return Object.prototype.toString.call(value) === '[object Arguments]'
    },
    isArrayBuffer: function(value) {
      return Object.prototype.toString.call(value) === '[object ArrayBuffer]'
    },
    isArrayLike: function(value) {
      return value.length !== undefined && typeof value !== 'function'
    },
    isArrayLikeObject: function(value) {
      return value.length !== undefined && typeof value === 'object'
    },
    isNil: function(value) {
      if (value !== value) {
        return false
      }
      if (value == null || value == undefined) {
        return true
      } else {
        return false
      }
    },
    isBoolean: function(value) {
      return Object.prototype.toString.call(value) === '[object Boolean]'
    },
    isDate: function(value) {
      return Object.prototype.toString.call(value) === '[object Date]'
    },
    isElement: function(value) {
      return value !== null && typeof value === 'object' && value.nodeType === Node.ELEMENT_NODE
    },
    isEmpty: function(value) {
      if (value === null) {
        return true
      }
      if (typeof value !== 'object') {
        return true
      } else {
        for (var key in value) {
          if (value.hasOwnProperty(key)) {
            return false
          }
        }
        return false
      }
    },
    isError: function(value) {
      return value instanceof Error
    },
    isFinite: function(value) {
      return Object.prototype.toString.call(value) === '[object Number]' && value !== Infinity && value !== -Infinity
    },
    isFunction: function(value) {
      return value instanceof Function
    },
    isInteger: function(value) {
      if (zhusi94.isFinite(value)) {
        var q = Math.abs(value)
        while (q >= 0) {
          q--
          if (q == 0) {
            return true
          }
        }
        return false
      } else {
        return false
      }
    },
    isLength: function(value) {
      return zhusi94.isInteger(value) && value >= 0
    },
    isMap: function(value) {
      return Object.prototype.toString.call(value) === '[object Map]'
    },
  }