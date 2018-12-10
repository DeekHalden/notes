<template lang='pug'>
.form__control
  label.form__label 
    .form__label-text(:class='{ "is-active": active || masked }' v-if='$attrs.placeholder') {{ $attrs.placeholder }}
    textarea.form__input(v-if='attrs.type === "textarea"'
              v-bind='attrs'
              v-on='listeners'
              v-validate="$attrs.validate"
              ref='input'
              :value='val'
              :class='{"is-error": errors.has($attrs.name)}')
    input.form__input(v-bind='attrs'
                      v-on='listeners'
                      :placeholder='pHolder'
                      v-else
                      v-validate="$attrs.validate"
                      :disabled='$attrs.disabled'
                      ref='input'
                      :value='val'
                      :class='{"is-error": errors.has($attrs.name)} || customClass')
  .form__input-icon(v-if='$slots.icon')
    slot(name='icon')
  slot(name='error')
    transition(name='fade')
      .form__error(v-if='errors.has($attrs.name) || customClass') {{ errors.first($attrs.name) || _('Passwords don\'t match')}}
</template>

<script>
import { inputMixin } from './input'
export default {
  inheritAttrs: false,
  watch: {
    val(value) {
      if (value && (value).toString().trim().length) {
        this.active = true
        this.$nextTick(() => {
          this.active = true
        })
      } else {
        this.active = false
        this.$nextTick(() => {
          this.active = false
        })
      }
    }
  },
  props: {
    pHolder: {
      default: null
    },
    inputType: {
      default: '!number'  
    },
    val: {
      default: () => {},
    },
    customClass: {
      default: ''
    },
    masked: {
      default: false
    }
  },
  inject: ['$validator'],
  mixins: [ inputMixin ],
  data() {
    return {
      active: false
    }
  },
  mounted() {
    if (this.val && this.val.toString().trim().length) {
        this.active = true
        this.$nextTick(() => {
          this.active = true
        })
      } else {
        this.active = false
        this.$nextTick(() => {
          this.active = false
        })
      }
  }
}
</script>

<style lang="stylus">
.form
  &__control
    position relative
    margin-bottom 20px 
  &__input
    &[type='text'], 
    &[type='number'],
    &[type='email'],
    &[type='password']
      height 32px
      width 100%
      border none
      font-size 14px
      padding-left 10px
      transition: .25s linear all
      background-color #f4f3f5
      &:focus 
        outline none
    &[type='textarea']
      background-color #f4f3f5
      height 128px
      width 100%
      border none
      font-size 14px      
      padding-left 10px
      padding-top 15px
      resize none
  &__label
    cursor pointer
    position relative
    z-index 1
    display block
    color $color-light
    &-text
      position absolute
      top 16px
      transform: translateY(-50%)
      left 10px
      transition: .25s linear all
      font-size 14px
      &.is-active
        transform: translateY(-200%) 
        left 0
  &__text
    padding-left 32px
    display inline-block
    &:before
      content ''
      left 0
      top 50%
      transform translateY(-50%)
      box-shadow inset -2px 1px 0 rgba(41,41,41,.08)
      background-color #f6f7f9
      height 23px
      width 23px
      position absolute
  &__error
    color red

  &__input-icon
    position absolute
    top 0%
    cursor pointer
    right 10px
    transform: translateY(-0%)
    z-index 10
    color red
    height 32px
    display flex
    align-items center




</style>

