<template lang="pug">
.form__control
  label.form__label.form__label--selector
    input.form__input(:value="val"
                      :name='$attrs.name'
                      type='checkbox'
                      v-model="checked"
                      v-validate='$attrs.validate'
                      @change="onChange")
    span.form__text
      slot(name="text") 
  slot(name='error')
    transition(name='fade')
      .form__error(v-if='errors.has($attrs.name)') {{ errors.first($attrs.name) }}
</template>

<script>
export default {
  inject: ["$validator"],
  props: ["value", "val", "label"],
  data() {
    return {
      checkedProxy: false
    }
  },
  computed: {
    checked: {
      get() {
        return this.value
      },
      set(val) {
        this.checkedProxy = val
      }
    }
  },
  methods: {
    onChange(e) {
      this.$emit("input", this.checkedProxy)
    }
  }
}
</script>

<style lang="stylus">
.form
  &__input
    &[type='checkbox']
      display none
      &:checked ~ .form__text
        &:after
          content '\2713' 
          top 50%
          transform translateY(-50%)
          position absolute
          left 4px
          
</style>
