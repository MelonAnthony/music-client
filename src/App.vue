<template>
  <div id="app">
    <the-header></the-header>
    <router-view class="music-content"></router-view>
    <song-audio></song-audio>
    <play-bar></play-bar>
    <scroll-top></scroll-top>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'
import ScrollTop from './components/ScrollTop'
import TheFooter from './components/TheFooter'
import SongAudio from './components/SongAudio'
import PlayBar from './components/PlayBar'
export default {
  name: 'App',
  components: {
    TheHeader,
    ScrollTop,
    TheFooter,
    SongAudio,
    PlayBar
  }
}
</script>

<style  lang="scss" scoped>
@import './assets/css/app.scss';
</style>
