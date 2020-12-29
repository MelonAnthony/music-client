<template>
  <div class="play-bar">
    <div class="kongjian">
      <!--上一首-->
      <div class="item">
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi"></use>
        </svg>
      </div>
      <!--播放-->
      <div class="item" @click="togglePlay">
        <svg class="icon">
          <use :xlink:href="playButtonUrl"></use>
        </svg>
      </div>
      <!--下一首-->
      <div class="item">
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi1"></use>
        </svg>
      </div>
      <!--歌曲图片-->
      <div class="item-img">
        <img :src="picUrl"/>
      </div>
      <!--播放进度-->
      <div class="playing-speed">
        <!--播放开始时间-->
        <div class="current-time">{{nowTime}}</div>
        <div class="progress-box">
          <!--<div class="intro">-->
            <!--青花瓷-周杰伦-->
          <!--</div>-->
          <div class="item-song-title">
            <div>{{this.title}}</div>
            <div>{{this.artist}}</div>
          </div>
          <div ref="progress" class="progress" @mousemove="mousemove">
             <!--进度条-->
            <div ref="bg" class="bg">
              <div ref="curProgress" class="cur-progress" :style="{width:curLength+'%'}"></div>
            </div>
             <!--拖动的点-->
            <div class="idot" ref="idot" :style="{left:curLength+'%'}" @mousedown="mousedown" @mouseup="mouseup"></div>
          </div>
        </div>
        <!--播放总时间-->
        <div class="left-time">{{songTime}}</div>
      </div>
      <!--音量-->
      <div class="item item-volume">
        <svg class="icon">
          <use xlink:href="#icon-yinliang1"></use>
        </svg>
      </div>
      <!--收藏-->
      <div class="item">
        <svg class="icon">
          <use xlink:href="#icon-xihuan-shi"></use>
        </svg>
      </div>
      <!--下载-->
      <div class="item">
        <svg class="icon">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
      </div>
      <!--播放列表-->
      <div class="item">
        <svg class="icon">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mixin} from '../mixins'
export default {
  name: 'PlayBar',
  mixins: [mixin],
  data () {
    return {
      nowTime: '00:00', // 当前播放时间
      songTime: '00:00', // 当前歌曲总时间
      curLength: 0, // 进度条的位置
      progressLength: 0, // 进度条的总长度
      mouseStartX: 0, // 拖拽开始的位置
      tag: false // 拖拽是否开始
    }
  },
  computed: {
    ...mapGetters([
      'isPlay',
      'id',
      'url',
      'playButtonUrl',
      'picUrl',
      'artist',
      'title',
      'duration', // 音乐时长
      'curTime'
    ])
  },
  watch: {
    // 监控播放状态的图标
    isPlay () {
      if (this.isPlay) {
        this.$store.commit('setPlayButtonUrl', '#icon-zanting')
      } else {
        this.$store.commit('setPlayButtonUrl', '#icon-bofang')
      }
    },
    curTime () {
      this.nowTime = this.parseTime(this.curTime)
      this.songTime = this.parseTime(this.duration)
      this.curLength = this.curTime / this.duration * 100
    }
  },
  mounted () {
    this.progressLength = this.$refs.progress.getBoundingClientRect().width
  },
  methods: {
    // 控制音乐播放、暂停
    togglePlay () {
      if (this.isPlay) {
        this.$store.commit('setIsPlay', false)
      } else {
        this.$store.commit('setIsPlay', true)
      }
    },
    parseTime (value) {
      let result = ''
      let hour = parseInt(value / 3600) // 时
      let minte = parseInt((value / 60) % 60) // 分
      let second = parseInt(value % 60) // 秒
      if (hour > 0) {
        if (hour < 10) {
          result += '0' + hour + ':'
        } else {
          result += hour + ':'
        }
      }
      if (minte >= 0) {
        if (minte < 10) {
          result += '0' + minte + ':'
        } else {
          result += minte + ':'
        }
      }
      if (second >= 0) {
        if (second < 10) {
          result += '0' + second
        } else {
          result += second
        }
      }
      return result
    },
    mousedown (e) {
      this.mouseStartX = e.clientX
      this.tag = true
    },
    mouseup () {
      this.tag = false
    },
    mousemove (e) {
      if (this.tag) {
        let movementX = e.clientX - this.mouseStartX
        this.curLength = this.$refs.curProgress.getBoundingClientRect().width
        let newPercent = ((movementX + this.curLength) / this.progressLength) * 100
        if (newPercent > 100) {
          newPercent = 100
        }
        this.curLength = newPercent
        this.mouseStartX = e.clientX
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/play-bar.scss";
</style>
