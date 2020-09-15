<template>
  <div class="wrap-index">
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="orderno"
        label="订单编号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createdt"
        label="下单时间"
        width="180"
        align="center">
        <template slot-scope="props">
          {{data(props.row.createdt)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="paystatus"
        label="支付状态"
        align="center">
        <template slot-scope="props">
          {{props.row.paystatus === 'Y' ? '已支付' : '待支付'}}
        </template>
      </el-table-column>
      <el-table-column
        label="金额"
        prop="curprice"
        align="center">
        <template slot-scope="props">
          {{props.row.paynum}} 元
        </template>
      </el-table-column>
      <el-table-column
        prop="createdt"
        label="凭证"
        width="200"
        align="center">
        <template slot-scope="props">
          <img v-if="props.row.clurl" :src="props.row.clurl" height="100px" width="150px" />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300"
        align="center">
        <template slot-scope="scope">
          <el-button @click="deleteOrder(scope.row)" type="danger" size="small">删除</el-button>
          <el-button @click="pay(scope.row)" type="primary" size="small">支付</el-button>
          <el-button @click="upload(scope.row.id)" type="success" size="small">上传凭证</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="请上传支付凭证"
      :visible.sync="uploadShow"
      width="30%">
      <el-upload
        :headers="{'api-action': 'memberpay.upload'}"
        action="/cnas/v1"
        list-type="picture" name="orderFile" accept="image/png,image/jpg,image/jpeg" :file-list="fileList" :limit="1" :on-exceed="handleExceed" :before-upload="handleBeforeUpload" :on-success="handleSuccess" :on-remove="handleRemove" :disabled="uploading">
          <el-button size="small" type="primary" :loading="uploading">点击上传</el-button>
          <span slot="tip" class="el-upload__tip" style="color: #f56c6c;margin-left: 5px"></span>
          </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadShow = false">取 消</el-button>
        <el-button type="primary" @click="uploadOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDate } from '@/utils/tools'
export default {

  data() {
    return {
      ruleForm: {
        paystatus: 'N',
        orderno: '',
        sstartdate: '',
        senddate: '',
        curPage: 1, // 当前页
        pageSize: 10
      },
      date: [],
      list: [],
      total: 0,
      loading: false,
      uploadShow: false,
      fileList: [],
      uploading: false,
      uploadData: {
        id: '',
        clurl: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    data(value) {
      return getDate(value)
    },
    // 总价
    totalPrice(children) {
      let price = 0
      children.forEach(item => {
        price += Number(item.totalprice)
      })
      return price
    },
    getList() {
      this.loading = true
      this.$axios.get('member.paylist', this.ruleForm).then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
          this.total = res.data.total
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 页数切换
    currentChange(value) {
      this.ruleForm.curPage = value
      this.getList()
    },
    dateChange(value) {
      this.ruleForm.sstartdate = value ? value[0] : ''
      this.ruleForm.senddate = value ? value[1] : ''
    },
    // 查询
    search() {
      this.getList()
    },
    resetForm(formName) {
      this.date = []
      this.ruleForm.sstartdate = ''
      this.ruleForm.senddate = ''
      this.$refs[formName].resetFields();
    },
    // 删除
    deleteOrder(row) {
      this.$confirm('确定删除该订单?', '删除订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async () => {
        const res = await this.$axios.post('order.remove', {
          id: row.id
        })
        if (res.code === 0) {
          this.getList()
        }else{
          this.reload()
        }
      }).catch(() => {})
    },
    pay(row){
      this.$router.push(`confirmOrder/${row.id}`)
    },
    upload(id) {
      this.uploadData.id = id
      this.uploadShow = true
    },
    // 上传图片操作
    handleRemove(file, fileList) {
      this.ruleForm.clurl = ''
      this.fileList = fileList
    },
    handleBeforeUpload(file) {
      console.log(file)
      // this.uploading = true
      // // 限制图片大小
      // const isLt1M = file.size / 1024 / 1024 < 1
      // if (!isLt1M) {
      //   this.$message.error('上传头像图片大小不能超过 1MB!')
      //   this.uploading = false
      // }
      // return isLt1M
    },
    handleSuccess(response, file, fileList) {
      if (response.code === 0) {
        this.uploadData.clurl = response.data
        this.fileList = fileList
        this.uploading = false
      } else {
        this.uploading = false
      }
    },
    handleExceed() {
      this.$message.warning('请先删除后再上传')
    },
    // 确定上传
    uploadOk() {
      this.loading = true
      this.$axios.post('memberpay.savecl', this.uploadData).then((res) => {
        if (res.code === 0) {
          this.uploadShow = false
          this.getList()
        }
      }).finally(() => {
        this.loading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.tip{
  color: #333333;
  font-size: 20px;
  text-align: center;
  padding-top: 100px;
}

.btn-wrap{
  display: flex;
  justify-content: flex-end;
}

.reset{
  margin-left: 20px;
}
</style>