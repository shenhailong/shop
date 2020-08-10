<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-24 10:01:11
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-10 16:21:22
-->
<template>
  <div id="app">
    <router-view />
    <div @click="dialogTableVisible = true" class="chat-router">
      <img src='../src/assets/chat.png' class="chat-img"/>
      在线咨询
    </div>
    <el-dialog title="在线咨询" :visible.sync="dialogTableVisible">
      <Chat />
    </el-dialog>
  </div>
</template>
<script>
import Chat from '@components/Chat'

export default {
  components: {
    Chat
  },
  data() {
    return {
      dialogTableVisible: false
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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

.chat-router{
  text-align: center;
  width: 64px;
  cursor: pointer;
  .chat-img{
    height: 32px;
    width: 32px;
    display: block;
    margin: 0 auto;
    margin-bottom: 5px;;
  }
}
</style>
