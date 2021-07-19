<template>
  <div class="image-upload">
    <el-image :src="imgUrl">
      <div
        slot="error"
        class="error-slot"
      >
        <i class="el-icon-picture-outline" />
      </div>
    </el-image>
    <el-upload
      action="#"
      :before-upload="upload"
      accept="image/jpeg"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    upload(file) {
      this.$emit('upload', file)
      return false
    }
  }
}
</script>

<style lang="scss">
.image-upload {
  display: flex;
  align-items: flex-end;
  .el-image {
    width: 300px;
    height: 200px;
    margin-right: 20px;
    .error-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #f5f7fa;
      color: #909399;
      font-size: 30px
    }
  }
}
</style>
