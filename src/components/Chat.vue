<!--
 * @Description: 聊天功能
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-10 14:51:44
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-10 17:29:15
-->
<template>
  <div class="chat-wrap">
    <div class="chat-content">
      <div v-for="(item, index) in messageList" :key="index + item.text" :class="item.source == 'computer' ? 'left' : 'right'" class="item">
        <div v-if="item.source == 'computer'" class="computer">
          <div class="computer-img"></div>
          <div class="text">{{item.text}}</div>
        </div>
        <div v-else class="user">
          <div class="text">{{item.text}}</div>
          <div class="user-img"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-input placeholder="请输入内容" v-model="text" class="input-text">
      </el-input>
      <el-button :disabled="text ==''" @click="onConfirm" type="primary">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      websocket: null,
      text: '',
      messageList: [{
        source: 'computer',
        text: '您好，有什么可以帮您解答的吗？'
      }, {
        source: 'user',
        text: '我先sss'
      }]
    }
  },
  created () {
    console.log('created')
    this.initWebSocket()
  },
  destroyed () {
    this.websock.close() // 离开路由之后断开websocket连接
  },
  methods: {
    getUserInfo() {},
    //在方法里调用 this.websocketsend()发送数据给服务器
    onConfirm () {
      let data = {
        code: 1,
        item: '传输的数据'
      }
      this.websocketsend(JSON.stringify(data))
      this.messageList.push({
        source: 'user',
        text: this.text
      })
      this.text = ''
    },
    /*
    */
    initWebSocket () { // 初始化weosocket
      let userinfo = this.getUserInfo()
      let username = userinfo
      this.websock = new WebSocket('ws://' + 'baseURL' + '/websocket/' + username)

      this.websock.onmessage = this.websocketonmessage
      this.websock.onerror = this.websocketonerror
      this.websock.onopen = this.websocketonopen
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      let data = {
        code: 0,
        msg: '这是client：初次连接'
      }
      this.websocketsend(JSON.stringify(data))
    },
    websocketonerror () {
      console.log( 'WebSocket连接失败')
    },
    websocketonmessage (e) { // 数据接收
      console.log('数据接收' + e.data)
    },
    websocketsend (Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose (e) {  // 关闭
      console.log('已关闭连接', e)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/scss/utils/theme.scss';

.chat-wrap{
  height: 440px;
  width: 100%;
  border: 1px solid #999;
  border-radius: 6px;
  .chat-content{
    height: 400px;
    width: 100%;
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;

    .left{
      display: flex;
    }

    .right{
      display: flex;
      justify-content: flex-end;
    }
  }

  .item{
    font-size: 12px;
    margin-bottom: 10px;
    .computer{
      display: flex;
      .text{
        padding: 12px;
        border-radius: 10px;
        color: #333333;
        max-width: 300px;
        background-color: #f3f4f7;
        border-radius: 0 8px 8px;
        word-break: break-all;
      }
      .computer-img{
        height: 32px;
        width: 32px;
        border-radius: 50%;
        background: url(~@/assets/logo.png) no-repeat;
        background-size: cover;
        margin-right: 5px;
      }
    }

    .user{
      display: flex;
      justify-content: end;
      .text{
        padding: 12px;
        color: #ffffff;
        background: $color-primary;
        max-width: 300px;
        border-radius: 8px 0 8px 8px;
        word-break: break-all;
      }
      .user-img{
        height: 32px;
        width: 32px;
        border-radius: 50%;
        background: url(~@/assets/user.png) no-repeat;
        background-size: cover;
        margin-left: 5px;
      }
    }
  }

  .footer{
    display: flex;
    width: 100%;

    .input-text{
      flex: 1;
    }
  }
}
</style>