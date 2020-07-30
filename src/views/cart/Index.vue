<template>
  <div class="wrap-index">
    <NavBar current="cart" />
    <div class="content">
      <Empty v-if="list.length === 0" type="cart" />
      <div v-else>
        <el-table
          :data="list"
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
              <el-radio-group v-model="scope.row.mode">
                <el-radio label="year">年</el-radio>
                <el-radio label="month">月</el-radio>
                <el-radio label="date">日</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column align="center" label="购买时长" width="160">
            <template slot-scope="scope" align="center" >
              <el-input-number size="mini" v-model="scope.row.count" :min="1" :max="10"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column align="center" label="购买数量" width="160">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num" :min="1" :max="10" size="mini"></el-input-number>
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
              <el-button @click="uploadVoucher(scope.row)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="footer">dd</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import Empty from '@components/Empty'

export default {
  components: {
    NavBar,
    Empty
  },
  data() {
    return {
      list: [{
        id: 1,
        num: 0
      }]
    }
  },
  mounted() {

  },
  methods: {
    selectAll(selection) {
      console.log(selection)
    },
    select(selection, row){
      console.log(selection)
      console.log(row)
    },
    delete(){}
  }
}
</script>


<style lang="scss" scoped>
.footer{
  width: 100%;
  background: #ffffff;
}
</style>