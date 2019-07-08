<template>
  <div class="header">
    <div @click="changeCollapse">汤健的后台管理</div>
    <div>退出登录</div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  data () {
    return {}
  },
  methods: {
    changeCollapse () {
      this.$emit('changeCollapse')
    }
  }
}
</script>

<style>
</style>
