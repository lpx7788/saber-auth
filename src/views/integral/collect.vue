<template>
  <basic-container class="integral_collect">
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
                  placeholder="输入用户姓名、手机号搜索"
                  @keyup.enter.native="init"
                  @clear="init"></el-input>
      </template>
      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-download"
                   @click="exportData">导出</el-button>
      </template>
      <template slot-scope="{ row }"
                slot="createDate">
        <div>{{ moment(row.createDate).format("YYYY-MM-DD HH:mm:ss") }}</div>
      </template>
      <template slot-scope="scope"
                slot="type">
        <div>
          {{
            scope.row.type === "1"
              ? "交易赠送"
              : scope.row.type ==="2"
              ? "系统退还"
              : scope.row.type === "3"
              ? "其他赠送"
              : "系统扣除"
          }}
        </div>
      </template>
    </avue-crud>
  </basic-container>
</template>
<script>
import queryIntegralUserList from '@/api/integral/collect'

const moment = require('moment');

export default {
  data() {
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
          label: '买手姓名',
          prop: 'name',
          span: 24,
        }, {
          label: '手机号码',
          prop: 'userPhone',
          span: 24,
        }, {
          label: '当前剩余积分',
          prop: 'availableIntegral',
          span: 24,
        }, {
          label: '即将获得积分',
          prop: 'aboutToIntegral',
          span: 24,
        }, {
          label: '兑换使用积分',
          prop: 'residueIntegral',
          span: 24,
        }, {
          label: '系统扣除积分',
          prop: 'systemDeduct',
          span: 24,
        }, {
          label: '已兑换次数',
          prop: 'num',
          span: 24,
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
      exportDataUrl: '',
    }
  },
  methods: {
    moment,
    refreshChange() {
      this.page.currentPage = 1
      this.init()
    },
    cellStyle({ columnIndex }) {
      let colorStatus
      switch (columnIndex) {
        case 3:
          colorStatus = '#67c23a'
          break;
        case 4:
          colorStatus = '#e6a23c'
          break;
        case 5:
          colorStatus = '#409eff'
          break;
        case 6:
          colorStatus = '#f56c6c'
          break;
        default:
          colorStatus = ''
          break;
      }
      return {
        color: colorStatus,
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
    init() {
      this.loading = true
      queryIntegralUserList({
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

