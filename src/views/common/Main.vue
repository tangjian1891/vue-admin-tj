<template>
  <div class="container">
    <el-container style="height:100%;">
      <el-header>
        <MainTop @changeCollapse="changeCollapse"></MainTop>
      </el-header>
      <el-container>
        <!-- 侧边栏目 -->
        <el-aside width="200">
          <MainSlider :isCollapse="isCollapse"></MainSlider>
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainTop from './MainTop'
import MainSlider from './MainSlider'
export default {
  name: 'Main',
  data () {
    return {
      // 是否展开侧边导航
      isCollapse: false
    }
  },
  methods: {
    changeCollapse () {
      this.isCollapse = !this.isCollapse
    }
  },
  components: {
    MainTop,
    MainSlider
  }
}
</script>

<style scope lang="scss">
.container {
  height: 100%;
  border: 1px solid #ccc;
}
</style>
