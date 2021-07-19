export default {
  data() {
    return {
      dialogTableVisible: false,
      selection: [],
      tableData: null,
      page: 1,
      limit: 8,
      loading: false,
      fullscreen: false,
      editIndex: -1,
      arrayData: null,
      dialogTitle: ''
    }
  },
  computed: {
    total() {
      return this.arrayData ? this.arrayData.length : 0
    }
  },
  methods: {
    getArrayData() {
      this.loading = true
      this.page = 1
      this.getItems(this.formData).then(res => {
        this.arrayData = res
        this.tableData = res.slice(0, this.limit)
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    getTableData() {
      this.loading = true
      setTimeout(() => {
        this.tableData = this.arrayData.slice((this.page - 1) * this.limit, this.page * this.limit)
        this.loading = false
      }, 200)
    },
    changePage(page) {
      this.page = page
      this.getTableData()
    },
    changeSize(size) {
      this.limit = size
      this.getTableData()
    },
    search() {
      this.getArrayData()
    },
    addOrEditItem(itemKey, form) {
      this.$refs[form].validate(async(valid) => {
        if (valid) {
          if (this.editIndex === -1) {
            this.addItem().then((res) => {
              this.getArrayData()
              this.$message.success('添加成功')
            })
          } else {
            const editData = Object.assign({}, this[itemKey])
            this.editItem().then((res) => {
              Object.assign(this.tableData[this.editIndex], editData)
              this.$message.success('修改成功')
            })
          }
          this.cancel(itemKey)
        }
      })
    },
    cancel(itemKey) {
      this.dialogTableVisible = false
      const origin = this.$options.data()
      this[itemKey] = origin[itemKey]
    },
    deleteOneItem(item, index) {
      this.delItem(item.id).then(() => {
        this.loading = true
        this.arrayData.splice((this.page - 1) * this.limit + index, 1)
        this.getTableData()
      })
    },
    deleteMoreItem() {
      if (!this.selection || this.selection.length === 0) return
      this.delItems(this.selection).then(() => {
        this.getArrayData()
      })
    },
    handleSelectionChange(val) {
      this.selection = val.map(item => item.id)
    },
    showDialog(addTitle, editTitle, itemKey = '', item = null, index = -1, callback = null) {
      this.editIndex = index
      if (item) {
        Object.assign(this[itemKey], item)
      }
      this.dialogTitle = index === -1 ? addTitle : editTitle
      if (callback) { callback(item) }
      this.dialogTableVisible = true
    }
  }
}
