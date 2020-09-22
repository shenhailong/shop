<template>
  <div class="wrap-index">
    <NavBar current="index" />

    <div class="content">
      <div class="search-wrap">
        <div class="search-left">
          <div class="label">资料检索</div>
          <!-- <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
          <el-input class="serach-input" v-model.trim="keyword" placeholder="请输入资料名称"></el-input>
        </div>
        <div class="search-right">
          <el-button type="primary" @click="search">检索</el-button>
        </div>
      </div>
      <!-- Swiper -->
      <!-- <div v-loading="loadingBanner" class="swiper-container">
        <div class="swiper-wrapper ">
          <div class="swiper-slide slider" v-for="(item) in swiperList" :key="item.id">
            <div @click="newPage(item.navurl)" :href="item.navurl">
              <img :src="item.navpic" />
            </div>
          </div>
        </div>
        
        <div class="swiper-pagination swiper-pagination-white" id="swiper-spit"></div>

        <div class="swiper-button-next swiper-button-white"></div>
        <div class="swiper-button-prev swiper-button-white"></div>
      </div> -->

      <el-carousel class="swiper-container">
        <el-carousel-item class="swiper-slide slider" v-for="(item) in swiperList" :key="item.id">
          <div @click="newPage(item.navurl)" :href="item.navurl">
            <img :src="item.navpic" />
          </div>
        </el-carousel-item>
      </el-carousel>

      <div class="card">
        <div class="text">明星产品</div>
        <el-button @click="goProductCenter()" type="primary">查看更多 >></el-button>
      </div>
      <!-- 产品列表 -->
      <div class="product-list" v-loading="loading">
        <el-row v-for="(line, index) in Math.ceil(list.length / 4)" :key="line" :gutter="20">
          <Product v-for="(item, itemIndex) in count(index)" :key="productItem(line, itemIndex).id" :item="productItem(line, itemIndex)" />
        </el-row>
      </div>
    </div>
    <div class="about">
      <div class="internal-content">
        <div @click="goAbout" class="about-title">
          磐安云创简介
        </div>
        <div class="about-content">
          <div @click="goAbout" @mouseover="aboutHover(index)" v-for="(item, index) in aboutList" :key="index" class="item">
            <div :class="'img' + (index + 1)" class="img"></div>
            <div class="text">{{item.text}}</div>
          </div>
        </div>
        <div class="">
          <div v-for="(item, index) in ABOUT" :key="index" class="description" :class="currentAbout == index ? 'disB' : 'disN'">
            {{item.text}}
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      北京磐安云创科技有限公司<span class="center-text">版权所有</span>京ICP备20003511号-1
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min.js'
import NavBar from '@components/NavBar'
import Product from '@components/Product'
import { ABOUT } from '@/constants/about'
export default {
  components: {
    NavBar,
    Product
  },
  data() {
    return {
      swiperList: [],
      list: [],
      aboutList: [
        { text: '基本信息'},
        { text: '软件测试产品及其解决方案'},
        { text: '软件运维产品及其解决方案'},
        { text: '核心团队'}
      ],
      ABOUT,
      currentAbout: 0,
      options: [],
      value: '',
      keyword: '',
      loading: false,
      loadingBanner: false
    }
  },
  mounted() {
    this.getList()
    this.getBanner()
  },
  methods: {
    getBanner() {
      this.loadingBanner = true
      this.$axios.get('home.nav').then((res) => {
        if (res.code === 0) {
          this.swiperList = res.data
          this.$nextTick(() => {
            this.initSwiper()
          })
        }
      }).finally(() => {
        this.loadingBanner = false
      })
    },
    getList() {
      this.loading = true
      this.$axios.get('custcoreprod.list', {
        curPage: 1,
        pageSize: 8,
      }).then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
        }
      }).finally(() => {
        this.loading = false
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
      this.swiper = swiper
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
    search() {
      if(this.keyword === '') return
      this.$router.push({
        path: 'material',
        query: {
          keyword: this.keyword
        }
      })
    },
    aboutHover(index) {
      this.currentAbout = index
    },
    newPage(url) {
      window.open(url)
    },
    goAbout() {
      this.$router.push('about')
    }
  }
}
</script>

<style lang="scss" scoped>
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

.product-list{
  min-height: 500px;
}

.about{
  width: 100%;
  height: 600px;
	background: #e6e6e6 url(~@/assets/bg03.jpg) no-repeat 50% 50%;
  background-size: cover;
  
  .about-title{
    font-size: 30px;
    font-weight: 300;
    text-align: center;
    padding: 80px 0 20px 0;
    width: 500px;
    margin: 0 auto;
    border-bottom: 1px solid #808183;
    margin-bottom: 50px;
    cursor: pointer;
  }

  .about-content{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .item{
    width: 220px;
    // height: 123px;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
  }

  .item .img{
    transition:all .2s linear;
  }
  .item .img:hover{
    transform:scale3d(1.15,1.15,1.15);
  }

  .item {
    .img{
      // display: inline-block;
      width: 123px;
      height: 123px;
      background: url(~@/assets/s3-img.png) no-repeat;
      margin: 0 auto;
      margin-bottom: 20px;
      &.img4{
        background-position: 0 0;
      }

      &.img2{
        background-position: 0 -123px;
      }

      &.img3{
        background-position: 0 -246px;
      }

      &.img1{
        background-position: 0 -369px;
      }

      &.img5{
        background-position: 0 -492px;
      } 
    }
  }

  .description{
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: '#333';
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;
  }
}

.footer{
  background: #000;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  line-height: 100px;

  .center-text{
    margin: 0 30px;
  }
}
</style>