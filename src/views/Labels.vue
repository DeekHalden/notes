<template lang="pug">
include ./../util/index.pug
+b.container
  +e.H2.title Labels
  ui-create-label
  +b.row--wrap
    +e.el--default(v-for='(label, index) in labels')    
      +b.card
        +e.action-wrapper
          +e.action-text {{ label.title }}
          +e.action(@click='removeLabel(index)') &times;

</template>

<script>
import UiCreateLabel from '@/components/label/UiCreateLabel'
import { mapState, mapActions } from "vuex";
export default {
  components: {
    UiCreateLabel
  },
  computed: {
    ...mapState("labels", ["labels"])
  },
  methods: {
    ...mapActions('labels', [
      'removeLabel'
    ])
  }
};
</script>
