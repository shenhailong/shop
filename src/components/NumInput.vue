<!--
 * @Description: 输入数量的组件
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-03 18:21:15
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-11 15:29:36
-->
<template>
  <div>
    <div class="input-num-wrap">
      <span @click="minus" class="minus">-</span>
        <input
          v-bind:value="value"
          v-on:change="$emit('change', $event.target.value)"
          @click="inputClick" readonly class="input"
        >
      <span @click="plus" class="plus">+</span>
    </div>
    <el-dialog
      title="请输入购买的数量"
      :visible.sync="dialogVisible"
      width="30%"
      v-if="dialogVisible"
      >
      <el-input-number :controls="false" v-model="num" label="描述文字"></el-input-number>
      <div class="tip">{{tip}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {

  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: [ 'value' ],
  data() {
    return {
      dialogVisible: false,
      num: 0,
      tip: ''
    }
  },
  mounted() {

  },
  methods: {
    inputClick() {
      console.log(this.value)
      this.dialogVisible = true
    },
    minus() {
      this.$emit('change', Number(this.value) - 1)
    },
    plus() {
      this.$emit('change', Number(this.value) + 1)
    },
    ok() {
      if(!(/(^[1-9]\d*$)/.test(this.num))){
        this.tip = '请输入正整数'
        return
      }
      this.$emit('change', Number(this.num))
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/utils/theme.scss';

.input-num-wrap{
  position: relative;
  width: 130px;

  .minus{
    position: absolute;
    line-height: 25px;
    left: 1px;
    top: 1px;;
    width: 28px;
    border-right: 1px solid #DCDFE6;
    border-radius: 4px 0 0 4px;
    text-align: center;
    z-index: 1;
    height: auto;
    background: #F5F7FA;
    color: #606266;
    cursor: pointer;
  }

  .plus{
    position: absolute;
    right: 0px;
    bottom: 1px;
    width: 28px;
    line-height: 25px;
    border-left: 1px solid #DCDFE6;
    border-radius: 0 4px 4px 0;
    text-align: center;
    z-index: 1;
    height: auto;
    background: #F5F7FA;
    color: #606266;
    cursor: pointer;
  }

  .input{
    text-align: center;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
  }

}

.tip{
  color: $color-red;
  margin-top: 10px;
}
</style>