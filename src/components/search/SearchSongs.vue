<template>
  <div class="search-songs">
    <album-content :listOfSongs="listOfSongs"></album-content>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mixin} from '../../mixins'
import AlbumContent from '../AlbumContent'
export default {
  name: 'SearchSongs',
  components: {
    AlbumContent
  },
  mixins: [mixin],
  computed: {
    ...mapGetters([
      'listOfSongs'
    ])
  },
  mounted () {
    this.getSong()
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/search-songs.scss";
</style>
