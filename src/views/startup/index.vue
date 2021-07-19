<template>
  <div class="startup-page">
    <div class="startup-page__header">
      <div class="title">创业管理</div>
      <el-form :inline="true" :model="formData">
        <el-form-item label="标题">
          <el-input v-model="formData.title" size="small" placeholder="活动标题" />
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
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="search">搜索</el-button>
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
        <el-button size="small" type="primary" @click="showDialog('添加创业信息', '修改创业信息')">添加</el-button>
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
          <el-table-column v-for="(label, index) in header" :key="index" :label="label" :prop="key[index]" show-overflow-tooltip :width="width[index]" align="center" />
          <el-table-column label="发布日期" width="150" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.createTime | parseTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="有效期 (天)" width="100" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.available }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="{ row, $index }">
              <el-button type="primary" size="mini" plain @click="showDialog('添加创业信息', '修改创业信息', 'startupForm', row, $index)">编辑</el-button>
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
    <el-dialog :visible.sync="dialogTableVisible" :fullscreen="fullscreen" top="100px" width="690px" class="common-dialog" @close="cancel('startupForm')">
      <div slot="title" style="display: flex; justify-content: space-between; height: 16px; align-items: center">
        <p>{{ dialogTitle }}</p>
        <el-button icon="el-icon-full-screen" type="text" style="margin-right: 30px" @click="fullscreen = !fullscreen" />
      </div>
      <el-form ref="startupForm" :model="startupForm" label-width="120px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="startupForm.title" placeholder="请输入标题" size="small" />
        </el-form-item>
        <el-form-item label="详细信息" prop="content">
          <el-input
            v-model="startupForm.content"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="发布日期" prop="createTime">
          <el-date-picker
            v-model="startupForm.createTime"
            type="date"
            placeholder="请选择发布日期"
            size="small"
          />
        </el-form-item>
        <el-form-item label="有效期" prop="available">
          <el-input-number v-model="startupForm.available" controls-position="right" :min="1" size="small" /> 天
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="addOrEditItem('startupForm', 'startupForm')">确 定</el-button>
        <el-button size="small" @click="cancel('startupForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import commonMixin from '../common-mixin'
import { searchStartup, getStartupList, addOrEditStartup, delStartup } from '@/api/startup'
import { parseTime } from '@/utils'
export default {
  name: 'Startup',
  filters: {
    parseTime(time) {
      return parseTime(new Date(time), '{y}-{m}-{d}')
    }
  },
  mixins: [commonMixin],
  data() {
    return {
      tableData: null,
      formData: {
        title: '',
        date: null
      },
      header: ['id', '标题', '详细信息'],
      width: ['80', '', ''],
      key: ['id', 'title', 'content'],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      startupForm: {
        title: '',
        createTime: '',
        available: 0,
        content: ''
      },
      rules: {
        title: { required: true, message: '请输入政策法规标题', trigger: 'blur' },
        content: { required: true, message: '请输入政策法规内容', trigger: 'blur' },
        createTime: { required: true, message: '请选择活动发布日期', trigger: 'change' },
        available: { required: true, message: '请选择活动有效天数', trigger: 'change' }
      }
    }
  },
  created() {
    this.getArrayData()
  },
  methods: {
    getItems() {
      // 后端接口请求
      const { title, date } = this.formData
      if (title.length || date) {
        const startDate = date && parseTime(date[0], '{y}-{m}-{d}') || ''
        const endDate = date && parseTime(date[1], '{y}-{m}-{d}') || ''
        const params = Object.assign({}, { title, startDate, endDate })
        return searchStartup(params)
      } else {
        return getStartupList()
      }
    },
    addItem() {
      return addOrEditStartup(this.startupForm)
    },
    editItem() {
      return addOrEditStartup(this.startupForm)
    },
    delItem(id) {
      return delStartup(id)
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
