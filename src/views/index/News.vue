<template>
  <div>

  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {

    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$axios.get('introduce.detail', { id: this.$route.params.id }).then((res) => {
        if (res.code === 0) {
          this.detail = res.data.list
        }
      }).finally(() => {
        this.loading = false
      })
    },
  }
}
</script>
