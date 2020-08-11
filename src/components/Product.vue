<template>
  <div>
    <el-col :span="6" class="product">
      <div class="wrap">
        <div @click="goDetail">
          <div class="img-wrap"><img :src="item.src" class="product-img" alt=""></div>
          <div class="title">产品名称 {{item.name}}</div>
          <div class="subtitle">产品编号 {{item.number}}</div>
          <div class="subtitle">{{item.description}}</div>
        </div>
        <div class="footer">
          <el-button type="primary" @click="visible = true">加入购物车</el-button>
        </div>
      </div>
    </el-col>
    <AddCart :visible.sync="visible" @hide="visible = false" />
  </div>
</template>

<script>
import AddCart from '@components/AddCart'

export default {
  components: {
    AddCart
  },
  props: {
    item: {}
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {

  },
  methods: {
    goDetail() {
      this.$router.push(`detail/${this.item.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/utils/theme.scss';

.product{
  // width: 100px;
  border-radius: 10px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  padding: 20px;
  cursor: pointer;
  .wrap{
    border-radius: 5px 5px 0 0;
    box-shadow: 0 6px 12px 0 rgba(0,0,0,.15);
  }
  .img-wrap{
    overflow: hidden;
    background: #ffffff;
    border-radius: 5px 5px 0 0;

    // padding: 10px;
  }
  .product-img{
    // height: 300px;
    width: 100%;
    border-radius: 5px 5px 0 0;
  }

  .product-img:hover{
    animation:scaleDraw 5s infinite;
  }

  @keyframes scaleDraw{
    0%{
     transform: scale(1);  /*开始为原始大小*/
    }
    25%{
      transform: scale(1.2); /*放大1.1倍*/
    }
    50%{
      transform: scale(1);
    }
    75%{
      transform: scale(1.2);
    }
  }

  .title{
    font-size: 16px;
    line-height: 28px;
    color: #333333;
    padding: 0 0 5px 10px;
    background: #ffffff;
  }

  .subtitle{
    background: #ffffff;
    font-size: 14px;
    color: #999999;
    line-height: 28px;
    padding: 0 0 10px 10px;
  }
  
  .footer{
    background: #ffffff;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>