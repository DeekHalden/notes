<template lang="pug">
.form__control
  label.form__label.form__label--selector
    input.form__input(v-bind='attrs'
                      v-on='listeners'
                      :value='val'
                      :checked='value === val'
                      v-validate='$attrs.validate')
    span.form__text
      slot(name="text") 
  slot(name='error')
    transition(name='fade')
      .form__error(v-if='errors.has($attrs.name)') {{ errors.first($attrs.name) }}
</template>

<script>
import {inputMixin} from './input'
export default {
  inject: ['$validator'],
  mixins: [ inputMixin ],
  props: {
    val: {
      default: () => {}
    },
    value: {
      default: () => {}
    }
  },
}
</script>

<style lang="stylus">
.form
  
  &__input
    &[type='radio']
      display none
      & ~ .form__text
        &:before
          border-radius 50%
      &:checked ~ .form__text
        &:after
          transform translateY(-50%)
          content ''
          width 9px 
          border-radius 50%
          height 9px 
          background-color red
          position absolute
          top 50%
          left 7px
</style>
