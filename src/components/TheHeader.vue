<template>
  <div class="the-header">
    <div class="header-logo" @click="goHome">
      <svg class="icon">
        <use xlink:href ="#icon-erji"></use>
      </svg>
      <span>music</span>
    </div>
    <ul class="navbar">
      <li v-for="(item, index) in navMsg" :class="{active:item.name == activeName}" :key="index" @click="goPage(item.path,item.name)">
        {{item.name}}
      </li>
      <li>
        <div class="header-search">
          <input type="text" placeholder="搜索音乐" v-model="keywords" @keyup.enter="goSearch()"/>
          <div class="search-btn" @click="goSearch()">
            <svg class="icon">
              <use xlink:href ="#icon-sousuo"></use>
            </svg>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {navMsg} from '../assets/data/header'
export default {
  name: 'the-header',
  data () {
    return {
      navMsg: [],
      keywords: ''
    }
  },
  computed: {
    ...mapGetters([
      'activeName'
    ])
  },
  methods: {
    goHome () {
      this.$router.push({path: '/'})
    },
    goPage (path, name) {
      this.$store.commit('setActiveNames', name)
      this.$router.push({path: path})
    },
    goSearch () {
      console.log('search')
      this.$router.push({ path: '/search', query: {keywords: this.keywords} })
    }
  },
  created () {
    this.navMsg = navMsg
    console.log('navMsg' + this.navMsg)
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/the-header.scss';
</style>
