export default {
  fetch() {
    return new Promise((resolve, reject) => {
      let data = JSON.parse(localStorage.getItem('notes')) || []
      resolve(data)
    })
  },
  post(note) {
    return new Promise((resolve, reject) => {
      let data = JSON.parse(localStorage.getItem('notes')) || []
      data.push(note)
      localStorage.setItem("notes", JSON.stringify(data))
      resolve(data)
    })
  },
  fetchNote(index) {
    return new Promise((resolve, reject) => {
      let data = JSON.parse(localStorage.getItem('notes')) || []
      let note = data[index]
      resolve(note)
    })
  },
  editNote(note, index) {
    return new Promise((resolve, reject) => {
      let data = JSON.parse(localStorage.getItem('notes')) || []
      data[index] = note
      localStorage.setItem("notes", JSON.stringify(data))
      resolve(data)
    })
  },
  delete(index) {
    return new Promise((resolve, reject) => {
      if (index > -1) {
        let data = JSON.parse(localStorage.getItem('notes')) || []
        data.splice(index, 1) 
        localStorage.setItem("notes", JSON.stringify(data))
        resolve(data)
        reject('Unable to perform this action')
      }
      reject('Unable to perform this action')
    })
  }
}