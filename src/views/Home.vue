<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="140">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(9).fill(item),
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
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
