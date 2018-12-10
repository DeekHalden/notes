export default {
  fetch() {
    return new Promise((resolve, reject) => {
      let data = JSON.parse(localStorage.getItem('categories')) || []
      resolve(data)
      if (!data.length) {
        reject('Not found')
      }
    })
  },
  createCategory(category) {
    return new Promise((resolve, reject) => {
      let data = JSON.parse(localStorage.getItem('categories')) || []

      let hasDuplicate = data.find(c => c.title === category.title)
      if (hasDuplicate) {
        reject('Such category alreeady exists.')
      } else {
        data.push(category)
        localStorage.setItem("categories", JSON.stringify(data))
        resolve(data)
      }
    })
  },
  editCategory(category, index) {
    return new Promise((resolve, reject) => {
      let data = JSON.parse(localStorage.getItem('categories')) || []
      data[index] = category
      localStorage.setItem("categories", JSON.stringify(data))
      resolve(data)
    })
  },
  deleteCategory(index) {
    return new Promise((resolve, reject) => {
      let data = JSON.parse(localStorage.getItem('categories')) || []
      data.splice(index, 1)
      localStorage.setItem("categories", JSON.stringify(data))
      resolve(data)
    })
  },
  getOne(index) {
    return new Promise((resolve, reject) => {
      let data = JSON.parse(localStorage.getItem('categories')) || []
      let category = data[index]
      resolve(category)
    })
  }
}

