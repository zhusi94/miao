function MySet(...ary) {
  this.length = 0
  if (!ary) {
    return
  }

  for (var i = 0; i < ary.length; i++) {
    if (!(ary[i] in this)) {
      this[i] = ary[i]
      this.length++
    }
  }
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
  push: function(val) {
    this[this.length] = val
    this.length++
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
  unshift: function(val) {
    for (var i = this.length; i > 0; i--) {
      this[i] = this[i - 1]
    }
    this[0] = val
    this.length--
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

  forEach: function(f) {
    for (var i = 0; i < this.length; i++) {
      f(this[i])
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
  splice: function(start, len = 1) {
    for (var i = start; i < this.length; i++) {
      this[i] = this[i + len]
    }

    for (var j = this.length - 1; j > this.length - 1 - len; j--) {
      delete this[j]
    }
    this.length -= len
  },
}