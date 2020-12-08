<template>
  <basic-container class="integral_detail">
    <avue-crud :data="data"
               :option="option"
               :table-loading="loading"
               :page.sync="page"
               @current-change="currentChange"
               @size-change="sizeChange"
               @on-load="init"
               @search-change="searchChange"
               @search-reset="searchReset"
               @refresh-change="refreshChange">
      <template slot="typeSearch">
        <el-select v-model="detailType"
                   class="integral-select"
                   @change="changeDetailType">
          <el-option label="收入明细"
                     value="1"></el-option>
          <el-option label="支出明细"
                     value="2"></el-option>
          <el-option label="即将获得明细"
                     value="3"></el-option>
        </el-select>
      </template>
      <template slot="search">
        <datePicker @input="dateChange"
                    :defaultTime="currentTime"
                    :formatType="'yyyy-MM-dd'" />
        <el-input class="searchInput"
                  v-model="searchVal"
                  clearable
                  placeholder="输入积分订单号、手机号搜索"
                  @keyup.enter.native="init"
                  @clear="init"></el-input>
      </template>
      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-download"
                   size="small"
                   @click="exportData">导出</el-button>
      </template>
      <template slot-scope="{ row }"
                :slot="detailType === '1' ? 'lastupdateTime' : 'createTime'">
        <div>
          {{
            moment(
              detailType === "1" ? row.lastupdateTime : row.createTime
            ).format("YYYY-MM-DD HH:mm:ss")
          }}
        </div>
      </template>
      <template slot-scope="scope"
                slot="integralSource">
        <div>
          {{
            scope.row.integralSource == "1"
              ? "点价下单成交获得积分"
              : scope.row.integralSource == "2"
              ? "确定价下单成交获得积分"
              : scope.row.integralSource == "3"
              ? "点价下单成交，且达到指导价获得积分"
              : "确定价下单成交，且达到指导价获得积分"
          }}
        </div>
      </template>
      <template slot-scope="{ row }"
                slot="integralType">
        <el-tag :type="
            row.integralType === 1
              ? 'success'
              : row.integralType === 2
              ? 'warning'
              : row.integralType === 3
              ? ''
              : row.integralType === 4
              ? 'info'
              : 'danger'
          ">
          {{
            row.integralType === 1
              ? "交易赠送"
              : row.integralType === 2
              ? "系统退还"
              : row.integralType === 3
              ? "积分兑换"
              : row.integralType === 4
              ? "其他赠送"
              : "系统扣除"
          }}
        </el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>
<script>
import queryIntegralDetailList from '@/api/integral/detail'
import projectConfig from '@/api/projectConfig'
import { baseExportDataUrl } from '@/config/env'
import datePicker from '@/components/date-picker/main'

const moment = require('moment');

export default {
  data() {
    return {
      loading: false,
      currentTime: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      data: [],
      detailType: '1',
      option: {
        index: true,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        viewBtn: false,
        border: true,
        menu: false,
        searchMenuSpan: 4,
        column: [],
      },
      exportDataUrl: '',
      searchVal: '',
    }
  },
  components: {
    datePicker,
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
      this.currentTime = []
      this.searchVal = ''
      this.init()
    },
    dateChange(date) {
      this.currentTime = date
      this.init()
    },
    searchHandle() {
      this.init()
    },
    currentChange(val) {
      this.page.currentPage = val
    },
    sizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.init()
    },
    exportData() {
      this.$message.success('数据导出中，请耐心等待')
      window.location.href = this.exportDataUrl
    },
    changeDetailType() {
      this.page.currentPage = 1;
      let timeType;
      if (this.detailType === '1') {
        timeType = '收入时间'
      } else if (this.detailType === '2') {
        timeType = '支出时间'
      } else {
        timeType = '下单时间'
      }
      const column = [
        {
          label: '明细类型',
          prop: 'type',
          span: 24,
          showColumn: false,
          hide: true,
          search: true,
          searchslot: true,
          searchSpan: 4,
        },
        {
          label: timeType,
          prop: this.detailType === '1' ? 'lastupdateTime' : 'createTime',
          span: 24,
          row: true,
          slot: true,
        }, {
          label: '用户手机号码',
          prop: 'userPhone',
          span: 24,
        }, {
          label: '类型',
          prop: 'integralType',
          span: 24,
          row: true,
          slot: true,
        }, {
          label: '相关订单号',
          prop: 'integralCode',
          span: 24,
        },
      ]
      if (this.detailType === '1') {
        this.option.column = column.concat([{
          label: '获得积分数',
          prop: 'integralNum',
          span: 24,
        }])
      } else if (this.detailType === '2') {
        this.option.column = column.concat([{
          label: '支出积分数',
          prop: 'integralNum',
          span: 24,
        }, {
          label: '兑换物品',
          prop: 'exchangeItemName',
          span: 24,
          overHidden: true,
        }, {
          label: '兑换数量',
          prop: 'exchangeItemNum',
          span: 24,
        }])
      } else {
        this.option.column = column.concat([{
          label: '预计可获得积分数',
          prop: 'integralNum',
          span: 24,
        }, {
          label: '获得条件',
          prop: 'integralSource',
          span: 24,
          row: true,
          slot: true,
        }])
      }
      this.init()
    },
    init() {
      this.loading = true
      queryIntegralDetailList({
        state: this.detailType,
        condition: this.searchVal,
        creatDate: this.currentTime ? this.currentTime[0] : '',
        endDate: this.currentTime ? this.currentTime[1] : '',
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
      }).then(res => {
        const returnData = res.data.returnObject
        this.data = returnData.list
        this.page.total = returnData.total
        this.loading = false
        this.exportDataUrl = `${baseExportDataUrl}${projectConfig.URL_integral_detail_export}?status=${this.detailType}`
      }).catch(() => { })
    },
  },
  created() {
    let timeType;
    let timeName;
    if (this.detailType === '1') {
      timeType = '收入时间'
      timeName = 'lastupdateTime'
    } else if (this.detailType === '2') {
      timeType = '支出时间'
      timeName = 'createTime'
    } else {
      timeType = '下单时间'
      timeName = 'createTime'
    }
    this.option.column = [
      {
        label: '明细类型',
        prop: 'type',
        span: 24,
        showColumn: false,
        hide: true,
        search: true,
        searchslot: true,
        searchSpan: 4,
      },
      {
        label: timeType,
        prop: timeName,
        span: 24,
        row: true,
        slot: true,
      }, {
        label: '用户手机号码',
        prop: 'userPhone',
        span: 24,
      }, {
        label: '类型',
        prop: 'integralType',
        span: 24,
        row: true,
        slot: true,
      }, {
        label: '相关订单号',
        prop: 'integralCode',
        span: 24,
      }, {
        label: '获得积分数',
        prop: 'integralNum',
        span: 24,
      },
    ]
  },
}
</script>
<style scoped>
.integral-select {
  width: 150px;
}
</style>
