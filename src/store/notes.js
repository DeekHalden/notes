import NotesService from '@/services/notes'

export default {
  namespaced: true,
  state: {
    notes: [],
    note: {}
  },
  getters: {
    sortedNotes(state) {
      return state.notes.sort((a, b) => {
        return b.important - a.important
      })
    }
  },
  actions: {
    async fetch({ commit }) {
      let data = (await NotesService.fetch())
      commit('SET_NOTES', data)
      return data
    },
    async fetchNote({ commit }, index) {
      let data = await NotesService.fetchNote(index)
      commit('SET_NOTE', data)
      return data
    },
    async editNote({ commit }, {note, id} ) {
      let data = await NotesService.editNote(note, id)
      commit('SET_NOTES', data)
      return data
    },
    async addNote({ commit }, { note }) {
      let data = await NotesService.post(note)
      commit('SET_NOTES', data)
      return data
    },
    async removeNote({ commit }, index) {
      let data = await NotesService.delete(index)
      commit('SET_NOTES', data)
    }
  },
  mutations: {
    SET_NOTES(state, payload) {
      state.notes = payload
    },
    ADD_NOTE(state, payload) {
      state.notes.push(payload)
    },
    SET_NOTE(state, payload) {
      state.note = payload
    }
  }
}