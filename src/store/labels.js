import LabelsService from '@/services/labels'
export default {
  namespaced: true,
  state: {
    labels: [],
  },
  actions: {
    async setLabels({ commit }, labels) {
      let data = (await LabelsService.setLabels(labels))
      commit('SET_LABELS', data)
    },
    async fetch({ commit }) {
      let data = (await LabelsService.fetch())
      commit('SET_LABELS', data)
    },
    async removeLabel({ commit }, index) {
      let data = (await LabelsService.delete(index))
      commit('SET_LABELS', data)
    },
    async addLabel({ commit }, label) {
      let data = (await LabelsService.addLabel(label))
      commit('SET_LABELS', data)
      return data
    }
  },
  mutations: {
    SET_LABELS(state, payload) {
      state.labels = payload
    }
  }
}