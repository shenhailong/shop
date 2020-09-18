import NavBar from '@components/NavBar'
import VideoPlayer from '@components/VideoPlayer'

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
    preview(id) {
      this.getDetail(id)
    },
    play(id) {
      this.getDetail(id, 'play')
    },
    // 获取资料信息
    getDetail(id, type) {
      this.$axios.get('resource.detail', { id }).then((res) => {
        if (res.code === 0) {
          let { resurl, poster } = res.data
          if(type === 'play'){
            this.player = true
            this.poster = poster
            this.resurl = resurl
          }else{
            window.open(resurl)
          }
        }
      })
    },
    // 获取资料信息
    download(id) {
      this.$axios.get('resource.detail', { id }).then((res) => {
        if (res.code === 0) {
          // 下载需要同一个域名
          let { resurl, resname } = res.data
          const link = document.createElement('a')
          link.setAttribute('download', resname) //下载的文件名
          link.href = resurl   //文件url
          link.click()
        }
      })
    }
  }
}

export default MaterialMethod