<template>
  <div>
    <el-col :span="6" class="product">
      <div class="wrap">
        <div @click="goDetail">
          <div class="img-wrap"><img :src="item.picture" class="product-img" alt="产品图片"></div>
          <div class="title">{{item.prodname}}</div>
          <div class="subtitle">产品编号 {{item.prodcode}}</div>
          <div class="subtitle">{{item.descr}}</div>
        </div>
        <div class="footer">
          <el-button type="primary" @click="addCart">加入购物车</el-button>
        </div>
      </div>
    </el-col>
    <AddCart v-if="visible" :visible.sync="visible" :item=item @hide="visible = false" />
  </div>
</template>

<script>
import AddCart from '@components/AddCart'
import { getToken } from '@/utils/common'
import { BASE_URL } from '@/constants/common'

export default {
  components: {
    AddCart
  },
  props: {
    item: {}
  },
  data() {
    return {
      visible: false,
      BASE_URL
    }
  },
  methods: {
    goDetail() {
      this.$router.push(`detail/${this.item.id}`)
    },
    addCart() {
      let token = getToken()
      if(token){
        this.visible = true
      }else{
        this.$router.push('/login')
      }
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
    height: 280px;

    // padding: 10px;
  }
  .product-img{
    height: 280px;
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