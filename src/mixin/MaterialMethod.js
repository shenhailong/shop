/*
 * @Description:
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-09-14 09:47:28
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-29 10:57:30
 */
import NavBar from '@components/NavBar'
import VideoPlayer from '@components/VideoPlayer'
import { getUser } from '@/utils/common'

const MaterialMethod = {
  components: {
    NavBar,
    VideoPlayer
  },
  data() {
    return {
      list: [],
      searchString: '',
      curPage: 1, // 当前页
      pageSize: 12,
      total: 0,
      loading: false,
      resurl: '',
      player: false,
      poster: ''
    }
  },
  methods: {
    currentChange(value) {
      this.curPage = value
      this.getList()
    },
    preview(id, level) {
      if(level !== undefined){
        this.needLogin(id, level)
      }else{
        this.getDetail(id)
      }
    },
    play(id, level) {
      if(level !== undefined){
        this.needLogin(id, level, 'play')
      }else{
        this.getDetail(id, 'play')
      }
    },
    // 下载
    download(id, level) {
      if(level !== undefined){
        this.needLogin(id, level, 'download')
      }else{
        this.getDetail(id, 'download')
      }
    },
    // 需要登录
    needLogin(id, level, type) {
      let user = getUser()
      if(user){
        if(user.member.id < level && user.member.id > 1) {
          this.$confirm('查看等级不够', '是否升级会员', {
            confirmButtonText: '升级会员',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            this.$router.push('selectMember')
          }).catch(() => {})
        }else if(user.member.id === 1 && level > 2){
          this.$message.error('当前登录用户正在审核当中,请耐心等待审核')
        }else{
          this.getDetail(id, type)
        }
      }else{
        this.loginDialogVisible = true
      }
    },
    // 获取资料信息
    getDetail(id, type) {
      this.$axios.get('resource.detail', { id }).then((res) => {
        if (res.code === 0) {
          let { resurl, poster, resname } = res.data
          if(type === 'play'){
            this.player = true
            this.poster = poster
            this.resurl = resurl
          }else if(type === 'download'){
            // 下载需要同一个域名
            const link = document.createElement('a')
            link.setAttribute('download', resname) //下载的文件名
            link.href = resurl   //文件url
            link.click()
          }else{
            window.open(resurl)
          }
        }
      })
    }
  }
}

export default MaterialMethod