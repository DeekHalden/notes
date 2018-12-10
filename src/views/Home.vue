<template lang='pug'>
include ./../util/index.pug
.container
  +b.row--wrap
    +e.el--default(v-for='(note, index) in notes'
              :key='index')
      ui-card(:note='note' :index='index')
</template>


<script>
import UiCard from '@/components/card/UiCard'
import { mapGetters } from 'vuex'
import store from '@/store'
import router from '@/router'
export default {
  components: {
    UiCard
  },
  watch: {
    notes(val) {
      if (!val.length) {
        router.push({name: 'create-note'})
      }
    }
  },
  computed: {
    ...mapGetters('notes', {
      notes: 'sortedNotes'
    }),
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch('notes/fetch')
      .then(notes => {
        if (!notes.length) {
          router.push({name: 'create-note'})
        } else {
          next()
        }
      })
      .catch(err => {
        console.error(err)
      })
    // fetch.catch(err => console.error(err))
    
  }
}
</script>

