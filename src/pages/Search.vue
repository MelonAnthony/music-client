<template>
  <div class="search">
    <nav class="searchList-nav" ref="change">
        <span :class="{isActive: toggle == 'SongLists'}" @click="handleChangeView('SongLists')">歌单</span>
        <span :class="{isActive: toggle == 'Songs'}" @click="handleChangeView('Songs')">歌曲</span>
    </nav>
    <component :is="currentView"></component>
  </div>
</template>

<script>
import SearchSongLists from '../components/search/SearchSongLists'
import SearchSongs from '../components/search/SearchSongs'
export default {
  name: 'Search',
  data () {
    return {
      keywords: '',
      toggle: 'Songs',
      currentView: 'searchSongs'
    }
  },
  created () {
    this.keywords = this.$route.query.keywords
  },
  components: {
    SearchSongLists,
    SearchSongs
  },
  methods: {
    handleChangeView (tab) {
      this.currentView = 'search' + tab
      this.toggle = tab
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/search';
</style>
