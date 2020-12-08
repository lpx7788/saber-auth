<template>
  <basic-container class="integral_detail">
    <avue-crud :data="data"
               :option="option"
               :table-loading="loading"
               :page.sync="page"
               :cell-style="cellStyle"
               @current-change="currentChange"
               @size-change="sizeChange"
               @on-load="init"
               @search-change="searchChange"
               @search-reset="searchReset"
               @refresh-change="refreshChange">
      <template slot="querySearch">
        <el-input v-model="searchVal"
                  clearable
                  placeholder="输入积分订单号、手机号搜索"
                  @keyup.enter.native="init"
                  @clear="init"></el-input>
      </template>
      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click="drawer = true">新增</el-button>
      </template>
      <template slot-scope="{ row }"
                slot="createDate">
        <div>{{ moment(row.createDate).format("YYYY-MM-DD HH:mm:ss") }}</div>
      </template>
      <template slot-scope="{ row }"
                slot="type">
        <el-tag :type="
            row.type === 1
              ? 'success'
              : row.type === 2
              ? 'warning'
              : row.type === 3
              ? ''
              : row.type === 4
              ? 'info'
              : 'danger'
          ">
          {{
            row.type === 1
              ? "交易赠送"
              : row.type === 2
              ? "系统退还"
              : row.type === 3
              ? "积分兑换"
              : row.type === 4
              ? "其他赠送"
              : "系统扣除"
          }}
        </el-tag>
      </template>
    </avue-crud>
    <el-dialog title="新增"
               :visible.sync="drawer"
               width="30%"
               :append-to-body="true"
               @open="dialogOpen">
      <avue-form ref="drawerForm"
                 :option="optionForm"
                 v-model="formData"
                 @submit="submitForm">
        <template slot="userIntegral">
          <span>{{ userIntegral.availableIntegral }}</span>
        </template>
      </avue-form>
    </el-dialog>
  </basic-container>
</template>
<script>
import { queryIntegralAddRecordList, queryIntegralUserData, queryIntegralUserAdd } from '@/api/integral/add'

const moment = require('moment');

export default {
  data() {
    const userPhoneRule = (rule, value, callback) => {
      const phoneRegex = /^1[3456789]\d{9}$/
      if (phoneRegex.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的手机号码'));
      }
    }
    return {
      loading: false,
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
        menu: false,
        searchMenuSpan: 4,
        column: [{
          label: '用户手机号码',
          prop: 'userPhone',
          span: 24,
        }, {
          label: '增加积分',
          prop: 'integralNum',
          span: 24,
        }, {
          label: '类型',
          prop: 'type',
          span: 24,
          row: true,
          slot: true,
        }, {
          label: '相关订单号',
          prop: 'customerOrderCode',
          span: 24,
        }, {
          label: '备注',
          prop: 'remark',
          span: 24,
          overHidden: true,
        }, {
          label: '创建时间',
          prop: 'createDate',
          span: 24,
          row: true,
          slot: true,
        }, {
          label: '创建者',
          prop: 'createName',
          span: 24,
          width: '100',
        }, {
          label: '',
          prop: 'query',
          span: 24,
          showColumn: false,
          hide: true,
          search: true,
          searchslot: true,
          searchLabelWidth: 1,
        }],
      },
      searchVal: '',
      drawer: false,
      optionForm: {
        emptyBtn: false,
        labelWidth: '130',
        column: [{
          label: '用户手机号码',
          type: 'input',
          prop: 'userPhone',
          span: 24,
          change: (val) => {
            this.queryUserIntegral(val)
          },
          rules: [{
            required: true,
            validator: userPhoneRule,
            trigger: 'change',
          }],
        }, {
          label: '用户剩余积分',
          prop: 'userIntegral',
          span: 24,
          formslot: true,
        }, {
          label: '增加积分',
          type: 'input',
          prop: 'addIntegral',
          span: 24,
          rules: [{
            required: true,
            message: '请输入增加积分',
            trigger: 'change',
          }],
        }, {
          label: '类型',
          type: 'select',
          clearable: false,
          dicData: [{
            label: '交易赠送',
            value: 1,
          }, {
            label: '系统退还',
            value: 2,
          }, {
            label: '其他赠送',
            value: 3,
          }, {
            label: '系统扣除',
            value: 4,
          }],
          prop: 'type',
          span: 24,
        }, {
          label: '相关订单号',
          type: 'select',
          prop: 'orderCode',
          span: 24,
          dicData: [],
          props: {
            label: 'customerOrderCode',
            value: 'orderCode',
          },
          rules: [{
            required: true,
            message: '请选择相关订单号',
            trigger: 'change',
          }],
        }, {
          label: '备注',
          type: 'input',
          prop: 'remark',
          span: 24,
          rules: [{
            required: true,
            message: '请输入备注',
            trigger: 'change',
          }],
        }],
      },
      formData: {},
      userIntegral: {},
    }
  },
  methods: {
    moment,
    refreshChange() {
      this.page.currentPage = 1
      this.init()
    },
    // 增加积分显示绿色，扣减积分显示红色
    cellStyle({ row, columnIndex }) {
      let colorStatus
      if (columnIndex === 2) {
        if (row.integralNum > 0) {
          colorStatus = '#67c23a'
        } else {
          colorStatus = '#f56c6c'
        }
        return {
          color: colorStatus,
        }
      }
    },
    searchChange(params, done) {
      this.init()
      done()
    },
    searchReset() {
      this.searchVal = ''
      this.init()
    },
    dialogOpen() {
      this.formData.type = 1
    },
    queryUserIntegral(val) {
      const phoneRegex = /^1[3456789]\d{9}$/
      if (phoneRegex.test(val.value)) {
        queryIntegralUserData({ phone: val.value }).then(res => {
          this.userIntegral = res.data.returnObject
          this.optionForm.column[4].dicData = this.userIntegral.relevanceOrderList
        }).catch(() => { })
      } else {
        this.userIntegral = {}
        this.optionForm.column[4].dicData = []
        this.formData.orderCode = ''
      }
    },
    submitForm(form, done) {
      queryIntegralUserAdd({
        phone: form.userPhone,
        userCode: this.userIntegral.userCode,
        integralNum: form.addIntegral,
        type: form.type,
        orderCode: form.orderCode,
        customerOrderCode: form.$orderCode,
        remark: form.remark,
      }).then(() => {
        this.drawer = false
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
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
      this.init()
    },
    init() {
      this.loading = true
      queryIntegralAddRecordList({
        condition: this.searchVal,
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

