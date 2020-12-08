<template>
  <basic-container class="integral_guidePrice">
    <avue-crud :data="data"
               :option="option"
               :table-loading="loading"
               :page.sync="page"
               :before-open="beforeOpen"
               @current-change="currentChange"
               @size-change="sizeChange"
               @row-save="rowSave"
               @row-update="rowUpdate"
               @on-load="init"
               @search-change="searchChange"
               @search-reset="searchReset"
               @refresh-change="refreshChange">
      <template slot="statusSearch"
                slot-scope="{ }">
        <el-select v-model="guideStatus"
                   @change="changeGuideStatus">
          <el-option label="全部"
                     value=""></el-option>
          <el-option label="生效中"
                     value="1"></el-option>
          <el-option label="已停用"
                     value="0"></el-option>
        </el-select>
      </template>
      <template slot-scope="{ row }"
                slot="categoryNameForm">
        <span>{{ getCategoryCode(row.categoryCode) }}</span>
        <categoryCascade v-model="category" />
      </template>
      <template slot-scope="{ row }"
                slot="status">
        <el-tag :type="row.status === 1 ? 'success' : 'danger'">
          {{ row.status === 1 ? "生效中" : "已停用" }}
        </el-tag>
      </template>
      <template slot-scope="scope"
                slot="closingDate">
        <div>{{ moment(scope.row.closingDate).format("YYYY-MM-DD") }}</div>
      </template>
      <template slot-scope="{ row }"
                slot="menu">
        <el-popconfirm :title="
            row.status === 1
              ? '此操作将停用该指导价, 是否继续?'
              : '此操作将启用该指导价, 是否继续?'
          "
                       class="ml10"
                       @onConfirm="switchHandle(row)">
          <el-button size="small"
                     type="text"
                     slot="reference"
                     :icon="row.status === 1 ? 'el-icon-close' : 'el-icon-check'">{{ row.status === 1 ? "停用" : "启用" }}</el-button>
        </el-popconfirm>
      </template>
    </avue-crud>
  </basic-container>
</template>
<script>
import { queryGuidePriceList, addGuidePrice, openStopGuidePrice } from '@/api/integral/guidePrice'
import categoryCascade from '@/components/category-cascader'
import { findCategoryParent } from '@/util/util'

const moment = require('moment');

export default {
  data() {
    let categoryRule = (rule, value, callback) => {
      if (this.category.length === 0) {
        callback(new Error('请选择商品品种'));
      } else {
        callback();
      }
    }
    return {
      changeAble: true,
      category: [],
      guideStatus: '',
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      data: [],
      option: {
        index: true,
        delBtn: false,
        viewBtn: false,
        border: true,
        menuWidth: 150,
        dialogWidth: 500,
        labelWidth: 130,
        searchMenuSpan: 4,
        column: [
          {
            label: '指导价编号',
            prop: 'guidePriceId',
            span: 24,
            width: 100,
            addDisplay: false,
            editDisplay: false,
          },
          {
            label: '商品品种',
            prop: 'categoryName',
            span: 24,
            formslot: true,
            rules: [{
              required: true,
              validator: categoryRule,
              trigger: 'change',
            }],
          },
          {
            label: '品牌',
            prop: 'brand',
            span: 24,
          },
          {
            label: '规格',
            prop: 'spec',
            span: 24,
          },
          {
            label: '材质',
            prop: 'material',
            span: 24,
          },
          {
            label: '仓库',
            prop: 'wareHouse',
            span: 24,
          },
          {
            label: '指导价',
            prop: 'guidePrice',
            span: 24,
            rules: [{
              required: true,
              message: '请输入指导价',
              trigger: 'blur',
            }],
          },
          {
            label: '状态',
            prop: 'status',
            span: 24,
            row: true,
            slot: true,
            addDisplay: false,
            editDisplay: false,
            search: true,
            searchslot: true,
            searchSpan: 4,
            searchLabelWidth: 50,
          }, {
            label: '有效截止日期',
            prop: 'closingDate',
            span: 24,
            type: 'date',
            row: true,
            slot: true,
            rules: [{
              required: true,
              message: '请选择有效截止日期',
              trigger: 'blur',
            }],
            width: '180',
            valueFormat: 'timestamp',
          },
        ],
      },
      optionForm: {},
      formData: {},
      categoryTree: [],
    }
  },
  components: {
    categoryCascade,
  },
  methods: {
    moment,
    refreshChange() {
      this.page.currentPage = 1
      this.init()
    },
    searchChange(params, done) {
      this.init()
      done()
    },
    searchReset() {
      this.guideStatus = '',
        this.init()
    },
    getCategoryCode(code) {
      if (code) {
        let categoryCode = findCategoryParent(this.categoryTree, 'categoryCode', code)
        if (this.changeAble && (this.category.length === 0 || (this.category[1] !== categoryCode[1]))) {
          this.category = categoryCode
          this.changeAble = false
        }
      }
    },
    beforeOpen(done, type) {
      if (type === 'add') {
        this.category = []
      } else {
        this.changeAble = true
      }
      done()
    },
    // 启用、停用指导价
    switchHandle(row) {
      openStopGuidePrice({
        id: row.id,
        status: row.status === 1 ? '0' : '1',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
        this.init()
      }).catch(() => { })
    },
    rowUpdate(row, index, done) {
      this.submit(row, done, 2)
    },
    rowSave(row, done) {
      this.submit(row, done, 1)
    },
    changeGuideStatus() {
      this.init()
    },
    submit(formData, done, type) {
      let categoryName
      if (this.$store.state.category.categoryTree.length === 0) {
        categoryName = findCategoryParent(this.categoryTree, 'categoryCode', this.category[1], 'categoryName')
      } else {
        categoryName = findCategoryParent(this.categoryTree, 'categoryCode', this.category[1], 'categoryName')
      }
      const params = {
        categoryCode: this.category[1],
        categoryName: categoryName[1],
        brand: formData.brand,
        material: formData.material,
        spec: formData.spec,
        wareHouse: formData.wareHouse,
        guidePrice: formData.guidePrice,
        closingDate: formData.closingDate,
      }
      if (type === 2) {
        params.id = formData.id
      }
      addGuidePrice(params).then(() => {
        this.init()
        done()
      }).catch(() => { })
    },
    currentChange(val) {
      this.page.currentPage = val
    },
    sizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.queryExchangeList()
    },
    init() {
      this.loading = true
      queryGuidePriceList({
        status: this.guideStatus,
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
      }).then(res => {
        const returnData = res.data.returnObject
        this.data = returnData.list
        this.page.total = returnData.total
        this.loading = false
        this.$store.dispatch('QueryCategoryTree').then(res => {
          this.categoryTree = res
        })
      }).catch(() => { })
    },
  },
  created() {

  },
}
</script>

