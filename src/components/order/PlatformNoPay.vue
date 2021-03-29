<template>
  <div class="wrap-index">
    <el-row :gutter="20" justify="end">
      <el-form size="mini" :model="ruleForm" ref="ruleForm" label-width="80px">
        <el-col :span="6">
          <el-form-item label="订单号码" prop="orderno">
            <el-input v-model="ruleForm.orderno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单时间">
            <el-date-picker
              @change="dateChange"
              v-model="date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          &nbsp;<div style="width:10px;height:10px"></div>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <div class="btn-wrap">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="resetForm('ruleForm')" class="reset">重置</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-table
      :data="list"
      v-loading="loading"
      empty-text="无符合记录的数据"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <Child :list="props.row.ldetails || []" />
        </template>
      </el-table-column>
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
        label="订单状态"
        align="center">
        <template slot-scope="props">
          {{filterStatus(props.row.auditstatus)}}
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="paystatus"
        label="审核状态"
        width="140"
        align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.auditstatus == '1'" class="color-primary">审核中</div>
          <div v-if="scope.row.auditstatus == '2'" class="color-green">审核通过</div>
          <div v-if="scope.row.auditstatus == '3'" class="color-red">审核拒绝</div>
        </template>
      </el-table-column> -->
      <el-table-column
        label="总价"
        prop="curprice"
        width="140"
        align="center">
        <template slot-scope="props">
          合计: {{props.row.curprice}} 元
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
        label="交付联系人"
        prop="contact"
        width="140"
        align="center">
      </el-table-column>
      <el-table-column
        label="联系电话"
        prop="tel"
        width="140"
        align="center">
      </el-table-column>
      <el-table-column
        label="交付邮箱"
        prop="email"
        width="140"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="350"
        align="center">
        <template slot-scope="scope">
          <el-button @click="deleteOrder(scope.row)" type="danger" size="small">删除</el-button>
          <el-button @click="pay(scope.row)" type="primary" size="small">支付</el-button>
          <el-button @click="upload(scope.row.id)" type="success" size="small">上传凭证</el-button>
          <el-button v-if="!scope.row.email" @click="deliver(scope.row.id)" type="primary" size="small">交付信息</el-button>
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
        :headers="{'api-action': 'order.upload', 'api-token': token ? token : ''}"
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
    <DeliverInfo :visible.sync="deliverDialog" :orderId="orderId" @closeDeliver="closeDeliver" />
  </div>
</template>
<script>
import Child from './PlatformChild'
import { getDate } from '@/utils/tools'
import DeliverInfo from '@/components/order/DeliverInfo'
import { getToken } from '@/utils/common'
import { AUDIT_STATUS } from '@/constants/status'

export default {
  components: {
    Child,
    DeliverInfo
  },
  props: {
    status: [ String, Number ]
  },
  data() {
    return {
      token: '',
      ruleForm: {
        auditstatus: status,
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
        orderid: '',
        clurl: ''
      },
      deliverDialog: false,
      orderId: null
    }
  },
  mounted() {
    this.getList()
    this.token = getToken()
  },
  methods: {
    data(value) {
      return getDate(value)
    },
    filterStatus(value) {
      return AUDIT_STATUS[value]
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
      this.$axios.get('order.searchPay', this.ruleForm).then((res) => {
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
    deliver(id) {
      this.deliverDialog = true
      this.orderId = id
    },
    closeDeliver(reload = false) {
      this.deliverDialog = false
      if(reload){
        this.getList()
      }
    },
    upload(id) {
      this.uploadData.orderid = id
      this.uploadShow = true
    },
    // 上传图片操作
    handleRemove(file, fileList) {
      this.uploadData.clurl = ''
      this.fileList = fileList
    },
    handleBeforeUpload() {
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
      } else if (response.code === 9900) {
        this.$message.warning('请重新登录')
        this.$router.push('login')
      }
      this.uploading = false
    },
    handleExceed() {
      this.$message.warning('请先删除后再上传')
    },
    // 确定上传
    uploadOk() {
      this.loading = true
      this.$axios.post('order.savecl', this.uploadData).then((res) => {
        if (res.code === 0) {
          this.uploadShow = false
          this.getList()
        }
      }).finally(() => {
        this.loading = false
      })
    },
  },
  watch: {
    status(value) {
      this.ruleForm.auditstatus = value
      this.date = []
      this.ruleForm.curPage = 1
      this.ruleForm.sstartdate = ''
      this.ruleForm.senddate = ''
      this.$refs.ruleForm.resetFields()
      this.getList()
    }
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