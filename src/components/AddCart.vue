<!-- Table -->
<template>
  <div>
    <el-dialog
      width="1000px"
      append-to-body
      :show-close="false"
      class="add-cart"
      title="选择产品"
      top="40px"
      :visible="visible">
      <el-dialog
        width="60%"
        title="以下产品购物车已经添加, 不能重复添加!,请重新选择"
        :visible.sync="innerVisible"
        append-to-body>
        <div class="table-header">
          <div class="index">序号</div>
          <div class="name">产品名称</div>
          <div class="subname">产品明细</div>
        </div>
        <div v-for="(item, index) in errorList" :key="item.id" class="table-body">
          <div class="index">{{index + 1}}</div>
          <div class="name error-product">{{item.pprodname}}</div>
          <div class="subname error-product">{{item.pprodname}}</div>
        </div>
      </el-dialog>
      <el-table
        :data="list"
        @select-all="selectAll"
        @select="select"
        style="width: 100%"
        border
        ref="multipleTable"
        size="mini">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          label="产品明细"
          prop="prodname"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column label="时间单位" align="center" width="220">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.unit">
              <el-radio label="Y">年</el-radio>
              <el-radio label="M">月</el-radio>
              <el-radio label="D">日</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="单位价格" align="center" width="90">
          <template slot-scope="scope">
            <div v-if="scope.row.unit === 'Y'">{{scope.row.yprice}}元</div>
            <div v-if="scope.row.unit === 'M'">{{scope.row.mprice}}元</div>
            <div v-if="scope.row.unit === 'D'">{{scope.row.dprice}}元</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="购买时长">
          <template slot-scope="scope" align="center" >
            <NumInput v-model="scope.row.tamount" size="mini" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="购买数量">
          <template slot-scope="scope">
            <NumInput v-model="scope.row.amount" :step="scope.row.step" size="mini" />
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import NumInput from '@components/NumInput'
import { updateCartNum } from '@/utils/cart'

export default {
  components: {
    NumInput
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    item: {}
  },
  data() {
    return {
      list: [],
      selectList: [],
      loading: false,
      innerVisible: false,
      errorList: [] // 已经添加产品的错误提示信息
    };
  },
  created() {
    let product = JSON.parse(JSON.stringify(this.item))
    let arr = []
    if(product.haschild === '1'){
      product.childs.forEach(item => {
        arr.push({
          prodid: item.id,
          pid: product.id,
          unit: 'Y',
          amount: item.step,
          tamount: 1,
          prodname: item.prodname,
          pprodname: product.prodname,
          yprice: item.yprice,
          mprice: item.mprice,
          dprice: item.dprice,
          step: item.step,
          checked: 'Y'
        })
      })
    }else{
      arr.push({
        prodid: product.id,
        pid: product.id,
        unit: 'Y',
        amount: product.step,
        tamount: 1,
        prodname: product.prodname,
        pprodname: product.prodname,
        yprice: product.yprice,
        mprice: product.mprice,
        dprice: product.dprice,
        step: product.step,
        checked: 'Y'
      })
    }
    this.list = arr
    this.$nextTick(() => {
      this.initToggleSelection()
    })
  },
  methods: {
    // 初始化选中状态(如果只有一个默认选中)
    initToggleSelection(){
      this.list.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
      this.selectList = this.list
    },
    hideDialog() {
      this.$emit('hide')
    },
    async add() {
      if(this.selectList.length === 0){
        this.$message.error('请选择产品');
        return
      }
      let tip = ''
      let buyByMonth = false // 时长按天大于等于30,提示按月买
      let buyByYear = false // 时长按月大于等于12,提示按年购买
      let product = ''
      for(let i = 0; i < this.selectList.length; i++){
        if(this.selectList[i].unit === 'D' && this.selectList[i].tamount >= 30){
          tip = '按月购买更便宜,是否继续按天购买'
          buyByMonth = true
          product = this.selectList[i].prodname
          break
        }

        if(this.selectList[i].unit === 'M' && this.selectList[i].tamount >= 12){
          tip = '按年购买更便宜,是否继续按月购买'
          buyByYear = true
          product = this.selectList[i].prodname
          break
        }
      }
      if(this.loading) return
      this.loading = true
      if(buyByMonth || buyByYear){
        this.showTip(product, tip)
      }else{
        this.submit()
      }
    },
    // 购买更便宜的提示
    showTip(product, tip) {
      this.$confirm(`购买产品${product}${tip}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submit()
      }).catch(() => {
        this.loading = false
      });
    },
    // 提交数据
    async submit() {
      const res = await this.$axios.post('shopcar.add', this.selectList)
      if (res.code === 0) {
        this.$message({
          message: '添加成功,请前往购物车页面查看',
          type: 'success',
          duration: 1000
        })
        this.loading = false
        updateCartNum()
        this.hideDialog()
      }else if(res.code === 200){
        this.innerVisible = true
        this.errorList = res.data
        this.loading = false
      }else {
        this.innerVisible = true
      }
    },
    selectAll(selection) {
      this.selectList = selection
    },
    select(selection){
      this.selectList = selection
    }
  }
};
</script>

<style lang="scss">
  .table-header, .table-body{
    display: flex;
    line-height: 30px;
    text-align: center;
    border: 1px solid $color-gray;
    .index{
      width: 50px;
      border-right: 1px solid $color-gray;
    }
    .name{
      width: 280px;
      border-right: 1px solid $color-gray;
    }
    .subname{
      flex: 1;
    }
  }

  .table-header{
      border-bottom: none;
  }

  .error-product{
    color: $color-red;
  }

  .add-cart{
    .el-form-item__content{
      margin-left: 0!important;
    }
    .el-form-item{
      margin: 0!important;
    }
  }
</style>