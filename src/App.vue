<template>
  <div id="app">
    <TopNavBar v-show="(  path==='/home' || path==='/personalFavorite' || path==='/blog' || path==='/chatroom' || path==='/archives' || path==='/message' )"></TopNavBar>
    <router-view/>
  </div>
</template>

<script>
import util from '@/libs/util'
import TopNavBar from './components/layout/TopNavBar'

export default {
  name: 'app',
  data () {
    return {
      path: '',
      myApp: new Vue() // 为了非父子组件共享值
    }
  },
  components: {
    TopNavBar
  },
  // 判断路由
  mounted () {
    this.path = this.$route.path
    // console.log(this.$route.path)
  },

  watch: {
    '$i18n.locale': 'i18nHandle',
    $route (to, from) {
      this.path = to.path
    }
  },
  created () {
    this.i18nHandle(this.$i18n.locale)
  },
  methods: {
    i18nHandle (val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
</style>
