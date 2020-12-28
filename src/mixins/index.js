import {likeSongOfName} from '../api'

export const mixin = {
  methods: {
    // 提示信息
    notify (title, type) {
      this.$notify({
        title: title,
        type: type
      })
    },
    // 获取图片地址
    attachImageUrl (srcUrl) {
      return srcUrl ? this.$store.state.configure.HOST + srcUrl : '../assets/img/user.jpg'
    },
    // 根据歌曲名模糊查询
    getSong () {
      if (!this.$route.query.keywords) {
        this.$store.commit('setListOfSongs', [])
        this.notify('您输入的内容为空', 'warning')
      } else {
        likeSongOfName(this.$route.query.keywords).then(res => {
          if (!res.data.length) {
            this.$store.commit('setListOfSongs', [])
            this.notify('系统暂无符合条件的歌曲', 'warning')
          } else {
            this.$store.commit('setListOfSongs', res.data)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 获取名字前半部分
    replaceLName (str) {
      let arr = str.split('-')
      return arr[0]
    },
    // 获取名字后半部分
    replaceFName (str) {
      let arr = str.split('-')
      return arr[1]
    },
    // 播放
    toplay: function (id, url, pic, index, name, lyric) {
      this.$store.commit('setId', id)
      this.$store.commit('setUrl', this.$store.state.configure.HOST + url)
      this.$store.commit('setPicUrl', this.$store.state.configure.HOST + pic)
      this.$store.commit('setListIndex', index)
      this.$store.commit('setTitle', this.replaceFName(name))
      this.$store.commit('setArtist', this.replaceLName(name))
      this.$store.commit('setLyric', lyric)
    }
  }
}
