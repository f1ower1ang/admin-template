<template>
  <div class="policy-page">
    <div class="policy-page__header">
      <div class="title">政策法规管理</div>
      <el-form :inline="true" :model="formData">
        <el-form-item label="政策法规类别" prop="lawType">
          <el-select v-model="formData.lawType" size="small" placeholder="请选择类别">
            <template v-if="lawType">
              <el-option :value="-1" label="全部" />
              <el-option v-for="(item, index) in lawType" :key="index" :label="item.typeName" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="policy-page__content p10">
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
        <el-button size="small" type="primary" @click="showDialog('添加政策法规', '修改政策法规')">添加</el-button>
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
          <el-table-column v-for="(label, index) in header" :key="index" :label="label" :prop="key[index]" :width="width[index]" show-overflow-tooltip />
          <el-table-column label="类别" width="200">
            <template slot-scope="{ row }">
              <span>{{ dict[row.lawType] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发布日期" width="150">
            <template slot-scope="{ row }">
              <span>{{ row.createTime | parseTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="{ row, $index }">
              <el-button type="primary" size="mini" plain @click="showDialog('添加政策法规', '修改政策法规', 'policyForm', row, $index)">编辑</el-button>
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
    <el-dialog :visible.sync="dialogTableVisible" :fullscreen="fullscreen" top="100px" width="690px" class="common-dialog" @close="cancel('policyForm')">
      <div slot="title" style="display: flex; justify-content: space-between; height: 16px; align-items: center">
        <p>{{ dialogTitle }}</p>
        <el-button icon="el-icon-full-screen" type="text" style="margin-right: 30px" @click="fullscreen = !fullscreen" />
      </div>
      <el-form ref="policyForm" :model="policyForm" label-width="120px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="policyForm.title" placeholder="请输入标题" size="small" />
        </el-form-item>
        <el-form-item label="政策法规类别" prop="lawType">
          <el-select v-model="policyForm.lawType" size="small" placeholder="请选择类别">
            <template v-if="lawType">
              <el-option v-for="(item, index) in lawType" :key="index" :label="item.typeName" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="政策法规内容" prop="content">
          <el-input
            v-model="policyForm.content"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="addOrEditItem('policyForm', 'policyForm')">确 定</el-button>
        <el-button size="small" @click="cancel('policyForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonMixin from '../common-mixin'
import { addOrEditLaw, delLaw, getLawList, getLawType, getTypeOfLaw } from '@/api/policy'
import { parseTime } from '@/utils'
export default {
  name: 'Policy',
  filters: {
    parseTime(time) {
      return parseTime(new Date(time))
    }
  },
  mixins: [commonMixin],
  data() {
    return {
      header: ['id', '标题', '内容'],
      key: ['id', 'title', 'content'],
      width: ['50', '', ''],
      lawType: null,
      policyForm: {
        title: '',
        createTime: '',
        lawType: '',
        content: ''
      },
      rules: {
        title: { required: true, message: '请输入政策法规标题', trigger: 'blur' },
        lawType: { required: true, message: '请选择政策法规类型', trigger: 'blur' },
        content: { required: true, message: '请输入政策法规内容', trigger: 'blur' }
      },
      dict: {},
      formData: {
        lawType: -1
      }
    }
  },
  async created() {
    const res = await getLawType()
    this.lawType = res
    res.forEach(e => {
      this.dict[e.id] = e.typeName
    })
    this.getArrayData()
  },
  methods: {
    async getItems() {
      // 后端接口请求
      if (this.formData.lawType === -1) {
        return getLawList()
      } else {
        return getTypeOfLaw(this.formData.lawType)
      }
    },
    addItem() {
      this.policyForm.createTime = Date.now()
      return addOrEditLaw(this.policyForm).then((res) => {
        return Promise.resolve(res)
      })
    },
    editItem() {
      return addOrEditLaw(this.policyForm)
    },
    delItem(id) {
      return delLaw(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.policy-page {
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
