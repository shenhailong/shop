<template>
  <div class="wrap-index">
    <NavBar current="index" />

    <div class="content">
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

      <!-- 产品列表 -->
      <div class="product-list">
        <Product />
      </div>
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
      ]
    }
  },
  mounted() {
    this.initSwiper()
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss">

.content{
  padding-top: 105px;
}
.swiper-container{
  width: 1170px;
  height: 300px;
  margin: 0 auto;
  .slider{
    width: 100%;
    height: 100%;
  }
  img{
    height: 100%;
    width: 100%;
  }
}
</style>