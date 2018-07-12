  var zhusi94 = {

      chunk: function(array, [size = 1]) {

        let result = []
        let a = []
        let i = 0
        while (1) {
          i = 0
          while (i < Math.min(size, array.length) {
              a.push(array.shift())
              i++
            }
            result.push(a)
          }

          return result
        }



      }