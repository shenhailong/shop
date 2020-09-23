<!--
 * @Description:
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-18 13:15:03
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-23 17:57:55
-->
<template>
  <video-player
    class="video-player-box"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    customEventName="customstatechangedeventname">
  </video-player>
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
        poster: this.poster
      }
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