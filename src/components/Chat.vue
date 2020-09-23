<!--
 * @Description: 聊天功能
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-10 14:51:44
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-23 17:54:50
-->
<template>
  <div class="chat-wrap">
    <div class="chat-content">
      <div :ref="index" v-for="(item, index) in messageList" :key="index + item.text" :class="item.source == 'computer' ? 'left' : 'right'" class="item">
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
      <el-input @keyup.enter="onConfirm" placeholder="请输入内容" v-model="text" class="input-text">
      </el-input>
      <el-button :disabled="text ==''" @click="onConfirm" type="primary">发送</el-button>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/utils/common'
import { TOURIST } from '@/constants/key'

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
      userid: '',
      messageList: [{
        source: 'computer',
        text: '您好，有什么可以帮您解答的吗？'
      }]
    }
  },
  created () {
    this.initWebSocket()
  },
  destroyed () {
    this.websock.close() // 离开路由之后断开websocket连接
  },
  methods: {
    getUserInfo() {},
    //在方法里调用 this.websocketsend()发送数据给服务器
    onConfirm () {
      this.messageList.push({
        source: 'user',
        text: this.text
      })
      this.websocketsend(this.text)
      this.text = ''
    },
    initWebSocket () { // 初始化weosocket
      let userid = ''
      if(getUser()){
        userid = getUser().uid
      }else if(sessionStorage.getItem(TOURIST)){
        userid = sessionStorage.getItem(TOURIST)
      }else{
        userid = new Date().getTime()
        sessionStorage.setItem(TOURIST, userid)
      }
      this.userid = userid
      this.websock = new WebSocket(`ws://39.106.115.196:8080/admin/webchat/${this.userid}/${this.userid}`)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onerror = this.websocketonerror
      this.websock.onopen = this.websocketonopen
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      // this.websocketsend()
    },
    websocketonerror () {
      console.log( 'WebSocket连接失败')
    },
    websocketonmessage (e) { // 数据接收
      if(e.data){
        let data = JSON.parse(e.data).data
        this.messageList.push({
          source: data.usertype === 'server' ? 'computer' : 'user',
          text: data.msg
        })
      }
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

.chat-wrap{
  height: 440px;
  width: 100%;
  border: 1px solid #e4e7f1;
  border-bottom: none;
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
      justify-content: flex-end;
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