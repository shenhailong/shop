<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-27 13:45:15
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-14 09:55:45
-->
<template>
  <div class="wrap-index">
    <NavBar current="productCenter" />
    <div class="content">
      产品详情
      <div class="detail-box">
        <div class="left">
          <img :src="BASE_URL + item.picture" class="product-img" alt="">
        </div>
        <div class="right"></div>
      </div>
      <el-button type="primary" @click="visible = true">加入购物车</el-button>

    </div>
    <AddCart v-if="visible" :visible.sync="visible" :item=item @hide="visible = false" />
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import AddCart from '@components/AddCart'
import { BASE_URL } from '@/constants/common'

export default {
  components: {
    NavBar,
    AddCart
  },
  data() {
    return {
      visible: false,
      item: [],
      detai: {},
      BASE_URL
    }
  },
  mounted() {
    this.geDetail()
  },
  methods: {
    geDetail() {
      this.loading = true
      this.$axios.get('product.detail', {
        id: this.$route.params.id
      }).then((res) => {
        if (res.code === 0) {
          this.detail = res.data
        }
      }).finally(() => {
        this.loading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.detail-box{
  display: flex;
  align-items: center;

  .left{
    margin-right: 30px;
    height: 200px;
    width: 200px;
  }
}
</style>