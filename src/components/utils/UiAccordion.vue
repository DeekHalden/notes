<script>
export default {
  data() {
    return {
      activeState: this.active
    }
  },
  computed: {
    style() {
      if (this.menu === true) {
        return this.activeState ? 'transform: rotate(180deg)' : ''
      }
      return {
        style: this.activeState ? '-' : '+',
        active: window.innerWidth < 992 ? 1 : 0
      }
    }
  },
  props: {
    active: {
      default: false
    },
    collapsable: {
      default: false
    },
    menu: {
      default: false
    }
  },
  methods: {
    resizeHandler() {
      if (!this.menu) {
        if (window.innerWidth < 992) {
          this.activeState = false
        } else {
          this.activeState = true
        }
      }
    },
    toggleActive(optional) {
      if (optional === 'resizable') {
        if (window.innerWidth > 992) {
          return
        }
      } 
      this.activeState = !this.activeState 
    },
  },
  created() {
    if (window.innerWidth < 992) {
      this.activeState = false
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeHandler, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler, { passive: true })
  },
  render(h) {
    return this.$scopedSlots.default({
      style: this.style,
      activeState: this.activeState,
      toggleActive: this.toggleActive,
      collapse: () => {
        this.activeState = false
      }
    })
  }
}
</script>

<style lang="stylus">
.expander
  margin 10px 0
    
  &__title
    display flex
    align-items: center
    cursor pointer
    margin-bottom 10px

  &__icon
    display inline-block
    margin-left 5px
    transition .25s linear all
    color red
    font-size 14px
</style>
