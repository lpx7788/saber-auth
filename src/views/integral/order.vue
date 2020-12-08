<template>
  <basic-container class="integral_order">
    <avue-crud :data="data"
               :option="option"
               :table-loading="loading"
               :page.sync="page"
               @current-change="currentChange"
               @size-change="sizeChange"
               @on-load="queryIntegralOrders"
               @search-change="searchChange"
               @search-reset="searchReset"
               @refresh-change="refreshChange">
      <template slot="orderStatusSearch">
        <el-select v-model="orderStatus"
                   @change="changeOrderStatus">
          <el-option label="全部"
                     value=""></el-option>
          <el-option label="待确认"
                     value="1"></el-option>
          <el-option label="待发货"
                     value="2"></el-option>
          <el-option label="已发货"
                     value="3"></el-option>
          <el-option label="已拒绝"
                     value="4"></el-option>
        </el-select>
      </template>
      <template slot="search">
        <el-input class="searchInput"
                  v-model="searchText"
                  clearable
                  placeholder="请输入订单号、手机号、商品编号搜索"
                  @keyup.enter.native="queryIntegralOrders"
                  @clear="queryIntegralOrders"></el-input>
      </template>
      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-download"
                   @click="exportData">导出</el-button>
      </template>
      <template slot-scope="{ row }"
                slot="orderStatus">
        <el-tag :type="
            row.orderStatus === 1
              ? 'warning'
              : row.orderStatus === 2
              ? ''
              : row.orderStatus === 3
              ? 'success'
              : 'danger'
          ">
          {{
            row.orderStatus === 1
              ? "待确认"
              : row.orderStatus === 2
              ? "待发货"
              : row.orderStatus === 3
              ? "已发货"
              : "已拒绝"
          }}
        </el-tag>
      </template>
      <template slot-scope="scope"
                slot="address">
        <span>{{ scope.row.province }}</span>
        <span>{{ scope.row.city }}</span>
        <span>{{ scope.row.area }}</span>
        <span>{{ scope.row.address }}</span>
      </template>
      <template slot-scope="scope"
                slot="consigneeNamePhone">
        <div>{{ scope.row.consigneeName }}</div>
        <div>{{ scope.row.consigneePhone }}</div>
      </template>
      <template slot-scope="scope"
                slot="other">
        <div v-if="scope.row.orderStatus == 3">
          <el-tag>{{ scope.row.logisticsCompany }}</el-tag>
          <div class="primary">{{ scope.row.logisticsCode }}</div>
        </div>
        <div v-else>{{ scope.row.remark }}</div>
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
                   @click="openDrawer(row, 1)"
                   v-if="row.orderStatus === 2"><i class="iconfont icon-fahuo"></i> 去发货</el-button>
        <el-popconfirm title="是否确认该兑换订单的积分来源无误？确认后可进行发货操作。"
                       @onConfirm="examine(row, 1)">
          <el-button icon="el-icon-check"
                     slot="reference"
                     size="small"
                     type="text"
                     v-if="row.orderStatus === 1">确认</el-button>
        </el-popconfirm>
        <el-button icon="el-icon-close"
                   size="small"
                   type="text"
                   @click="openDrawer(row, 2)"
                   v-if="row.orderStatus === 1">拒绝</el-button>
      </template>
    </avue-crud>
    <el-dialog :title="drawerType === 1 ? '发货' : '拒绝'"
               :visible.sync="drawer"
               :before-close="handleClose"
               :append-to-body="true">
      <avue-form :option="optionForm"
                 @submit="submitForm"></avue-form>
    </el-dialog>
  </basic-container>
