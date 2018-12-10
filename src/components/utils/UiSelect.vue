<template lang="pug">
include ./../../util/index.pug
+b.form__control--styled(:data-disabled='style.data'
                          :style='style.style')
  label.form__label(:for='$attrs.name')
    .form__label-text(:class='{ "is-active": active }' v-if='$attrs.placeholder') {{ $attrs.placeholder }}
  multiselect(v-model='checked'
              :allow-empty="taggable ? true : false"
              :class='classes'
              :options='dropdownData'
              :name='$attrs.name'
              :searchable='true'
              :show-labels='false'
              :close-on-select='true'
              :id='$attrs.name'
              :multiple="multiple"
              :taggable='taggable'
              :group-values="groupValues",
              :group-label="groupLabel"
              :group-select="groupSelect"
              ref='multiselect'
              track-by='title',
              placeholder=''
              :label='"title" || "id"'
              @open='active = true'
              v-validate='$attrs.validate'
              
              @select='checkVal'
              @close='proxy.title || proxy.length ? active = true : active = false;$emit("input", proxy)')
    span(slot="noResult") {{ 'Oops! No elements found. Consider changing the search query.' }}
    template(slot="tag", slot-scope="{ option, remove }")
      .custom__tag
        p(style='line-height: 1').no-padding {{ option.title || option.id }}
        +b.custom__remove(@click.stop.prevent="remove(option)"
                          style='line-height: 1').btn__icon--warning.--regular.icon-close &times;
  slot(name='error')
    transition(name='fade')
      .form__error(v-if='errors.has($attrs.name)') {{ errors.first($attrs.name) }}
      
    
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  // inject: ["$validator"],
  components: {
    Multiselect,
  },
  computed: {
    transform() {
      return this.proxy.length ? 'top:55px;position:relative;' : ''
    },
    style() {
      if (this.relations) {
        return {
          style: {
            'pointer-events': !this.relatedTo ? 'none' : 'all',
          },
          data: !this.relatedTo ? true : false,
        }
      }
      return {
        style: '',
        data: false,
      }
    },
    classes() {
      return 'form__input'
    },
    checked: {
      get() {
        this.proxy = this.val
        return this.proxy
      },
      set(val) {
        this.proxy = val
      },
    },
  },
  watch: {
    val: {
      handler(nval) {
        if (!nval) {
          this.active = false
        } else {
          this.active = true
        }
      },
      deep: true,
      immediate: true,
    },
  },
  props: {
    taggable: {
      default: false,
    },
    multiple: {
      default: false,
    },
    relations: {
      default: false,
    },
    relatedTo: {
      default: false,
    },
    groupValues: {
      default: ''
    },
    groupLabel: {
      default: ''
    },
    groupSelect: {
      default: ''
    },
    val: {
      required: true,
      default: () => {},
    },
    dropdownData: {
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      active: false,
      proxy: '',
    }
  },
  methods: {
    checkVal(event) {
      if (event.name != this.proxy.name) {
        this.$emit('change')
      }
      
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        id: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      }
      this.options.push(tag)
      this.checked.push(tag)
    },
  },
}
</script>

<style lang="stylus">
.multiselect,
.multiselect__input,
.multiselect__option
  
  width 100%
  border none
  font-size 13
  padding-left 20px
  color $color-darker
  font-family: $font-montserrat
  transition: .25s linear all
li
  list-style-type none
.multiselect
  padding-left 0
  background-color #f6f7f9
  // position relative
  // z-index 0
  &:before
    content 'v'
    font-size 12px
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    right: 10px;
    color: red;
    transition: .25s linear all
  &--active
    &:before
      transform: translateY(-50%) rotate(180deg);
    .multiselect__input
      width 100% !important
  &--no-padding
    .multiselect
      color: inherit
      &__single
        padding-left 0

  &--tiny
    .multiselect
      &__option
        height 30px
        line-height 30px !important
        font-size 12px
        padding-left 5px !important
      &__tags
        line-height 30px
      &__single,
      &__input
        line-height 30px
        height 30px
      
  &__tags
    line-height 42px
    &-wrap
      display flex
      flex-wrap: wrap
      align-items: center
      padding-right 20px
      min-height 42px
  


  &__tag
    padding 12px 16px
  &__single
    padding-left 20px
    height 42px
    overflow hidden
    display block
  &__input,
  &__element
    overflow hidden
  &__input
    height 42px
  &__element
    max-height 42px 
  &__element .multiselect__option,
  &__option
    background-color #f6f7f9
    transition: none
    line-height 42px
    z-index 100
    position relative
    list-style-type none
    border-top 1px solid rgba(204,204,204,.54)
    border-bottom 1px solid rgba(204,204,204,.54)
    &:hover
      color $color-warning
    &:focus
      outline none
  &__option
    line-height initial
  
    &--group
      font-weight 700
  &__placeholder
    padding-left 20px
  &__content
    width 100%
    &-wrapper
      position absolute
      top 100%
      width 100%
  &__option
    cursor pointer
    display block

  
</style>


