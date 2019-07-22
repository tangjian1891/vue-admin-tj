<template>
  <div>
    <div class="crumbs">
    </div>
    <div class="crop-demo">
      <img :src="cropImg" class="pre-img">
      <div class="crop-demo-btn">选择图片
        <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />
      </div>
    </div>
    <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
      <p>建议宽高为100X100</p>
      <p>宽:{{width}} 高:{{height}}</p>
      <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:400px;"></vue-cropper>
      <span slot="footer" class="dialog-footer">

        <el-button @click="show">获取</el-button>
        <el-button @click="cancelCrop">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'cropper',
  data: function () {
    return {
      defaultSrc: require('../../assets/logo.png'),
      fileList: [],
      imgSrc: '',
      cropImg: '',
      dialogVisible: false,
      time: '',
      width: '',
      height: ''
    }
  },
  components: {
    VueCropper
  },
  methods: {
    get () {

    },
    setImage (e) {
      const file = e.target.files[0]
      if (!file.type.includes('image/')) {
        return
      }
      if (file.size > 102400) {
        this.$message({
          message: '图片大小不能超过1MB',
          type: 'warning'
        })
        return
      }
      let previewImg = URL.createObjectURL(file)
      this.imgSrc = previewImg
      this.$refs.cropper && this.$refs.cropper.replace(previewImg)
      this.dialogVisible = true
      this.obj = document.querySelector('.cropper-crop-box')
      this.time = setInterval(() => {
        if (document.querySelector('.cropper-crop-box')) {
          this.show()
          clearInterval(this.time)
        }
      }, 5)
      // this.show()
    },
    show () {
      let _that = this
      // Firefox和Chrome早期版本中带有前缀
      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      // 选择目标节点
      var target = document.querySelector('.cropper-crop-box')
      // 创建观察者对象
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          _that.height = mutation.target.clientHeight
          _that.width = mutation.target.clientWidth
        })
      })
      // 配置观察选项:
      var config = {
        attributes: true // 检测属性变动
      }
      // 传入目标节点和观察选项
      observer.observe(target, config)
      // /停止观察
      //           observer.disconnect();
    },
    // 动态剪切 cropperjs使用
    cropImage () {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    // 取消剪切
    cancelCrop () {
      this.dialogVisible = false
      this.cropImg = this.defaultSrc
    },
    handleError () {
      this.$notify.error({
        title: '上传失败',
        message: '图片上传接口上传失败，可更改为自己的服务器接口'
      })
    }
  },
  created () {
    this.cropImg = this.defaultSrc
  },
  mounted () {
    this.$nextTick(function () {

    })
  }
}
</script>

<style scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.pre-img {
  width: 200px;
  height: 200px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 5px;
}
.crop-demo {
  display: flex;
  align-items: flex-end;
}
.crop-demo-btn {
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  margin-left: 30px;
  background-color: #409eff;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
}
.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
<style>
.cropper-crop-box {
  width: 100px;
  height: 100px;
}
</style>
