<template>
  <div class="wrap-index">
    <NavBar current="index" />

    <div class="content">
      <div class="search-wrap">
        <div class="search-left">
          <div class="label">资料检索</div>
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input class="serach-input" v-model="keyword" placeholder="请输入资料名称"></el-input>
        </div>
        <div class="search-right">
          <el-button type="primary" @click="search">检索</el-button>
        </div>
      </div>
      <!-- Swiper -->
      <div class="swiper-container">
        <div class="swiper-wrapper ">
          <div class="swiper-slide slider" v-for="(item, index) in swiperList" :key="index">
            <a :href="item.url">
            <img :src="item.src" />
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination swiper-pagination-white" id="swiper-spit"></div>
        <!-- Add Arrows -->
        <div class="swiper-button-next swiper-button-white"></div>
        <div class="swiper-button-prev swiper-button-white"></div>
      </div>

      <div class="card">
        <div class="text">明星产品</div>
        <div @click="goProductCenter()" class="more">查看更多 >></div>
      </div>
      <!-- 产品列表 -->
      <el-row v-for="(line, index) in Math.ceil(list.length / 4)" :key="line" :gutter="20">
        <Product v-for="(item, itemIndex) in count(index)" :key="productItem(line, itemIndex).id" :item="productItem(line, itemIndex)" />
      </el-row>

      <div class="about">
      </div>

      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min.js'
import NavBar from '@components/NavBar'
import Product from '@components/Product'
export default {
  components: {
    NavBar,
    Product
  },
  data() {
    return {
      swiperList: [
        {
          url: 'https://www.baidu.com/',
          src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1621892280,3672596328&fm=26&gp=0.jpg'
        },
        {
          url: 'https://cn.bing.com/?FORM=Z9FD1',
          src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3980421992,4198883825&fm=11&gp=0.jpg'
        },
        {
          url: 'https://cn.vuejs.org/v2/guide/',
          src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=668925903,3991018893&fm=26&gp=0.jpg'
        }
      ],
      list: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }],
      value: '',
      keyword: ''
    }
  },
  mounted() {
    this.initSwiper()
    this.getList()
  },
  methods: {
    getList() {
      this.$axios.get('custcoreprod.list', {
        curPage: 1,
        pageSize: 8,
      }).then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
        }
      })
    },
    initSwiper () {
      var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false, // 取消鼠标操作后的轮播暂停【无操作轮播继续】【参考链接1】
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

      });
      console.log(swiper)
    },
    // 每行需要循环商品的个数
    count(index) {
      let num = 0
      let lines = Math.ceil(this.list.length / 4)
      if(lines !== (Number(index) + 1)){
        num = 4
      }else{
        // 最后一行
        if(this.list.length % 4 === 0){
          num = 4
        }else{
          num = this.list.length % 4
        }
      }
      return num
    },
    // 每一个item
    productItem(line, index) {
      let num = (line - 1) * 4 // 已经排列的个数
      num = num + index // 接着的次序
      return this.list[num]
    },
    goProductCenter() {
      this.$router.push('productCenter')
    },
    search() {}
  }
}
</script>

<style lang="scss">
@import '~@/scss/utils/theme.scss';

.search-wrap{
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 10px;

  .search-left{
    display: flex;
    align-items: center;
  }

  .label{
    font-size: 16px;
    font-weight: 500;
    width: 100px;
    margin-left: 20px;
  }

  .serach-input{
    width: 300px;
    margin: 0 10px;
  }
}

.swiper-container{
  width: 1170px;
  height: 300px;
  margin: 0 auto;
  margin-bottom: 10px;
  .slider{
    width: 100%;
    height: 100%;
  }
  img{
    height: 100%;
    width: 100%;
  }
}

.card{
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  .more{
    cursor: pointer;
    border: 1px solid #999;
    padding: 10px;
    &:hover{
      color: $color-primary;
    }
  }
}
</style>