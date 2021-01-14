<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-24 10:01:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-14 17:04:35
-->
<template>
  <div id="app">
    <router-view />
    <div v-show="!hide" @click="dialogTableVisible = true" id="chat" class="chat-router">
      <img src='../src/assets/chat.png' class="chat-img"/>
      <p>在</p>
      <p>线</p>
      <p>咨</p>
      <p>询</p>
    </div>
    <el-dialog title="在线咨询" :visible.sync="dialogTableVisible">
      <Chat />
    </el-dialog>
  </div>
</template>
<script>
import Chat from '@components/Chat'
import { HIDE_CHAT_LIST } from '@/constants/common'

export default {
  components: {
    Chat
  },
  data() {
    return {
      dialogTableVisible: false,
      hide: true
    }
  },
  created() {
    let loading = document.getElementById('init-loading')
    if(loading != null){
      loading.remove()
    }
  },
  mounted() {
    this.hide = HIDE_CHAT_LIST.includes(this.$route)
  },
  watch: {
    $route(value) {
      this.hide = HIDE_CHAT_LIST.includes(value.name)
    }
  }
}
</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@media screen and (max-width:1400px){
 .chat-router{
    right: 10px!important;
    bottom: 120px!important;
  }
}

.chat-router{
  text-align: center;
  // width: 64px;
  cursor: pointer;
  position: fixed;
  right: 100px;
  bottom: 250px;
  z-index: 999;
  box-shadow: 0 6px 12px 0 rgba(0,0,0,.15);
  padding: 5px;
  font-size: 12px;
  .chat-img{
    height: 32px;
    width: 32px;
    display: block;
    margin: 0 auto;
    margin-bottom: 5px;;
  }
}
</style>
