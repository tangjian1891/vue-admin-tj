<template>
  <div class="slider">
    <el-menu background-color="#545c64" :default-active="onRoutes" :collapse-transition="true" text-color="#fff" class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-menu-item index="1" @click="$router.push({ name: 'home' })">
        <i class="el-icon-location"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">插件集合</span>
        </template>
        <el-menu-item index="upload" @click="$router.push({ name: 'upload' })">文件上传</el-menu-item>
        <el-menu-item index="cropper" @click="$router.push({ name: 'cropper' })">图片裁剪</el-menu-item>
        <el-menu-item index="2-3">富文本编辑</el-menu-item>
        <el-menu-item index="2-4">视频播放</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">产品</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data () {
    return {
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 查看点击
    // @open="handleOpen" @close="handleClose"
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }

  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style>
.slider {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* // min-height: 400px; */
}
</style>
