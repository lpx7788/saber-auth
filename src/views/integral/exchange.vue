<template>
  <basic-container class="integral_exchange">
    <avue-crud :data="data"
               :option="option"
               :table-loading="loading"
               :page.sync="page"
               :cell-style="cellStyle"
               @current-change="currentChange"
               @size-change="sizeChange"
               @on-load="queryExchangeList"
               @refresh-change="refreshChange">
      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click="openDrawer(1)">新增</el-button>
      </template>
      <template slot-scope="scope"
                slot="lastupdateDate">
        <div>
          {{ moment(scope.row.lastupdateDate).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
      </template>
      <template slot-scope="scope"
                slot="createDate">
        <div>
          {{ moment(scope.row.createDate).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
      </template>
      <template slot-scope="{ row }"
                slot="menu">
        <el-button size="small"
                   type="text"
                   @click="openDrawer(2, row)"><i class="el-icon-edit"></i> 编辑</el-button>
        <el-popconfirm title="确定删除该兑换设置？"
                       class="ml10"
                       @onConfirm="delExchange(row)">
          <el-button size="small"
                     type="text"
                     slot="reference"
                     icon="el-icon-close">删除</el-button>
        </el-popconfirm>
      </template>
    </avue-crud>
    <el-dialog :title="drawerType === 1 ? '新增' : '编辑'"
               :visible.sync="drawer"
               :append-to-body="true"
               width="30%"
               @open="drawerOpen">
      <avue-form ref="drawerForm"
                 :option="optionForm"
                 v-model="formData"
                 @submit="submitForm">
        <template slot="commodityPhoto">
          <upload ref="commodityPhoto"
                  :change="changeImage"
                  :height="200"
                  :width="200" />
        </template>
      </avue-form>
    </el-dialog>
  </basic-container>
</template>
<script>
import { queryCashingCommodityList, joinCashingCommodity, delCashingCommodity } from '@/api/integral/exchange'
import upload from '@/components/upload'

const moment = require('moment');

export default {
  data() {
    return {
      loading: false,
      drawer: false,
      drawerType: 1,
      searchText: '',
      orderStatus: '',
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      data: [],
      option: {
        index: true,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        viewBtn: false,
        border: true,
        menuWidth: 150,
        column: [
          {
            label: '商品编号',
            prop: 'commodityCode',
            span: 24,
            width: 100,
          },
          {
            label: '商品名称',
            prop: 'commodityName',
            span: 24,
            overHidden: true,
          },
          {
            label: '兑换积分',
            prop: 'cashingIntegral',
            span: 24,
          },
          {
            label: '总库存',
            prop: 'stockNum',
            span: 24,
          },
          {
            label: '剩余库存',
            prop: 'remainingStock',
            span: 24,
          },
          {
            label: '创建时间',
            prop: 'createDate',
            span: 24,
            row: true,
            slot: true,
            width: '180',
          },
          {
            label: '最后修改时间',
            prop: 'lastupdateDate',
            span: 24,
            row: true,
            slot: true,
            width: '180',
          },
          {
            label: '修改人',
            prop: 'lastupdateName',
            span: 24,
          },
        ],
      },
      optionForm: {},
      formData: {},
      sendData: {},
    }
  },
  components: {
    upload,
  },
  methods: {
    moment,
    refreshChange() {
      this.page.currentPage = 1
      this.queryExchangeList()
    },
    cellStyle({ columnIndex }) {
      let colorStatus = ''
      if (columnIndex === 3) {
        colorStatus = '#409eff'
      } else if (columnIndex === 4) {
        colorStatus = '#e6a23c'
      } else if (columnIndex === 5) {
        colorStatus = '#67c23a'
      }
      return {
        color: colorStatus,
      }
    },
    changeImage(data) {
      this.formData.commodityPhoto = data
    },
    // 删除
    delExchange(row) {
      this.loading = true
      delCashingCommodity({
        id: row.id,
      }).then(() => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
        this.queryExchangeList()
      }).catch(() => {
      })
    },
    // 新增、编辑
    submitForm(form, done) {
      const formData = new FormData()
      formData.append('commodityName', form.commodityName)
      formData.append('cashingIntegral', form.cashingIntegral)
      formData.append('stockNum', form.stockNum)
      if (this.drawerType === 1) {
        formData.append('commodityPhoto', form.commodityPhoto)
      } else {
        formData.append('Pid', form.id)
        formData.append('saveStockNum', form.saveStockNum === '' ? 0 : form.saveStockNum)
        if (form.commodityPhoto) {
          formData.append('commodityPhoto', form.commodityPhoto)
        }
      }
      joinCashingCommodity(formData).then(() => {
        this.drawer = false
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
        this.queryExchangeList()
        done()
      }).catch(() => {
      })
    },
    drawerOpen() {
      this.$nextTick(() => {
        this.$refs.commodityPhoto.setFile(this.drawerType === 1 ? '' : this.sendData.commodityPhoto)
      })
    },
    openDrawer(type, row) {
      this.drawerForm = {}
      this.drawerType = type
      this.sendData = row
      this.drawer = true
      this.optionForm = {
        emptyBtn: false,
        column: [{
          label: '商品名称',
          type: 'input',
          prop: 'commodityName',
          span: 24,
          rules: [{
            required: true,
            message: '请输入商品名称',
            trigger: 'change',
          }],
        }, {
          label: '商品图片',
          prop: 'commodityPhoto',
          rules: [{
            required: true,
            message: '请上传商品图片',
            trigger: 'change',
          }],
          span: 24,
          formslot: true,
        }, {
          label: '总库存',
          type: 'input',
          prop: 'stockNum',
          rules: [{
            required: true,
            message: '请输入总库存',
            trigger: 'change',
          }],
          span: 24,
          disabled: this.drawerType !== 1,
        }, {
          label: '兑换积分',
          type: 'input',
          prop: 'cashingIntegral',
          rules: [{
            required: true,
            message: '请输入兑换积分',
            trigger: 'change',
          }],
          span: 24,
        }],
      }
      if (type === 2) {
        const arr = [{
          label: '商品编号',
          type: 'input',
          prop: 'commodityCode',
          span: 24,
          disabled: true,
        }]
        const arr2 = [{
          label: '剩余库存',
          type: 'input',
          prop: 'remainingStock',
          span: 24,
          disabled: true,
        }, {
          label: '增加库存',
          type: 'input',
          prop: 'saveStockNum',
          span: 24,
        }]
        const column = arr.concat(this.optionForm.column.concat(arr2))
        this.optionForm.column = column
        this.formData = row
      } else {
        this.formData.commodityName = ''
        this.formData.commodityPhoto = null
        this.formData.commodityName = ''
        this.formData.cashingIntegral = ''
        this.formData.stockNum = ''
      }
    },
    currentChange(val) {
      this.page.currentPage = val
    },
    sizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.queryExchangeList()
    },
    queryExchangeList() {
      this.loading = true
      queryCashingCommodityList({
        orderStatus: this.orderStatus,
        condition: this.searchText,
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
      }).then(res => {
        const returnData = res.data.returnObject
        this.data = returnData.list
        this.page.total = returnData.total
        this.loading = false
      }).catch(() => { })
    },
  },
  created() {

  },
}
</script>

