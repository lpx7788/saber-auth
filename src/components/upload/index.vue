<template>
  <div class="upload_item">
    <div class="upload_item_slot"
         @click="$refs.inputFile.click()">
      <slot>
        <div class="upload"
             :style="{
            height: height + 'px',
            lineHeight: height + 'px',
            width: width + 'px',
          }"
             v-if="imgSrc.length === 0">
          <i class="upload_icon">+</i>
        </div>
      </slot>
    </div>
    <div class="files_list"
         v-if="$slots.default && fileName">
      <div class="files_list_item flex-between">
        <div class="files_list_item_l flex-main">
          <i class="el-icon-document"></i> {{ fileName }}
        </div>
        <div class="files_list_item_r">
          <i class="el-icon-delete cursor_pointer"
             @click="del"></i>
        </div>
      </div>
    </div>
    <div class="upload_img_box"
         @mouseover="showHandle()"
         @mouseout="hiddenHandle()"
         :style="{
        height: height + 'px',
        lineHeight: height + 'px',
        width: width + 'px',
      }"
         v-if="!$slots.default && imgSrc.length !== 0">
      <el-image :style="{
          height: height + 'px',
          lineHeight: height + 'px',
          width: width + 'px',
        }"
                v-for="(item, idx) in imgSrc"
                :key="idx"
                :src="item"
                fit="contain"
                :preview-src-list="imgSrc"></el-image>
      <div class="upload_item_actions"
           v-show="handle"
           :style="{
          height: height + 'px',
          lineHeight: height + 'px',
          width: width + 'px',
        }"
           v-if="disabled === false">
        <div class="buttons">
          <i class="buttons-item el-icon-zoom-in"
             @click="zoom"></i>
          <i class="buttons-item el-icon-refresh-left"
             @click="$refs.inputFile.click()"></i>
          <i class="buttons-item el-icon-delete"
             v-if="clearable"
             @click="del()"></i>
        </div>
      </div>
    </div>
    <input class="none"
           ref="inputFile"
           type="file"
           @change="getUploadFile"
           :accept="accept" />
    <div v-if="isTip"
         class="el-upload__tip"
         slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </div>

</template>

<script>

import queryPutFile from '@/api/upload/index'
import func from '@/util/func';

export default {
  props: {
    height: {
      type: Number,
      default: 100,
    },
    width: {
      type: Number,
      default: 100,
    },
    change: {
      type: Function,
      default: () => { },
    },
    deleted: {
      type: Function,
      default: () => { },
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isTip: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      handle: false,
      url: '',
      imgSrc: [],
      fileName: null,
      accept: 'image/*',
    }
  },
  methods: {
    zoom(e) {
      const a = e.currentTarget.parentElement
      const b = a.parentNode.previousElementSibling
      b.firstElementChild.click()
    },
    showHandle() {
      this.handle = true
    },
    hiddenHandle() {
      this.handle = false
    },
    del() {
      this.$refs.inputFile.value = null
      this.fileName = null
      this.imgSrc = []
      this.deleted()
    },
    async getUploadFile(e) {
      const files = e.target.files[0]
      this.fileName = files.name
      try {
        const src = await this.loadImage(files)
        this.imgSrc = []
        this.imgSrc.push(src)
        let srcUrl = '';
        queryPutFile(
          func.toFormData({ file: files })
        )
          .then(res => {
            this.$message.success('上传成功')
            srcUrl = res.data.data.link
            this.change(files, srcUrl)
          }).catch(() => { })
      } catch (err) {
        window.console.log(err) // eslint-disable-line
      }
    },

    loadImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function () {
          const dataURL = reader.result
          resolve(dataURL)
        }
        reader.onerror = function () {
          reject(reader.error)
        }
        reader.readAsDataURL(file)
      })
    },
    // 设置初始图片
    setFile(val) {
      if (val) {
        this.imgSrc = []; this.imgSrc.push(val)
      } else this.imgSrc = []
    },
  },
}
</script>

<style lang="scss" scoped>
.upload_item {
  display: inline-block;
}
.el-upload__tip {
  margin-top: 0;
}
// .upload_item_slot {
// margin-bottom: 5px;
// }
.upload_img_box {
  position: relative;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  .upload_item_actions {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.5;
    background: #000;
    border-radius: 6px;
    .buttons-item + .buttons-item {
      margin-left: 15px;
    }
  }
}
.upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center;
  .upload_icon {
    font-size: 28px;
    color: #8c939d;
  }
}
.buttons {
  text-align: center;
  i {
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
}
.el-image-viewer__wrapper {
  z-index: 9999 !important;
}
.el-image {
  border-radius: 6px;
}
.files_list .files_list_item_r {
  padding-left: 10px;
}
</style>
