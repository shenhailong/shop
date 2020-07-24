<template>
  <div class="wrap-index">
    <NavBar current="index" />
    <div class="content">
      <swiper ref="mySwiper" class="swiper-wrap" :options="swiperOptions">
        <swiper-slide v-for="(item, index) in swiperList" :key="index" class="slider">
          <a :href="item.url">
            <img :src="item.src" />
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="product-list">
        <Product />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.min.css'
import NavBar from '@components/NavBar'
import Product from '@components/Product'
export default {
  components: {
    Swiper,
    SwiperSlide,
    NavBar,
    Product
  },
  directives: {
    swiper: directive
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
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        // Some Swiper option/callback...
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false)
  },
  methods: {

  }
}
</script>

<style lang="scss">

.content{
  padding-top: 105px;
}
.swiper-wrap{
  width: 1170px;
  height: 300px;
  .slider{
    width: 100%;
    height: 100%;
  }
}
</style>