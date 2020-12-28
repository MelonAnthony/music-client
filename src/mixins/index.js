import {likeSongOfName} from '../api'

export const mixin = {
  methods: {
    // 获取图片地址
    attachImageUrl (srcUrl) {
      return srcUrl ? this.$store.state.configure.HOST + srcUrl : '../assets/img/user.jpg'
    },
    getSong () {
      if (!this.$route.query.keywords) {
        this.notify('您输入的内容为空', 'warning')
      } else {
        likeSongOfName(this.$route.query.keywords).then(res => {
          if (!res.data.length) {
            this.notify('系统暂无符合条件的歌曲', 'warning')
          } else {

          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
