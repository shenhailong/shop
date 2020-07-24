<template>
  <div class="wrap-product-center">
    <NavBar current="productCenter" />

    <div class="content">
      <div class="search-wrap">
        <el-input class="serach-input" v-model="keyword" placeholder="请输入产品名称"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
      <!-- 产品列表 -->
      <el-row v-for="(line, index) in Math.ceil(list.length / 4)" :key="line" :gutter="20">
        <Product v-for="(item, itemIndex) in count(index)" :key="productItem(line, itemIndex).id" :item="productItem(line, itemIndex)" />
      </el-row>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100">
        </el-pagination>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import Product from '@components/Product'

export default {
  components: {
    NavBar,
    Product
  },
  data() {
    return {
      list: [
        { id: '1', name: '产品1', number: 'A1010101', description: '这是产品1的描述', src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595592797643&di=b9f0b9e5ddca17f7ec2ab467c5de225e&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg' },
        { id: '2', name: '产品2', number: 'A1010101', description: '这是产品1的描述', src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1621892280,3672596328&fm=26&gp=0.jpg' },
        { id: '3', name: '产品3', number: 'A1010101', description: '这是产品1的描述', src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595592797643&di=b9f0b9e5ddca17f7ec2ab467c5de225e&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg' },
        { id: '4', name: '产品4', number: 'A1010101', description: '这是产品1的描述', src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1621892280,3672596328&fm=26&gp=0.jpg' },
        { id: '5', name: '产品5', number: 'A1010101', description: '这是产品1的描述', src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1621892280,3672596328&fm=26&gp=0.jpg' },
        { id: '6', name: '产品6', number: 'A1010101', description: '这是产品1的描述', src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595592797643&di=b9f0b9e5ddca17f7ec2ab467c5de225e&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg' },
        { id: '7', name: '产品7', number: 'A1010101', description: '这是产品1的描述', src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1621892280,3672596328&fm=26&gp=0.jpg' },
        { id: '8', name: '产品8', number: 'A1010101', description: '这是产品1的描述', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3980421992,4198883825&fm=11&gp=0.jpg' },
        { id: '9', name: '产品9', number: 'A1010101', description: '这是产品1的描述', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3980421992,4198883825&fm=11&gp=0.jpg' },
      ],
      keyword: ''
    }
  },
  mounted() {

  },
  methods: {
    // 每行需要循环商品的个数
    count(index) {
      let num = 0
      let lines = Math.ceil(this.list.length / 4)
      if(lines !== (Number(index) + 1)){
        num = 4
      }else{
        num = this.list.length % 4
      } 
      return num
    },
    // 每一个item
    productItem(line, index) {
      let num = (line - 1) * 4 // 已经排列的个数
      num = num + index // 接着的次序
      return this.list[num]
    },
    search() {}
  }
}
</script>

<style lang="scss" scoped>
.wrap-product-center{
  .content{
    padding-top: 105px;
    max-width: 1170px;
    margin: 0 auto;
  }
  
  .search-wrap{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
    .serach-input{
      width: 300px;
      margin-right: 20px;
    }
  }

  .pagination{
    display: flex;
    justify-content: flex-end;
  }

  .footer{
    height: 300px;
  }
}
</style>
