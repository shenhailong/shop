<template>
  <div class="wrap-cart">
    <NavBar current="cart" />
    <div class="content">
      <div
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        >
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
              prop="pprodname"
              label="产品名称"
              align="center"
              width="150">
            </el-table-column>
            <el-table-column
              prop="prodname"
              label="产品明细"
              align="center"
              width="150">
            </el-table-column>
            <el-table-column prop="name" label="时间单位" align="center">
              <template slot-scope="scope">
                <el-radio-group @change="radioChange(scope.row, scope.$index)" v-model="scope.row.unit">
                  <el-radio label="Y">年</el-radio>
                  <el-radio label="M">月</el-radio>
                  <el-radio label="D">日</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column align="center" label="购买时长" width="160">
              <template slot-scope="scope" align="center" >
                <NumInput v-model="scope.row.tamount" @change="tamountChange(scope.row, scope.$index)"  size="mini" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="购买数量" width="160">
              <template slot-scope="scope">
                <NumInput v-model="scope.row.amount" :step="scope.row.product.step" @change="amountChange(scope.row, scope.$index)" size="mini" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="价格" width="120">
              <template slot-scope="scope">
                {{scope.row.totalPrice}} 元
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
              </div>
              <div class="right">
                <div class="footer-item">
                  合计:  <span class="money">{{total}}</span> 元
                </div>
                <div class="footer-item btn-wrap">
                  <el-button :loading="submitting" :disabled="submitting" @click="submit()" type="primary" size="large">去结算</el-button>
                </div>
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
import { updateCartNum } from '@/utils/cart'
export default {
  components: {
    NavBar,
    Empty,
    NumInput
  },
  data() {
    return {
      loading: true,
      list: [],
      allChecked: false, // 自定义的全选
      total: 0, // 总价
      select: [], // 选择的产品
      submitting: false // 正在提交
    }
  },
  mounted() {
    this.getServerCart()
  },
  methods: {
    // 获取后台cart数据
    async getServerCart() {
      const res = await this.$axios.post('shopcar.list')
      if (res.code === 0) {
        this.list = res.data
        this.loading = false
        this.$nextTick(() => {
          this.initToggleSelection()
          this.calculateTotal()
        })
      }
    },
    // table的全选
    selectAll(selection) {
      if(selection.length === 0){
        this.list.forEach(item => {
          item.checked = 'N'
        })
      }else {
        this.list.forEach(item => {
          item.checked = 'Y'
        })
      }
      let data = []
      this.list.forEach(item => {
        data.push(item)
      })
      this.checkedChange(data)
      if(selection.length === 0){
        this.allChecked = false
      }else{
        this.allChecked = true
      }
    },
    // table的单选
    selectSingle(selection, row){
      let arr = []
      let data = []
      selection.forEach(item => {
        arr.push(item.id)
      })
      if(arr.includes(row.id)){
        row.checked = 'Y'
      }else{
        row.checked = 'N'
      }
      data.push(row)
      this.checkedChange(data)
      if(selection.length === this.list.length && selection.length !== 0){
        this.allChecked = true
      }else{
        this.allChecked = false
      }
    },
    // 选中切换
    async checkedChange(data) {
      const res = await this.$axios.post('shopcar.check', data)
      if (res.code === 0) {
        this.calculateTotal()
      }
    },
    // 自定义的全选
    toggleSelection(value){
      this.$refs.multipleTable.clearSelection();
      if (value) {
        this.list.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
      if(value){
        this.list.forEach(item => {
          item.checked = 'Y'
        })
      }else {
        this.list.forEach(item => {
          item.checked = 'N'
        })
      }
      let data = []
      this.list.forEach(item => {
        data.push(item)
      })
      this.checkedChange(data)
    },
    // 初始化选中状态
    initToggleSelection(){
      let arr = []
      this.list.forEach(item => {
        if(item.checked === 'Y'){
          arr.push(item)
        }
      })
      if(this.list .length === arr.length){
        this.allChecked = true
      }else{
        this.allChecked = false
      }
      arr.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
    },
    deleteProduct(row, index) {
      this.$confirm('确定删除该产品明细?', '删除产品明细', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async () => {
        const res = await this.$axios.post('shopcar.del', this.list[index])
        if (res.code === 0) {
          this.list.splice(index, 1)
          this.calculateTotal()
          updateCartNum()
        }else{
          this.reload()
        }
      }).catch(() => {})
    },
    // 时长切换
    async tamountChange(row, index) {
      const res = await this.$axios.post('shopcar.tamount', this.list[index])
      if (res.code === 0) {
        this.resetData(index, res.data)
      }else{
        this.reload()
      }
    },
    // 数量修改
    async amountChange(row, index) {
      const res = await this.$axios.post('shopcar.amount', this.list[index])
      if (res.code === 0) {
        this.resetData(index, res.data)
        updateCartNum()
      }else{
        this.reload()
      }
    },
    // 时间单位切换
    async radioChange(row, index) {
      const res = await this.$axios.post('shopcar.unit', this.list[index])
      if (res.code === 0) {
        this.resetData(index, res.data)
      }else{
        this.reload()
      }
    },
    // 操作成功重置数据
    resetData(index, data) {
      this.list[index].totalPrice = data.totalPrice
      this.calculateTotal()
    },
    calculateTotal() {
      let num = 0
      this.list.forEach(item => {
        if(item.checked === 'Y'){
          num += item.totalPrice
        }
      })
      this.total = num
    },
    reload() {
      window.location.reload()
    },
    // 结算
    async submit() {
      let checked = this.list.some(item => {
        return item.checked === 'Y'
      })
      if(!checked){
        this.$message.error('请选择产品');
        return
      }
      this.submitting = true
      const res = await this.$axios.post('order.add')
      if (res.code === 0) {
        this.$router.push(`confirmOrder/${res.data.id}`)
      }else{
        this.reload()
      }
      this.submitting = false
    }
  }
}
</script>


<style lang="scss" scoped>
.wrap-cart{
  position: relative;
}

.content{
  padding-bottom: 130px
}

.footer{
  width: 100%;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 20px 0;
  z-index: 100;
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