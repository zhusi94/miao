function MySet(ary) {
  this.length = 0
  for (var i = 0; i < ary.length; i++) {
    if (ary[i] in this) {
      continue
    } else {
      this[this.length++] = ary[i]
    }
  }
}

MySet.prototype = {
  add: function(val) {
    if (!(val in this)) {
      this[this.length++] = val
    }
    return this
  },
  clear: function() {
    for (var key in this) {
      delete this[key]
      this.length--
    }
  },
  delete: function(val) {
    for (var key in this) {
      if (this[key] == val) {
        delete this[key]
        this.length--
          return true
      }
    }
    return false
  },
  has: function(val) {
    for (var key in this) {
      if (this[key] == val) {
        return true
      }
    }
    return false
  },
  forEach: function(f) {
    for (var key in this) {
      f(this[key], key, this)
    }
    return this
  },
}


function MyMap(ary) {
  for (var i = 0; i < ary.length; i++) {
    this[ary[i][0]] = ary[i][1]
  }
}


function MyArray(...values) {
  for (var i = 0; i < values.length; i++) {
    this[i] = values[i]
  }
  this.length = values.length
}

MyArray.prototype = {

  forEach: function(f) {
    for (var i = 0; i < this.length; i++) {
      f(this[i], i, this)
    }
    return this
  },
  push: function(...val) {
    for (var i = 0; i < val.length; i++) {
      this[this.length] = val[i]
      this.length++
    }
    return this.length
  },
  pop: function() {
    var result = this[this.length - 1]
    delete this[this.length - 1]
    this.length--
      return result
  },
  shift: function() {
    var result = this[0]
    for (var i = 0; i < this.length - 1; i++) {
      this[i] = this[i + 1]
    }
    delete this[this.length - 1]
    this.length--
      return result
  },
  unshift: function(...val) {
    for (var i = this.length + val.length - 1; i >= val.length; i--) {
      this[i] = this[i - val.length]
    }
    for (var i = 0; i < val.length; i++) {
      this[i] = val[i]
    }
    this.length += val.length
    return this.length
  },

  concat: function(...val) {
    for (var i = 0; i < val.length; i++) {
      if (val[i] instanceof MyArray) {
        for (var j = 0; j < val[i].length; j++) {
          this[this.length + j] = val[i][j]
        }
        this.length += val[i].length
      } else {
        this[this.length + i] = val[i]
        this.length++
      }
    }
  },

  insert: function(index, val) {
    this[this.length] = 0
    for (var i = this.length; i > index; i--) {
      this[i] = this[i - 1]
    }
    this[index] = val
    this.length--
  },

  every: function(f) {
    for (var i = 0; i < this.length; i++) {
      if (!f(this[i])) {
        return false
      }
    }
    return true
  },

  fill: function(val) {
    for (var i = 0; i < this.length; i++) {
      this[i] = val
    }
  },



  filter: function(text) {
    for (var i = 0; i < this.length; i++) {
      if (!text(this[i])) {
        this.splice(i, 1)
        i--
      }
    }
  },
  splice: function(start, len) {
    for (var i = start; i < this.length; i++) {
      this[i] = this[i + len]
    }

    for (var j = this.length - 1; j > this.length - 1 - len; j--) {
      delete this[j]
    }
    this.length -= len
    if (this.length < 0) {
      this.length = 0
    }
  },
  reverse: function() {
    for (var i = 0; i < this.length / 2; i++) {
      var t = this[i]
      this[i] = this[this.length - 1 - i]
      this[this.length - 1 - i] = t
    }
  },
  includes: function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) {
        return true
      }
    }
    return false
  },

  indexOf: function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) {
        return i
      }
    }
    return -1
  },

  slice: function(start = 0, end = this.length - 1) {
    if (start < 0) {
      start = this.length + start
    }
    if (end < 0) {
      end = this.length + end
    }
    var result = new MyArray()
    if (start >= end) {
      return result
    }
    for (var i = start; i < end; i++) {
      result.push(this[i])
    }
    return result
  },

  isMyArray: function(ary) {
    if (ary instanceof MyArray) {
      return true
    } else {
      return false
    }
  },
  reduce: function(f, initialValue) {
    var prev = initialValue
    for (var i = 0; i < this.length; i++) {
      prev = f(prev, this[i], i, this)
    }
    return prev
  },
}