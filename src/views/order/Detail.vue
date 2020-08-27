<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-27 16:08:54
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-27 16:11:59
-->
<template>
  <div class="wrap-index">
    <NavBar current="order" />
    <div class="content">
      
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'

export default {
  components: {
    NavBar
  },
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.$route.params.id)
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.loading = true
      this.$axios.get('originorder.check').then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
        }
      }).finally(() => {
        this.loading = false
      })
    },
  }
}
</script>
