<template>
  <section>
    <div
      class="ant-upload-preview"
      @click="edit(1)"
    >
      <CloudUploadOutlined class="upload-icon"/>
      <div class="mask">
        <PlusOutlined />
      </div>
      <img :src="options.upLoadedAvatar" />
    </div>
    <a-modal
      title="修改头像"
      :visible="visible"
      :maskClosable="false"
      :confirmLoading="confirmLoading"
      :width="800"
      :footer="null"
      @cancel="cancelHandel"
    >
      <a-row>
        <a-col
          :xs="24"
          :md="12"
          :style="{height: '350px'}"
        >
        <span>用作demo,没装vue-cropper插件</span>
          <!-- <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
          >
          </vue-cropper> -->
        </a-col>
        <a-col
          :xs="24"
          :md="12"
          :style="{height: '350px'}"
        >
          <div class="avatar-upload-preview">
            <img
              :src="previews.url"
              :style="previews.img"
            />
          </div>
        </a-col>
      </a-row>
      <br>
      <a-row>
        <a-col
          :lg="2"
          :md="2"
        >
          <a-upload
            name="file"
            :beforeUpload="beforeUpload"
            :showUploadList="false"
          >
            <a-button icon="upload">选择图片</a-button>
          </a-upload>
        </a-col>
        <a-col
          :lg="{span: 1, offset: 2}"
          :md="2"
        >
          <a-button
            icon="plus"
            @click="changeScale(1)"
          />
        </a-col>
        <a-col
          :lg="{span: 1, offset: 1}"
          :md="2"
        >
          <a-button
            icon="minus"
            @click="changeScale(-1)"
          />
        </a-col>
        <a-col
          :lg="{span: 1, offset: 1}"
          :md="2"
        >
          <a-button
            icon="undo"
            @click="rotateLeft"
          />
        </a-col>
        <a-col
          :lg="{span: 1, offset: 1}"
          :md="2"
        >
          <a-button
            icon="redo"
            @click="rotateRight"
          />
        </a-col>
        <a-col
          :lg="{span: 2, offset: 6}"
          :md="2"
        >
          <a-button
            type="primary"
            @click="finish('blob')"
          >保存</a-button>
        </a-col>
      </a-row>
    </a-modal>
  </section>

</template>
<script>
import { baseURL } from '@/utils/util'
import baseService from '@/utils/http/axios'
import { CloudUploadOutlined,PlusOutlined } from '@ant-design/icons-vue'

export default {
  props: ['defaultAvatar'],
  components:{
    CloudUploadOutlined,
    PlusOutlined
  },
  data() {
    return {
      visible: false,
      id: null,
      confirmLoading: false,
      fileList: [],
      uploading: false,
      options: {
        img: this.defaultAvatar || '/DNAPic/avatar.jpg',
        upLoadedAvatar: this.defaultAvatar || '/DNAPic/avatar.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1],
      },
      previews: {},
    }
  },
  methods: {
    edit(id) {
      this.visible = true
      this.id = id
      /* 获取原始头像 */
    },
    close() {
      this.id = null
      this.visible = false
    },
    cancelHandel() {
      this.close()
    },
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    beforeUpload(file) {
      const reader = new FileReader()
      // 把Array Buffer转化为blob 如果是base64不需要
      // 转化为base64
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.options.img = reader.result
      }
      // 转化为blob
      // reader.readAsArrayBuffer(file)

      return false
    },

    // 上传图片（点击上传按钮）
    finish(type) {
      const _this = this
      const formData = new FormData()
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          const img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
          const file = new window.File([data], 'avatar.jpg', { type: data.type })
          formData.append('file', file)
          baseService.post(baseURL + 'api/v1/file/upload', formData).then((response) => {
            // console.log('upload response:', response)
            // var res = response.data
            // if (response.status === 'done') {
            //   _this.imgFile = ''
            //   _this.headImg = res.realPathList[0] // 完整路径
            //   _this.uploadImgRelaPath = res.relaPathList[0] // 非完整路径
            //   _this.$message.success('上传成功')
            //   this.visible = false
            // }
            this.options.upLoadedAvatar = response
            // _this.$message.success('上传成功')
            _this.$emit('ok', response)
            _this.visible = false
          })
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    okHandel() {
      const vm = this

      vm.confirmLoading = true
      setTimeout(() => {
        vm.confirmLoading = false
        vm.close()
        vm.$message.success('上传头像成功')
      }, 2000)
    },

    realTime(data) {
      this.previews = data
    },
  },
}
</script>

<style lang="less" scoped>
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
.ant-upload-preview {
  position: relative;
  margin: 0 auto 10px auto;
  width: 100%;
  max-width: 130px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
