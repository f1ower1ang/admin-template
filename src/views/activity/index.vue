<template>
  <div class="activity-page">
    <div class="activity-page__header">
      <div class="title">线下活动管理</div>
      <el-form :inline="true" :model="formData">
        <el-form-item label="标题">
          <el-input v-model="formData.title" size="small" placeholder="活动标题" />
        </el-form-item>
        <el-form-item label="位置信息">
          <el-input v-model="formData.address" size="small" placeholder="活动位置信息" />
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
        <el-button size="small" type="primary" @click="showDialog('添加线下活动信息', '修改线下活动', 'activityForm')">添加</el-button>
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
          <el-table-column v-for="(label, index) in header" :key="index" :label="label" :prop="key[index]" show-overflow-tooltip align="center" :width="width[index]" />
          <el-table-column label="活动日期" width="150" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.createTime | parseTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="{ row, $index }">
              <el-button type="primary" size="mini" plain @click="showDialog('添加线下活动信息', '修改线下活动', 'activityForm', row, $index, getEditImg)">编辑</el-button>
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
    <el-dialog :visible.sync="dialogTableVisible" :fullscreen="fullscreen" top="100px" width="690px" class="common-dialog" @close="cancel('activityForm')">
      <div slot="title" style="display: flex; justify-content: space-between; height: 16px; align-items: center">
        <p>{{ dialogTitle }}</p>
        <el-button icon="el-icon-full-screen" type="text" style="margin-right: 30px" @click="fullscreen = !fullscreen" />
      </div>
      <el-form ref="activityForm" :model="activityForm" label-width="120px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="activityForm.title" placeholder="请输入标题" size="small" />
        </el-form-item>
        <el-form-item label="详细信息" prop="content">
          <el-input
            v-model="activityForm.content"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="活动日期" prop="createTime">
          <el-date-picker
            v-model="activityForm.createTime"
            type="date"
            placeholder="请选择活动日期"
            size="small"
          />
        </el-form-item>
        <el-form-item label="活动地点" prop="address">
          <el-select
            v-model="activityForm.address"
            style="width: 100%"
            filterable
            remote
            reserve-keyword
            placeholder="请输入活动地点"
            :remote-method="getAddress"
            :loading="addrLoading"
            size="small"
            value-key="label"
            @change="getAddrOpt"
          >
            <el-option
              v-for="item in options"
              :key="item.label"
              :label="item.label"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="活动图片">
          <image-upload :img-url="activityForm.imgUrl" @upload="uploadImg" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="addOrEditItem('activityForm', 'activityForm')">确 定</el-button>
        <el-button size="small" @click="cancel('activityForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonMixin from '../common-mixin'
import jsonp from '@/utils/jsonp'
import { parseTime } from '@/utils'
import { addOrEditActivity, delActivity, getActivityList, searchActivity } from '@/api/activity'
import ImageUpload from '@/components/ImageUpload/index.vue'
import { getPicList, uploadPic } from '@/api/pic'
export default {
  name: 'Activity',
  filters: {
    parseTime(time) {
      return parseTime(new Date(time), '{y}-{m}-{d}')
    }
  },
  components: { ImageUpload },
  mixins: [commonMixin],
  data() {
    return {
      tableData: null,
      formData: {
        title: '',
        address: '',
        date: null
      },
      header: ['id', '标题', '活动内容', '位置信息'],
      key: ['id', 'title', 'content', 'address'],
      width: ['80', '', '', ''],
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
      activityForm: {
        title: '',
        content: '',
        createTime: '',
        address: '',
        longitude: '',
        latitude: '',
        imgUrl: '',
        file: null
      },
      addrLoading: false,
      options: [],
      rules: {
        title: { required: true, message: '请输入活动标题', trigger: 'blur' },
        content: { required: true, message: '请输入活动内容', trigger: 'blur' },
        createTime: { required: true, message: '请选择活动发布日期', trigger: 'change' },
        address: { required: true, message: '请输入活动地点', trigger: 'change' }
      }
    }
  },
  created() {
    this.getArrayData()
  },
  methods: {
    getItems(params) {
      // 后端接口请求
      const { title, date, address } = this.formData
      if (title.length || date || address.length) {
        const startDate = date && parseTime(date[0], '{y}-{m}-{d}') || ''
        const endDate = date && parseTime(date[1], '{y}-{m}-{d}') || ''
        const params = Object.assign({}, { address, title, startDate, endDate })
        return searchActivity(params)
      } else {
        return getActivityList()
      }
    },
    addItem() {
      const file = this.activityForm.file
      return addOrEditActivity(this.activityForm).then(async(res) => {
        const id = res.msg
        if (file) {
          await uploadPic('activity', id, file)
        }
        return Promise.resolve(res)
      })
    },
    uploadImg(img) {
      this.activityForm.file = img
      const fr = new window.FileReader()
      fr.readAsDataURL(img)
      fr.onload = (e) => {
        this.activityForm.imgUrl = e.target.result
      }
    },
    editItem() {
      const file = this.activityForm.file
      const id = this.activityForm.id
      return addOrEditActivity(this.activityForm).then(async(res) => {
        if (file) {
          await uploadPic('activity', id, file)
        }
        return Promise.resolve(res)
      })
    },
    async getEditImg(item) {
      const res = await getPicList('activity', item.id)
      if (res.length) this.activityForm.imgUrl = `http://www.rulework.top:8081/api/pic/show/${res[0].id}`
    },
    delItem(id) {
      return delActivity(id)
    },
    getAddress(query) {
      this.options = []
      if (query) {
        this.addrLoading = true
        const url = `https://restapi.amap.com/v3/assistant/inputtips?keywords=${query}&key=9fcada367fa81ec288215ddaf475ef54`
        jsonp(url).then((res) => {
          const { tips } = res
          tips.forEach(({ district, address, name, location }) => {
            this.options.push({
              label: district + address + name,
              value: location
            })
          })
          this.addrLoading = false
        })
      }
    },
    getAddrOpt(opt) {
      const [longitude, latitude] = opt.value.split(',')
      this.activityForm.longitude = longitude
      this.activityForm.latitude = latitude
      this.activityForm.address = opt.label
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
