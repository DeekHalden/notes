<template lang='pug'>
include ./util/index.pug
#app
  +b.nav
    +e.ROUTER-LINK.link(to='/') All notes
    +e.ROUTER-LINK.link(to='/note/create/') Add note
    +e.ROUTER-LINK.link(to='/labels/storage/') labels storage
    +e.ROUTER-LINK.link(to='/categories/storage/') categories storage
  transition(:name='transitionName' mode='out-in')
    router-view.view
  modals-container
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('labels', ['labels']),
  },
  methods: {
    ...mapActions('labels', [
      'setLabels', 'fetch'
    ]),
    
  },
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  beforeRouteUpdate(to, from, next) {
    let toDepth = to.meta.order
    let fromDepth = from.meta.order
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    
    next()
  },
  async mounted() {
    await this.fetch()
    
    if (!this.labels.length) {
      this.setLabels([
        { title: 'Images' },
        { title: 'Containers' },
        { title: 'Local daemons' },
        { title: 'Volumes' },
        { title: 'Networks' },
        { title: 'Swarm nodes' },
        { title: 'Swarm services' }
      ]);
    }
  }
}
</script>

<style lang='stylus'>

* 
  margin 0
  padding 0
  box-sizing border-box

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50


.container 
  
  margin 0 auto
  padding-left 5px
  padding-right 5px
  width 100%
  @media (min-width 576px)
    width 100%
    padding-left 15px
    padding-right 15px
  @media (min-width 768px)
    width 720px	
  @media (min-width 992px)
    width 960px	
  @media (min-width 1200px)
    width 1170px
  &__title
    text-align center
    margin-bottom 10px

.nav
  margin 10px auto 10px
  display flex
  justify-content center
  &__link
    color inherit
    margin 0 10px
    text-decoration none
    text-transform uppercase
    font-size 14px
    font-weight 700
    &.router-link-exact-active
      color red
      
.form 
  width: 300px
  margin: 0 auto

  &__title 
    text-align: center
    margin-bottom: 10px

.row
  display flex
  // justify-content space-between
  align-items flex-start
  margin 0 -10px
  @media(min-width: 576px)
    margin 0 -15px
  &--wrap
    flex-wrap wrap

  &__el
    width 100%
    padding 15px 10px
    justify-content flex-start
    @media(min-width: 576px)
      padding 15px
    &--default
      width auto
      margin 0 auto
      @media(min-width: 960px)
        margin 0 10px
    &--50
      @media (min-width 768px)
        width 50%
    &--33
      @media (min-width 768px)
        width 33%


.view 
  transition: all .5s cubic-bezier(.55,0,.1,1);

.slide-left-enter, .slide-right-leave-active 
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);

.slide-left-leave-active, .slide-right-enter 
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);


.fade-enter-active, .fade-leave-active 
  transition opacity .5s ease

.fade-enter, .fade-leave-active 
  opacity 0


.custom
  &__tag
    position: relative;
    display: inline-flex;
    padding: 4px 10px 4px 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: #fff;
    line-height: 1;
    background: #41b883;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
  &__remove
    margin-left 5px
    cursor pointer




    
</style>
