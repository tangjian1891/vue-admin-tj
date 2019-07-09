<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: '这是我自己封装的组件以及常用函数库'
    }
  }
}
</script>

<style scope lang="scss">
.home {
  height: 100%;
}
.main {
  border: 1px solid #ccc;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  // min-height: 400px;
}

.header {
  display: flex;
  justify-content: space-between;
}
.el-aside {
  overflow: hidden !important;
  ul {
    height: 100%;
  }
}
</style>
