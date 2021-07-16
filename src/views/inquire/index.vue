<template>
  <div class="inquire-page">
    <div class="inquire-page__header">
      <div class="title">用户疑问管理</div>
      <el-form :inline="true" :model="formData">
        <el-form-item label="标题">
          <el-input size="small" v-model="formData.title" placeholder="活动标题"></el-input>
        </el-form-item>
        <el-form-item label="问题详情">
          <el-input size="small" v-model="formData.description" placeholder="问题详情"></el-input>
        </el-form-item>
        <el-form-item label="问题状态">
          <el-select v-model="formData.state" placeholder="请选择问题状态" size="small">
            <el-option
              label="已解决"
              :value="1"
            />
            <el-option
              label="未解决"
              :value="0"
            />
            </el-option>
          </el-select>
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
    <div class="inquire-page__content p10">
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
          <el-table-column v-for="(label, index) in header" :key="index" :label="label" :prop="key[index]" show-overflow-tooltip />
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
  name: 'Inquire',
  mixins: [commonMixin],
  data() {
    return {
      tableData: null,
      formData: {
        title: '',
        date: '',
        description: '',
        state: ''
      },
      header: ['id', '标题', '发布日期', '问题详情', '发布者', '问题状态', '解答内容', '解答日期', '解答者'],
      key: ['id', 'title', 'date', 'description', 'username', 'answered', 'answer', 'answerDate', 'answerUsername'],
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
            id: '问题id',
            title: '问题标题',
            date: '发布日期',
            description: '问题详细描述信息',
            username: '问题发表用户名',
            answered: '是否完成回答',
            answer: '回答内容',
            answerDate: '回答日期',
            answerUsername: '回答者用户名'
          },
          {
            id: '问题id',
            title: '问题标题',
            date: '发布日期',
            description: '问题详细描述信息',
            username: '问题发表用户名',
            answered: '是否完成回答',
            answer: '回答内容',
            answerDate: '回答日期',
            answerUsername: '回答者用户名'
          },
          {
            id: '问题id',
            title: '问题标题',
            date: '发布日期',
            description: '问题详细描述信息',
            username: '问题发表用户名',
            answered: '是否完成回答',
            answer: '回答内容',
            answerDate: '回答日期',
            answerUsername: '回答者用户名'
          },
          {
            id: '问题id',
            title: '问题标题',
            date: '发布日期',
            description: '问题详细描述信息',
            username: '问题发表用户名',
            answered: '是否完成回答',
            answer: '回答内容',
            answerDate: '回答日期',
            answerUsername: '回答者用户名'
          },
          {
            id: '问题id',
            title: '问题标题',
            date: '发布日期',
            description: '问题详细描述信息',
            username: '问题发表用户名',
            answered: '是否完成回答',
            answer: '回答内容',
            answerDate: '回答日期',
            answerUsername: '回答者用户名'
          },
          {
            id: '问题id',
            title: '问题标题',
            date: '发布日期',
            description: '问题详细描述信息',
            username: '问题发表用户名',
            answered: '是否完成回答',
            answer: '回答内容',
            answerDate: '回答日期',
            answerUsername: '回答者用户名'
          },
          {
            id: '问题id',
            title: '问题标题',
            date: '发布日期',
            description: '问题详细描述信息',
            username: '问题发表用户名',
            answered: '是否完成回答',
            answer: '回答内容',
            answerDate: '回答日期',
            answerUsername: '回答者用户名'
          },
          {
            id: '问题id',
            title: '问题标题',
            date: '发布日期',
            description: '问题详细描述信息',
            username: '问题发表用户名',
            answered: '是否完成回答',
            answer: '回答内容',
            answerDate: '回答日期',
            answerUsername: '回答者用户名'
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.inquire-page {
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
