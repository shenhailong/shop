<!--
 * @Description: 输入数量的组件
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-03 18:21:15
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-22 13:56:11
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
      append-to-body
      :visible.sync="dialogVisible"
      width="30%"
      v-if="dialogVisible"
      style="text-align: center"
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
  props: {
    value: {},
    step: {
      default: 1
    }
  },
  data() {
    return {
      dialogVisible: false,
      num: this.value,
      tip: ''
    }
  },
  methods: {
    inputClick() {
      this.dialogVisible = true
    },
    minus() {
      if(Number(this.value) <= this.step) return
      this.$emit('change', Number(this.value) - this.step)
    },
    plus() {
      this.$emit('change', Number(this.value) + this.step)
    },
    ok() {
      if(!(/(^[1-9]\d*$)/.test(this.num))){
        this.tip = '请输入正整数'
        return
      }
      if(Number(this.num) % this.step !== 0){
        this.tip = `请输入${this.step}的整数倍`
        return
      }
      this.tip = ''
      this.$emit('change', Number(this.num))
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>

.input-num-wrap{
  position: relative;
  width: 130px;
  margin: 0 auto;
  .minus{
    position: absolute;
    line-height: 25px;
    left: 1px;
    top: 1px;;
    width: 28px;
    bottom: 1px;
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
    right: -5px;
    bottom: 1px;
    width: 28px;
    top: 1px;
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
    width: 130px;
    height: 25px;
    font-size: 12px;
  }
}

.tip{
  color: $color-red;
  margin-top: 10px;
}
</style>