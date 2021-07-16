<template>
  <div class="activity-page">
    <div class="activity-page__header">
      <div class="title">线下活动管理</div>
      <el-form :inline="true" :model="formData">
        <el-form-item label="标题">
          <el-input v-model="formData.title" size="small" placeholder="活动标题" />
        </el-form-item>
        <el-form-item label="活动介绍">
          <el-input v-model="formData.intro" size="small" placeholder="活动详情" />
        </el-form-item>
        <el-form-item label="位置信息">
          <el-input v-model="formData.locate" size="small" placeholder="活动位置信息" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="activity-page__content p10">
      <div class="option">
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          hide-icon
          icon="el-icon-info"
          icon-color="red"
          title="确定删除吗？"
          placement="top"
          @onConfirm="deleteMoreItem"
        >
          <el-button slot="reference" size="small" type="danger">删除</el-button>
        </el-popconfirm>
        <el-button size="small" type="primary" @click="showDialog(null)">添加</el-button>
      </div>
      <pagination
        :size="limit"
        :total="total"
        :page="page"
        @select-page="changePage"
        @select-size="changeSize"
      >
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          size="small"
          :header-cell-style="{backgroundColor: '#ebeef5', fontWeight: 500, padding: '6px 0'}"
          :header-row-style="{backgroundColor: '#ebeef5', color: '#000', fontSize: '14px'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column v-for="(label, index) in header" :key="index" :label="label" :prop="key[index]" />
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="{ row, $index }">
              <el-button type="primary" size="mini" plain @click="showDialog('添加线下活动信息', '修改线下活动', 'ruleForm', row, $index)">编辑</el-button>
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                hide-icon
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                placement="top"
                @onConfirm="deleteOneItem(row, $index)"
              >
                <el-button slot="reference" size="mini" type="danger" plain>删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </pagination>
    </div>
  </div>
</template>

<script>
import commonMixin from '../common-mixin'
export default {
  name: 'Activity',
  mixins: [commonMixin],
  data() {
    return {
      tableData: null,
      formData: {
        title: '',
        locate: '',
        intro: ''
      },
      header: ['id', '标题', '活动日期', '活动介绍', '位置信息', '活动图片'],
      key: ['id', 'title', 'date', 'introduce', 'location', 'imgUrl']
    }
  },
  created() {
    this.getArrayData()
  },
  methods: {
    getItems(params) {
      // 后端接口请求
      return Promise.resolve([
        {
          id: '活动id',
          title: '线下活动标题',
          date: '活动日期',
          introduce: '活动介绍',
          location: '活动位置',
          imgUrl: '活动图片'
        },
        {
          id: '活动id',
          title: '线下活动标题',
          date: '活动日期',
          introduce: '活动介绍',
          location: '活动位置',
          imgUrl: '活动图片'
        },
        {
          id: '活动id',
          title: '线下活动标题',
          date: '活动日期',
          introduce: '活动介绍',
          location: '活动位置',
          imgUrl: '活动图片'
        },
        {
          id: '活动id',
          title: '线下活动标题',
          date: '活动日期',
          introduce: '活动介绍',
          location: '活动位置',
          imgUrl: '活动图片'
        },
        {
          id: '活动id',
          title: '线下活动标题',
          date: '活动日期',
          introduce: '活动介绍',
          location: '活动位置',
          imgUrl: '活动图片'
        },
        {
          id: '活动id',
          title: '线下活动标题',
          date: '活动日期',
          introduce: '活动介绍',
          location: '活动位置',
          imgUrl: '活动图片'
        },
        {
          id: '活动id',
          title: '线下活动标题',
          date: '活动日期',
          introduce: '活动介绍',
          location: '活动位置',
          imgUrl: '活动图片'
        },
        {
          id: '活动id',
          title: '线下活动标题',
          date: '活动日期',
          introduce: '活动介绍',
          location: '活动位置',
          imgUrl: '活动图片'
        },
        {
          id: '活动id',
          title: '线下活动标题',
          date: '活动日期',
          introduce: '活动介绍',
          location: '活动位置',
          imgUrl: '活动图片'
        }
      ])
    }
  }
}
</script>

<style scoped lang="scss">
.activity-page {
  &__header {
    margin-top: 10px;
    .title {
      position: relative;
      padding-left: 10px;
      font-size: 20px;
      line-height: 22px;
      height: 22px;
      &:before {
        position: absolute;
        left: 0;
        content: '';
        width: 4px;
        height: 100%;
        background-color: $primary;
      }
    }
    .el-form {
      margin-top: 10px;
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
  &__content {
    margin-top: 10px;
    .option {
      margin-bottom: 10px
    }
  }
}
</style>
