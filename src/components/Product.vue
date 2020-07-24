<template>
  <el-col :span="6">
  <!-- <div class="product"> -->
    <img :src="item.src" class="product-img" alt="">
    <div class="title">产品名称 {{item.name}}</div>
    <div class="subtitle">产品编号 {{item.number}}</div>
    <div class="subtitle">{{item.description}}</div>
  </el-col>
</template>

<script>
export default {
  components: {

  },
  props: {
    item: {}
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
.product{
  width: 100px;
  .product-img{
    height: 100px;
    width: 100%;
  }
}
</style>