</template>
<script>
import { queryIntegralOrder, updateIntegralOrder, refuseIntegralOrder } from '@/api/integral/order'
import projectConfig from '@/api/projectConfig'
import { baseExportDataUrl } from '@/config/env'

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
        menuWidth: 100,
        searchMenuSpan: 4,
        column: [
          {
            label: '提交时间',
            prop: 'createDate',
            row: true,
            slot: true,
            span: 24,
            minWidth: '160',
          },
          {
            label: '积分订单号',
            prop: 'integralOrderCode',
            span: 24,
            minWidth: '160',
          },
          {
            label: '提交用户手机号码',
            prop: 'submitterPhone',
            span: 24,
            minWidth: '130',
          },
          {
            label: '支出积分数',
            prop: 'spendingIntegral',
            span: 24,
            minWidth: '100',
          },
          {
            label: '兑换商品编号',
            prop: 'commodityCode',
            span: 24,
            minWidth: '100',
          },
          {
            label: '兑换商品',
            prop: 'commodityName',
            span: 24,
            overHidden: true,
            minWidth: '100',
          },
          {
            label: '兑换物品数量',
            prop: 'cashingNum',
            span: 24,
            minWidth: '100',
          },
          {
            label: '订单状态',
            prop: 'orderStatus',
            span: 24,
            row: true,
            slot: true,
            search: true,
            searchslot: true,
            searchSpan: 4,
            width: '100',
          },
          {
            label: '收货地址',
            prop: 'address',
            slot: true,
            row: true,
            span: 24,
            overHidden: true,
            minWidth: '180',
          },
          {
            label: '收货人及手机号码',
            prop: 'consigneeNamePhone',
            slot: true,
            row: true,
            span: 24,
            minWidth: '130',
          },
          {
            label: '其他信息',
            prop: 'other',
            slot: true,
            row: true,
            span: 24,
            minWidth: '150',
          },
          {
            label: '最后操作时间',
            prop: 'lastupdateDate',
            slot: true,
            row: true,
            span: 24,
            minWidth: '160',
          },
          {
            label: '操作人',
            prop: 'lastupdateName',
            span: 24,
            width: '100',
          },
        ],
      },
      optionForm: {},
      sendData: {},
    }
  },
  methods: {
    moment,
    refreshChange() {
      this.page.currentPage = 1
      this.queryIntegralOrders()
    },
    searchChange(params, done) {
      this.queryIntegralOrders()
      done()
    },
    searchReset() {
      this.searchText = '';
      this.orderStatus = '';
      this.queryIntegralOrders()
    },
    exportData() {
      this.$message.success('数据导出中，请耐心等待')
      window.location.href = this.exportDataUrl
    },
    // 去发货
    submitForm(form, done) {
      const params = {}
      if (this.drawerType === 1) {
        params.orderStatus = this.sendData.orderStatus;
        params.logisticsCompany = form.logisticsCompany;
        params.logisticsCode = form.logisticsCode;
        params.remark = form.remark;
        updateIntegralOrder(Object.assign(params, {
          id: this.sendData.id,
        })).then(() => {
          this.drawer = false;
          this.queryIntegralOrders();
          done()
        })
      } else {
        params.remark = form.remark
        refuseIntegralOrder(params).then(() => {
          this.drawer = false;
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          this.queryIntegralOrders();
          done()
        }).catch(() => { })
      }
    },
    openDrawer(row, type) {
      this.drawerType = type
      this.sendData = row
      this.drawer = true
      if (type === 1) {
        this.optionForm = {
          emptyBtn: false,
          column: [{
            label: '物流公司',
            type: 'input',
            prop: 'logisticsCompany',
            span: 24,
            rules: [{
              required: true,
              message: '请输入物流公司',
              trigger: 'change',
            }],
          }, {
            label: '物流单号',
            type: 'input',
            prop: 'logisticsCode',
            rules: [{
              required: true,
              message: '请输入物流单号',
              trigger: 'change',
            }],
            span: 24,
          }, {
            label: '备注',
            type: 'input',
            prop: 'remark',
            span: 24,
          }],
        }
      } else {
        this.optionForm = {
          emptyBtn: false,
          column: [{
            label: '拒绝理由',
            type: 'textarea',
            prop: 'remark',
            span: 24,
            rules: [{
              required: true,
              message: '请输入拒绝理由',
              trigger: 'change',
            }],
          }],
        }
      }
    },
    examine(row) {
      updateIntegralOrder({
        id: row.id,
        orderStatus: row.orderStatus,
      }).then(() => {
        this.queryIntegralOrders()
      }).catch(() => { })
    },
    currentChange(val) {
      this.page.currentPage = val
    },
    sizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.queryIntegralOrders()
    },
    changeOrderStatus() {
      const pageData = {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      }
      this.page = pageData;
      this.queryIntegralOrders()
    },
    queryIntegralOrders() {
      this.loading = true
      queryIntegralOrder({
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
    this.exportDataUrl = baseExportDataUrl + projectConfig.URL_integral_order_exportData
  },
}
</script>
