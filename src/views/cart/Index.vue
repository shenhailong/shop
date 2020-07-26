<template>
  <div>
    <AddCart :visible.sync="visible" @hide="visible = false" />
    <el-button type="text" @click="visible = true">打开嵌套表单的 Dialog</el-button>
  </div>
</template>

<script>
import AddCart from '@components/AddCart'

export default {
  components: {
    AddCart
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
