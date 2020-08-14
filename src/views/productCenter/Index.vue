<template>
  <div class="wrap-product-center">
    <NavBar current="productCenter" />

    <div class="content" >
      <div class="search-wrap">
        <el-input class="serach-input" v-model="keyword" placeholder="请输入产品名称" clearable></el-input>
        <el-button type="primary" :disabled="loading" @click="getList">搜索</el-button>
      </div>
      <!-- 产品列表 -->
      <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
        <Empty v-if="list.length === 0" type="product" />
        <template v-else >
          <el-row v-for="(line, index) in Math.ceil(list.length / 4)" :key="line" :gutter="20">
            <Product v-for="(item, itemIndex) in count(index)" :key="productItem(line, itemIndex).id" :item="productItem(line, itemIndex)" />
          </el-row>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="currentChange"
              :total="total">
            </el-pagination>
          </div>
        </template>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import Product from '@components/Product'
import Empty from '@components/Empty'
export default {
  components: {
    NavBar,
    Product,
    Empty
  },
  data() {
    return {
      list: [],
      keyword: '',
      curPage: 1, // 当前页
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$axios.get('custprod.list', {
        curPage: this.curPage,
        pageSize: this.pageSize,
        keyword: this.keyword
      }).then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
          this.total = res.data.total
        }
      }).finally(() => {
        this.loading = false
      })
    },
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
    search() {},
    // 页数切换
    currentChange(value) {
      this.curPage = value
      this.getList()
    }
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
