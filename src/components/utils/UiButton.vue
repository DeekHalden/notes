<template lang="pug">
include ./../../util/index.pug
+b.btn-wrapper(:class='$attrs.class'
                v-on='listeners')
  +b.COMPONENT(:type='$attrs.type'
                :is='component'
                v-bind='$attrs'
                type='button'
                :class='btnClass').btn
    slot
</template>


<script>
export default {
  props: {
    'btnClass': {
      type: String
    },
    'componentType': {
      type: String
    }
  },
  computed: {
    // loadingState() {
    //   if (this.isLoading) {
    //     return this.isLoading.state || false
    //   }
    // },
    component() {
      return this.componentType == 'router-link' ? 'router-link' : 'button'
    },
    listeners() {
      return {
        ...this.$listeners,
        input: ($event) => {
          this.$emit('click')
        }
      }
    }

  }
}
</script>

<style lang="stylus">
.btn-wrapper
  width 100% 
  height 42px


.btn
  display flex
  justify-content center
  width 100%
  height 100%
  cursor pointer
  text-align: center
  
  font-size 14px
  background-color transparent
  font-weight bold
  border none
  text-transform uppercase
  transition: .25s linear all
  box-shadow 5px 5px 25px 0 rgba(46,61,73,.2)
  &--success
    background-color #00804D
    color #fff
  &:focus
    outline none
  &:hover
    box-shadow 15px 15px 25px 0 rgba(46,61,73,.2)
</style>

