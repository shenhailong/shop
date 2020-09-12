<!--
 * @Description:
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-18 13:15:03
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-10 18:27:52
-->
<template>
  <div>
    <!-- <el-dialog title="收货地址" :visible.sync="dialogTableVisible"> -->
      <video-player
        class="video-player-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        customEventName="customstatechangedeventname"
        @statechanged="playerStateChanged($event)"
        @ready="playerReadied">
      </video-player>
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  },
  props: {
    sources: {},
    poster: {}
  },
  data() {
    return {
      dialogTableVisible: true,
      playerOptions: {
        // videojs options
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: this.sources
        }],
        poster: this.poster,
      }
    }
  },
  mounted() {
    // console.log('this is current player instance object', this.player)
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
  }
}
</script>

<style lang="scss" >
.video-player-box{
  width: 100%;
}
.video-js{
  width: 100%;
}
</style>