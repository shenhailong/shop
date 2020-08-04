<!--
 * @Description: 空数据情况
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-30 09:35:35
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-04 09:57:16
-->
<template>
  <div class="empty">
    <div class="empty-icon"></div>
    <div class="tip" v-if="type == 'product'">
      没有您要搜索的产品，试试其它条件吧～～～
    </div>
    <div class="tip" v-if="type == 'cart'">
      您的购物车还没有添加产品，去<span @click="$router.push('productCenter')" class="product-link">产品中心</span>逛逛吧～～～
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.empty{
  padding: 100px 0 0 0px;
  width: 500px;
  margin: 0 auto;
  text-align: center;
  .empty-icon{
    height: 80px;
    width: 80px;
    margin: 0 auto;
    background: url(~@/assets/empty.png) no-repeat;
    background-size: cover;
  }

  .tip{
    font-size: 16px;
    margin-top: 40px;
    color: #999999;
  }

  .product-link{
    color: #3686DC;
    margin: 0 5px;
    cursor: pointer;

    &:hover{
      font-size: 18px;
    }
  }
}
</style>