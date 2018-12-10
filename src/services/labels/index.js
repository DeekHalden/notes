export default {
  setLabels(labels) {
    return new Promise( (resolve, reject) => {
      localStorage.setItem('labels', JSON.stringify(labels))
      resolve(labels)
    })
  },
  fetch() {
    return new Promise((resolve, reject) => {
      let data = JSON.parse(localStorage.getItem('labels')) || []
      resolve(data)
    })
  },
  addLabel(label) {
    return new Promise((resolve, reject) => {
      let labels = JSON.parse(localStorage.getItem('labels')) || []
      let isInList = labels.find(l => l.title === label.title)
      if (isInList) {
        reject('Such label is already in list')
      } else {
        labels.push(label)
        localStorage.setItem('labels', JSON.stringify(labels))
        resolve(labels)
      }
    })
  },
  delete(index) {
    return new Promise( (resolve, reject) => {
      let data = JSON.parse(localStorage.getItem('labels'))
      data.splice(index, 1)
      localStorage.setItem('labels', JSON.stringify(data))
      resolve(data)
    })
  }
}