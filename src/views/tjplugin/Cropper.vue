<template>
  <div>
    <div>
      <p>1.安装corpperjs</p>
      <p>2.在单个组件中引入</p>
    </div>
    <!-- 预览的是裁剪图片图片 -->
    <img :src="cropImg" class="pre-img">
    <!-- 选择上传图片 -->
    <div class="crop-demo-btn">上传图片
      <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />
    </div>
    <div class="crop-demo-btn" style="margin-top:20px;" @click="cropImg=defaultSrc">清除头像</div>
    <div class="crop-demo-btn" style="margin-top:20px;">上传图片到服务器</div><br>
    <el-dialog title="裁剪图片,请裁剪至对应比例" :close-on-click-modal="false" :lock-scroll="true" :visible.sync="dialogVisible" width="30%">
      <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
      <span slot="footer" class="dialog-footer">
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
      // 默认的avatar头像
      defaultSrc: require('../../assets/img/default_avatar.jpg'),
      // 用于裁剪的头像源
      imgSrc: '',
      // 裁剪下来，最终决定上传的头像 important
      cropImg: '',
      dialogVisible: false
    }
  },
  components: {
    VueCropper
  },
  methods: {
    // 点击上传头像按钮
    setImage (e) {
      // 只上传一张
      const file = e.target.files[0]
      if (!file.type.includes('image/')) {
        return
      }
      // 创建读取流
      const reader = new FileReader()
      reader.onload = (event) => {
        // 读取完成，拉起弹窗
        this.dialogVisible = true
        // 直接回显到头像
        this.imgSrc = event.target.result
        // 联动到裁剪
        this.$refs.cropper && this.$refs.cropper.replace(event.target.result)
      }
      reader.readAsDataURL(file)
    },
    // 移动裁剪框，剪下图片
    cropImage () {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    // 取消裁剪
    cancelCrop () {
      this.dialogVisible = false
      this.cropImg = this.defaultSrc
    },
    // 确认裁剪
    handleError () {
      this.$notify.error({
        title: '上传失败',
        message: '图片上传接口上传失败，可更改为自己的服务器接口'
      })
    }
  },
  // 将回显的指向赋值为默认
  created () {
    this.cropImg = this.defaultSrc
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
  width: 300px;
  height: 300px;
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
  text-align: center;
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
