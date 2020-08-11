<template>
  <div class="wrap-cart">
    <NavBar current="cart" />
    <div class="content">
      <Empty v-if="list.length === 0" type="cart" />
      <div v-else>
        <el-table
          :data="list"
          @select-all="selectAll"
          @select="selectSingle"
          style="width: 100%"
          ref="multipleTable"
          border
          size="mini">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="产品名称"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="产品明细"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column prop="name" label="时间单位" align="center">
            <template slot-scope="scope">
              <el-radio-group @change="radioChange(scope.row, scope.$index)" v-model="scope.row.mode">
                <el-radio label="year">年</el-radio>
                <el-radio label="month">月</el-radio>
                <el-radio label="date">日</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column align="center" label="购买时长" width="160">
            <template slot-scope="scope" align="center" >
              <NumInput v-model="scope.row.count"  size="mini" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="购买数量" width="160">
            <template slot-scope="scope">
              <NumInput v-model="scope.row.num"  size="mini" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="价格" width="120">
            <template slot-scope="scope">
              {{scope.row.price}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
            align="center">
            <template slot-scope="scope">
              <el-button @click="deleteProduct(scope.row, scope.$index)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="footer">
          <div class="footer-content">
            <div class="left">
              <div class="footer-item">
                <el-checkbox v-model="allChecked" @change="toggleSelection">全选</el-checkbox>
              </div>
              <div class="footer-item">
                <el-checkbox v-model="discount" @change="useDiscount">使用95折优惠</el-checkbox>
              </div>
            </div>
            <div class="right">
              <div class="footer-item">
                合计:  <span class="money">2000</span> 元
              </div>
              <div class="footer-item btn-wrap">
                <el-button @click="submit()" type="primary" size="large">去结算</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import Empty from '@components/Empty'
import NumInput from '@components/NumInput'
import { getLocalCart, setLocalCart } from '@/utils/cart'
import { getToken } from '@/utils/common'

export default {
  components: {
    NavBar,
    Empty,
    NumInput
  },
  data() {
    return {
      list: [{
        id: 1,
        num: 0
      }],
      token: null,
      allChecked: false, // 自定义的全选
      discount: false, // 是否使用折扣
      total: '2000', // 总数
      select: [] // 选择的产品
    }
  },
  mounted() {
    let token = getToken()
    this.token = token
    this.initCart()
  },
  methods: {
    // 初始化购物车
    initCart() {
      if(this.token){
        this.getServerCart()
      }else{
        this.list = getLocalCart()
      }
    },
    // 获取后台cart数据
    async getServerCart() {
      const res = await this.$axios.get('/oilMini/oil')
      if (res.code === '1') {
        console.log(1)
      }
    },
    // table的全选
    selectAll(selection) {
      console.log(selection)
    },
    // table的单选
    selectSingle(selection, row){
      console.log(selection)
      console.log(row)
    },
    useDiscount(value) {
      console.log(value)
    },
    // 自定义的全选
    toggleSelection(value){
      if (value) {
        this.list.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    deleteProduct(row, index) {
      this.$confirm('确定删除该产品明细?', '删除产品明细', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async () => {
        if(this.token){
          const res = await this.$axios.get('/oilMini/oil', { id: row.id })
          if (res.code === '1') {
            this.list.splice(index, 1)
          }
        }else{
          this.list.splice(index, 1)
          setLocalCart(this.list)
        }
      }).catch(() => {})
    },
    // 时间单位切换
    async radioChange(row, index) {
      console.log(index)
      if(this.token){
        const res = await this.$axios.get('/oilMini/oil', { id: row.id })
        if (res.code === '1') {
          // this.list.splice(index, 1)
        }
      }else{
        setLocalCart(this.list)
      }
    },
    // 结算
    submit() {

    }
  }
}
</script>


<style lang="scss" scoped>
@import '~@/scss/utils/theme.scss';
.wrap-cart{
  position: relative;
}

.footer{
  width: 100%;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 20px 0;

  .money{
    font-size: 24px;
    color: $color-primary;
  }
  .footer-content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1170px;
    margin: 0 auto;
    border: 1px solid #EBEEF5;
  }
  .footer-item{
    padding: 20px;
    height: 100%;
    font-size: 16px;
  }

  .left{
    .footer-item{
      border-right: 1px solid #EBEEF5;
    }
  }

  .right{
    .footer-item{
      border-left: 1px solid #EBEEF5;
    }
  }

  .left, .right{
    display: flex;
    align-items: center;
  }
}
</style>