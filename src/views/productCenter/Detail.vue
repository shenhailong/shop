<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-27 13:45:15
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-11 15:46:55
-->
<template>
  <div class="wrap-index">
    <NavBar current="productCenter" />
    <div class="content">
      产品详情
      <el-button type="primary" @click="visible = true">加入购物车</el-button>

    </div>
    <AddCart v-if="visible" :visible.sync="visible" :item=item @hide="visible = false" />
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import AddCart from '@components/AddCart'

export default {
  components: {
    NavBar,
    AddCart
  },
  data() {
    return {
      visible: false,
      item: [],
      detai: {}
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
