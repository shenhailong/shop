<!-- Table -->
<template>
  <div>
    <el-dialog
      width="1000px"
      append-to-body
      class="add-cart"
      title="选择产品"
      :visible="visible">
      <el-form ref="ruleForm" size="mini" :rules="rules" label-width="100px" :model="form">
        <el-table
          :data="form.childs"
          @select-all="selectAll"
          @select="select"
          style="width: 100%"
          border
          size="mini">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="产品明细"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column prop="name" label="时间单位" align="center" width="250">
            <template slot-scope="scope">
              <el-form-item align="center" :prop="'childs.' + scope.$index + '.unit'" :rules='rules.unit'>
                <el-radio-group v-model="scope.row.unit">
                  <el-radio label="Y">年</el-radio>
                  <el-radio label="M">月</el-radio>
                  <el-radio label="D">日</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="单位价格" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.unit === 'Y'">{{scope.row.yprice}}元</div>
              <div v-if="scope.row.unit === 'M'">{{scope.row.mprice}}元</div>
              <div v-if="scope.row.unit === 'D'">{{scope.row.dprice}}元</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="购买时长">
            <template slot-scope="scope" align="center" >
              <el-form-item :prop="'childs.' + scope.$index + '.tamount'" style="margin-left:0" class="aaa">
                <NumInput v-model="scope.row.tamount" size="mini" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" label="购买数量">
            <template slot-scope="scope">
              <el-form-item :prop="'childs.' + scope.$index + '.amount'" :rules='rules.amount'>
                <NumInput v-model="scope.row.amount" size="mini" />
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import NumInput from '@components/NumInput'

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
      rules: {
        id: [{required: true, message: '请选择产品明细', trigger: 'blur'}],
        unit: [{
          required: true,
          message: '请输入账号手机号',
          trigger: 'blur'}],
        amount: [{
          required: true,
          message: '请输入购买的数量',
          trigger: 'blur'}],
        tamount: [{
          required: true,
          message: '请输入时长',
          trigger: 'blur'}
        ]
      }, // 添加校验
      form: {
        childs: []
      },
      formLabelWidth: '120px',
      selectList: [],
      product: {}
    };
  },
  created() {
    let product = JSON.parse(JSON.stringify(this.item))
    console.log(product)
    if(product.haschild === '1'){
      product.childs.forEach(item => {
        item.unit = 'Y'
        item.amount = 1
        item.tamount = 1
      })
      this.form = product
    }else{
      console.log(0)
    }
  },
  methods: {
    hideDialog() {
      this.$emit('hide')
    },
    async add() {
      if(this.selectList.length === 0){ return }
      this.$refs.ruleForm.validate(async (valid) => {
        console.log(valid)
        console.log(this.form)
        if (valid) {
          const res = await this.$axios.post('/oilMini/oil')
          if (res.code === '1') {
            this.$message({
              message: '添加成功,请前往购物车页面查看',
              type: 'success',
              duration: 1500
            })
          }
        }
      })
    },
    selectAll(selection) {
      console.log(selection)
      this.selectList = selection
    },
    select(selection, row){
      console.log(selection)
      console.log(row)
      this.selectList = selection
    }
  }
};
</script>

<style lang="scss">
.add-cart{
  .el-form-item__content{
    margin-left: 0!important;
  }
  .el-form-item{
    margin: 0!important;
  }
}
</style>