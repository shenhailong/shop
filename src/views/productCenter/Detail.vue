<!--
 * @Description:
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-27 13:45:15
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-16 15:35:15
-->
<template>
  <div class="wrap-index">
    <NavBar current="productCenter" />
    <div class="out-content">
      <div class="content">
        <div class="detail-box">
          <div class="left">
            <img :src="detail.picture" class="product-img" alt="">
          </div>
          <div class="right">
            <div class="title">产品名称: {{detail.prodname}}</div>
            <div class="subtitle">产品编号 {{detail.prodcode}}</div>
            <div class="subtitle">{{detail.descr}}</div>
            <el-button type="primary" @click="visible = true">加入购物车</el-button>
          </div>
        </div>

      </div>
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
      detail: {},
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
.content{
  background: #ffffff;
  // min-height: 100vh;
  padding-top: 20px;
  margin-top: 110px;
}

.out-content{
  width: 100%;
  background: #ffffff;
  height: 100vh;
}

.detail-box{
  display: flex;
  // align-items: center;

  .left{
    margin-right: 30px;
    height: 350px;
    width: 350px;
    img{
      width: 100%;
      height: 100%;
    }
  }

  .title{
    font-size: 20px;
    color: #333333;
    margin-bottom: 20px;
  }

  .subtitle{
    font-size: 16px;
    color: #999999;
    line-height: 22px;
  }
}
</style>