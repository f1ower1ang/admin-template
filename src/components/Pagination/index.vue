<template>
  <div class="pagination-content">
    <slot />
    <el-pagination
      :hide-on-single-page="true"
      background
      :current-page="page"
      :page-sizes="sizes"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    sizes: {
      type: Array,
      default: () => [8, 10, 12]
    },
    size: {
      type: Number,
      default: 8
    },
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSizeChange(size) {
      this.$emit('select-size', size)
    },
    handleCurrentChange(page) {
      this.$emit('select-page', page)
    }
  }
}
</script>

<style scoped lang="scss">
.pagination-content {
  width: 100%;
  @include clearfix;
  .el-pagination {
    float: right;
    margin-top: 20px
  }
}
</style>
