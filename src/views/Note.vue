<template lang="pug">
include ./../util/index.pug
+b.container

  +e.H2.title note {{ note.title }}
  ui-card(:note='note'
          :index='-Infinity'
          :action='false')
    template(slot='title')
      +b-context('card')
        +e.H2.title title: {{ note.title }}
        +e.title--default date: {{ generateDate(note) }}
        ui-accordion(:collapsable='true',
                    :menu='false')
          .expander(slot-scope='{activeState, toggleActive, collapse, style}')
            ui-click-outside(:do='collapse')
              span
                a.expander__title(@click.prevent='toggleActive')
                  span Categories
                  span.expander__icon {{ style.style }}
                transition(name='fade')
                  div(v-if='activeState')
                    .custom__tag(v-for='(category, index) in note.categories'
                        :key='index') {{ category.title }}

        ui-accordion(:collapsable='true',
                    :menu='false')
          .expander(slot-scope='{activeState, toggleActive, collapse, style}')
            ui-click-outside(:do='collapse')
              span
                a.expander__title(@click.prevent='toggleActive')
                  span Labels
                  span.expander__icon {{ style.style }}
                transition(name='fade')
                  div(v-if='activeState')
                    .custom__tag(v-for='(label, index) in note.labels'
                        :key='index') {{ label.title }}
    


</template>

<script>
import UiAccordion from '@/components/utils/UiAccordion'
import UiClickOutside from '@/components/utils/UiClickOutside'
import { mapActions, mapState } from 'vuex'
import UiCard from '@/components/card/UiCard.vue'
import { generateDate } from '@/util/handlers'
export default {
  components: {
    UiAccordion,
    UiClickOutside,
    UiCard
  },
  computed: {
    ...mapState('notes', [
      'note'
    ]),
    id() {
      return this.$route.params.id
    },
    
  },
  methods: {
    ...mapActions('notes', [
      'fetchNote'
    ]),
    generateDate: generateDate
  },
  created() {
    this.fetchNote(this.id)
  }
}
</script>

