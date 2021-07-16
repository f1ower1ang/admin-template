<template>
  <div class="user-page">
    <div class="user-page__header">
      <div class="title">用户管理</div>
    </div>
    <div class="user-page__content p10">
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
  name: 'User',
  mixins: [commonMixin],
  data() {
    return {
      tableData: null,
      header: ['id', '用户名', '注册手机', '注册时间', '最近登录'],
      key: ['id', 'username', 'phone', 'register', 'lastLogin']
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
          id: '用户id',
          username: '用户名',
          phone: '用户手机',
          register: '注册时间',
          lastLogin: '最近登录时间'
        },
        {
          id: '用户id',
          username: '用户名',
          phone: '用户手机',
          register: '注册时间',
          lastLogin: '最近登录时间'
        },
        {
          id: '用户id',
          username: '用户名',
          phone: '用户手机',
          register: '注册时间',
          lastLogin: '最近登录时间'
        },
        {
          id: '用户id',
          username: '用户名',
          phone: '用户手机',
          register: '注册时间',
          lastLogin: '最近登录时间'
        },
        {
          id: '用户id',
          username: '用户名',
          phone: '用户手机',
          register: '注册时间',
          lastLogin: '最近登录时间'
        },
        {
          id: '用户id',
          username: '用户名',
          phone: '用户手机',
          register: '注册时间',
          lastLogin: '最近登录时间'
        },
        {
          id: '用户id',
          username: '用户名',
          phone: '用户手机',
          register: '注册时间',
          lastLogin: '最近登录时间'
        },
        {
          id: '用户id',
          username: '用户名',
          phone: '用户手机',
          register: '注册时间',
          lastLogin: '最近登录时间'
        }
      ])
    }
  }
}
</script>

<style scoped lang="scss">
.user-page {
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
