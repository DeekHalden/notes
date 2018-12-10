<template lang='pug'>
include ./../../util/index.pug
+b.card
  +e.action-wrapper(:style='{"background-color": note.color ? note.color.hex : "transparent" }')
    +e.action-important(v-if='note.important') &#9733;
    slot(name='action')
      +e.action(v-if='action'
                @click='removeNote(index)') &times;
  
  +e.content-wrapper
    slot(name='title')
      +e.title(v-on='listeners') title: {{ note.title }}
        transition(name='fade')
          +e.title-actions(v-if='active && !$slots.default')
            +e.ROUTER-LINK.link(:to='"/note/details/"+index+"/"') details
            +e.ROUTER-LINK.link(:to='"/note/edit/"+index+"/"') edit
    +e.title--default(v-if='!$slots.default') date: {{ generateDate(note) }}
    +e.P.content(v-if='!$slots.default') description: {{ note.description }}
    slot
</template>

<script>
import { mapActions } from 'vuex'
import { generateDate } from '@/util/handlers'
export default {
  computed: {
    listeners() {
      return {
        'mouseenter': () => {
          this.active = true
        },
        'mouseleave': () => {
          this.active = false
        }
      }
    }
  },
  data() {
    return {
      active: false
    }
  },
  props: {
    action: {
      default: true
    },
    note: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: Number
    }
  },
  methods: {
    ...mapActions('notes', [
      'removeNote'
    ]),
    generateDate: generateDate
  }
}
</script>

<style lang="stylus">
.card
  position relative
  width 300px
  margin 0 auto
  box-shadow 5px 5px 25px 0 rgba(46,61,73,.2)
  transition .25s linear all
  padding 0 
  text-align left
  &--default
    width 100%
    padding 20px
    text-align center
  &:hover
    box-shadow 10px 10px 25px 0 rgba(46,61,73,.2)
    .card
      &__title
        color #000
  &__content-wrapper
    margin-top 10px
    padding 0 20px 20px
  &__title
    cursor pointer
    text-decoration none
    font-size 20px
    margin-bottom 10px
    text-transform uppercase
    transition .25s linear all
    color rgba(0,0,0,0.4)
    &--default
      font-size 12px
      color #000
    &-actions 
      display flex
      justify-content space-between
  &__link
    color black
    text-transform lowercase
    text-decoration none
    transition .25s linear all
    &:hover
      color red
  &__labels
    display flex
    flex-direction column
  &__label
    margin 5px 0
    font-size 12px
  &__action
    position absolute
    top 0
    right 0
    cursor pointer
    background-color #f4f3f5
    color red
    width 32px
    height 32px
    display flex
    align-items center
    justify-content center
    transition .25s linear all
    &:hover
      box-shadow 2px 2px 10px 0 rgba(46,61,73,.2)
    &-wrapper
      height 32px
    &-important
      height 32px
      display flex
      align-items center
      margin-left 10px
      color #fff
    &-text
      height 32px
      padding-right 42px
      padding-left 5px
      display flex
      align-items center
      justify-content center

</style>

