import CategoriesService from '@/services/categories'

export default {
  namespaced: true,
  state: {
    categories: [],
    category: {}
  },
  actions: {
    async setCategory({ commit }, index) {
      let data = (await CategoriesService.getOne(index))
      data.index = index
      commit('SET_CATEGORY', data)
    },
    async fetch({commit}) {
      let data = (await CategoriesService.fetch())
      commit('SET_CATEGORIES', data)
    },
    async postCategory({ commit }, { category }) {
      let data = (await CategoriesService.createCategory(category))
      commit('SET_CATEGORIES', data)
    },
    async editCategory({ commit }, { category, index }) {
      let data = (await CategoriesService.editCategory(category, index))
      commit('SET_CATEGORIES', data)
    },
    async deleteCategory({ commit }, index) {
      let data = (await CategoriesService.deleteCategory(index))
      commit('SET_CATEGORIES', data)
    }
  },
  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    SET_CATEGORY(state, payload) {
      state.category = payload
    }
  },
}
