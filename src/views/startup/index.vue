<template>
  <div class="startup-page">
    <div class="startup-page__header">
      <div class="title">创业管理</div>
      <el-form :inline="true" :model="formData">
        <el-form-item label="标题">
          <el-input size="small" v-model="formData.title" placeholder="活动标题"></el-input>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker
            v-model="formData.date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="startup-page__content p10">
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
          @selection-change="handleSelectionChange"
          :header-cell-style="{backgroundColor: '#ebeef5', fontWeight: 500, padding: '6px 0'}"
          :header-row-style="{backgroundColor: '#ebeef5', color: '#000', fontSize: '14px'}"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column v-for="(label, index) in header" :key="index" :label="label" :prop="key[index]" />
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="{ row, $index }">
              <el-button type="primary" size="mini" plain @click="showDialog('添加创业信息', '修改创业信息', 'ruleForm', row, $index)">编辑</el-button>
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
  name: 'Startup',
  mixins: [commonMixin],
  data() {
    return {
      tableData: null,
      formData: {
        title: '',
        date: ''
      },
      header: ['id', '标题', '发布时间', '有效期'],
      key: ['id', 'title', 'date', 'time'],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getItems(params) {
      // 后端接口请求
      return Promise.resolve({
        count: 10,
        data: [
          {
            id: '活动id',
            title: '创业活动标题',
            date: '发布日期',
            time: '活动有效期'
          },
          {
            id: '活动id',
            title: '创业活动标题',
            date: '发布日期',
            time: '活动有效期'
          },
          {
            id: '活动id',
            title: '创业活动标题',
            date: '发布日期',
            time: '活动有效期'
          },
          {
            id: '活动id',
            title: '创业活动标题',
            date: '发布日期',
            time: '活动有效期'
          },
          {
            id: '活动id',
            title: '创业活动标题',
            date: '发布日期',
            time: '活动有效期'
          },
          {
            id: '活动id',
            title: '创业活动标题',
            date: '发布日期',
            time: '活动有效期'
          },
          {
            id: '活动id',
            title: '创业活动标题',
            date: '发布日期',
            time: '活动有效期'
          },
          {
            id: '活动id',
            title: '创业活动标题',
            date: '发布日期',
            time: '活动有效期'
          }
        ]
      })
    }
  }
}
</script>
<style scoped lang="scss">
.startup-page {
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
