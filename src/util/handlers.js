export const successHandler = (data, $this) => {
  return new Promise(resolve => {
    if (data) {
      if (data.redirect) {
        setTimeout(() => {
          $this.$router.push('/')
        })
      }
      if (typeof data.meta == 'object') {
        let { title, content } = data.meta
        $this.$modal.show({
          template:
            `
            <div class="card card--default">
              <h2 class='card__title'>${title}</h2>
              <p class='card__content'>${content}</p>
            </div>          
            `,
          inheritAttrs: false

        }, {
          }, {
            width: 320,
            height: 'auto',
            adaptive: true,
            scollable: true
          })
      }
    }
    resolve()

  })
}

export const getDuplicates = (arr) =>{
  var duplicates = {}
  for (var i = 0; i < arr.length; i++) {
    if (duplicates.hasOwnProperty(arr[i])) {
      duplicates[arr[i]].push(i)
    } else if (arr.lastIndexOf(arr[i]) !== i) {
      duplicates[arr[i]] = [i]
    }
  }
  return duplicates
}

export const generateDate = (item) => {
    let day = new Date(item.timestamp).getDate()
    let month = new Date(item.timestamp).getMonth()
    let year = new Date(item.timestamp).getFullYear()
    if (day < 10) {
      day = `0${day}`
    }
    if (month < 10) {
      month = `0${month}`
    }
    if (!day || !month || !year) {
      return ''
    }
    return `${day}.${month + 1}.${year}` || '-'
}
