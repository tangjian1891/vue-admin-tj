<template>
  <div class="upload">
    <div>
      <p>1.安装corpperjs</p>
      <p>2.在单个组件中引入</p>
    </div>
    <!-- 预览的是裁剪图片图片 -->
    <div class="pre-parent">
      <div class="preview-list" v-for="(item,index) in imgList" :key="index">
        <img :src="item.cropImg" class="pre-img">
        <span @click="imgList.splice(index,1)">x</span>
      </div>
      <div class="pre-img-div">
        <span>+</span>
        <input ref="file" type="file" name="image" accept="image/*" @change="setImage" />
      </div>
    </div>
    <div class="crop-demo-btn" style="margin-top:20px;" @click="sendAxios">上传图片到服务器</div><br>
    <el-dialog title="裁剪图片,请裁剪至对应比例" :close-on-click-modal="false" :lock-scroll="true" :visible.sync="dialogVisible" width="70%">
      <div class="preview-img">
        <img :src="cropImg" class="pre-img">
        <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:50%;height:300px;"></vue-cropper>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelCrop">取 消</el-button>
        <el-button type="primary" @click="addCropImg">确 定</el-button>
      </span>
    </el-dialog>
    <hr>
  </div>
</template>
<script>
import { dataURLtoBlob, blobToFile } from '@/util/util'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'upload',
  data: function () {
    return {
      // 默认的avatar头像
      defaultSrc: '',
      // 用于裁剪的头像源
      imgSrc: '',
      // 裁剪下来，最终决定上传的头像 important
      cropImg: '',
      dialogVisible: false,
      // 数据存储在imgList中
      imgList: [],
      imgName: ''
    }
  },
  components: {
    VueCropper
  },
  methods: {
    sendAxios () {
      let fm = new FormData()
      this.imgList.forEach((item) => {
        console.log(item.cropImg)
        console.log(item.imgName)
        fm.append('file', blobToFile(dataURLtoBlob(item.cropImg), item.imgName), item.imgName)
      })
      console.log(fm)
    },

    // 点击上传头像按钮
    setImage (e) {
      // 只上传一张
      const file = e.target.files[0]
      if (!file.type.includes('image/')) {
        return
      }
      this.imgName = file.name
      // 创建读取流
      const reader = new FileReader()
      reader.onload = (event) => {
        // 读取完成，拉起弹窗
        this.dialogVisible = true
        // 直接回显到头像
        this.imgSrc = event.target.result
        // 联动到裁剪
        this.$refs.cropper && this.$refs.cropper.replace(event.target.result)
        // 清除input框的属性
        this.$refs.file.value = ''
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
    // 确认裁剪 将裁剪的图片添加到预览框
    addCropImg () {
      this.imgList.push({
        cropImg: this.cropImg,
        imgName: this.imgName
      })
      this.dialogVisible = false
    }
  },
  // 将回显的指向赋值为默认
  created () {
    this.cropImg = this.defaultSrc
  }
}
</script>

<style scoped lang="scss">
.upload {
  height: 100%;
  overflow: hidden;
}
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.pre-parent {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  // 预览图片 限定图片的高宽
  .preview-list {
    position: relative;
    span {
      position: absolute;
      width: 35px;
      height: 35px;
      line-height: 30px;
      text-align: center;
      right: 0;
      top: 0;
      font-size: 36px;
      border-radius: 50%;
      border: 1px solid red;
    }
  }
  .pre-img-div {
    width: 300px;
    height: 300px;
    background-color: #eee;
    position: relative;

    border: 1px dashed #ccc;
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 48px;
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
    input {
      width: 100%;
      height: 100%;
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
  }
  .pre-img-div:hover {
    border: 1px dashed skyblue;
  }
}
.pre-img {
  width: 300px;
  height: 300px;
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

.preview-img {
  display: flex;
  justify-content: space-between;
}
</style>
