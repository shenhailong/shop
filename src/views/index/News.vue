<!--
 * @Description: 新闻详情
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-10-19 09:00:58
 * @LastEditors: Dragon
 * @LastEditTime: 2020-10-19 16:43:22
-->
<template>
  <div>
    <NavBar current="index" />
    <div class="content" v-if="detail.id">
      <div class="title">
        {{ detail.title }}
      </div>
      <div class="time">{{date(detail.articledt)}}</div>
      <div v-html="detail.content" class="detail-html"></div>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import { getDate } from '@/utils/tools'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      detail: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    date(value) {
      return getDate(value, true)
    },
    getDetail() {
      this.$axios.get('introduce.detail', { id: this.$route.params.id }).then((res) => {
        if (res.code === 0) {
          this.detail = res.data
        }
      }).finally(() => {
        this.loading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>

.content{
  padding-left: 20px;
}
.title{
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
}

.time{
  font-size: 14px;
  margin-bottom: 20px;
}

</style>