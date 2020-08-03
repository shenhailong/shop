<!-- Table -->
<template>
  <div>
    <el-dialog
      width="60%"
      append-to-body
      class="add-cart"
      title="选择产品"
      :visible="visible">
      <el-form size="mini" :rules="rules" label-width="100px" :model="form">
        <el-table
          :data="form.children"
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
          <el-table-column prop="name" label="时间单位" align="center">
            <template slot-scope="scope">
              <el-form-item align="center" :prop="'children.' + scope.$index + '.mode'" :rules='rules.mode'>
                <el-radio-group v-model="scope.row.mode">
                  <el-radio label="year">年</el-radio>
                  <el-radio label="month">月</el-radio>
                  <el-radio label="date">日</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" label="购买时长">
            <template slot-scope="scope" align="center" >
              <el-form-item :prop="'children.' + scope.$index + '.count'" style="margin-left:0" class="aaa">
                <el-input-number v-model="scope.row.count" :min="1" :max="10"></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" label="购买数量">
            <template slot-scope="scope">
              <el-form-item :prop="'children.' + scope.$index + '.num'" :rules='rules.num'>
                <el-input-number v-model="scope.row.num" :min="1" :max="10"></el-input-number>
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
import { TOKEN } from '@/constants/key'
import { setLocalCart } from '@/utils/cart'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        id: [{
          required: true,
          message: '请选择产品明细',
          trigger: 'blur'}],
        mode: [{
          required: true,
          message: '请输入账号手机号',
          trigger: 'blur'}],
        num: [{
          required: true,
          message: '请输入账号名称',
          trigger: 'blur'}],
        count: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'}
        ]
      }, // 添加校验
      form: {
        id: '',
        children: [{
          id: 1,
          name: '产品1',
          num: 2,
          mode: 'year',
          count: 10
        }, {
          id: 2,
          name: '产品4',
          num: 9,
          mode: 'year',
          count: 0
        }, {
          id: 9,
          name: '产品5',
          num: 8,
          mode: 'year',
          count: 20
        }]
      },
      formLabelWidth: '120px',
      selectList: []
    };
  },
  methods: {
    hideDialog() {
      this.$emit('hide')
    },
    async add() {
      if(this.selectList.length === 0){ return }
      let token = window.localStorage.getItem(TOKEN)
      // 有token说明登陆,发送数据
      if(token){
        const res = await this.$axios.post('/oilMini/oil')
        if (res.code === '1') {
          this.$message({
            message: '添加成功,请前往购物车页面查看',
            type: 'success'
          })
        }
      }else{
        setLocalCart(this.selectList)
        this.$emit('hide')
        this.$message({
          message: '添加成功,请前往购物车页面查看',
          type: 'success'
        })
      }
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