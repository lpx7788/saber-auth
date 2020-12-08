<template>
  <basic-container>
    <div class="proposal">
      <avue-crud :option="proposalOption"
                 :table-loading="proposalLoading"
                 :data="proposalDatas"
                 :page.sync="page"
                 v-model="form"
                 ref="crud"
                 @current-change="currentChange"
                 @search-change="searchChange"
                 @search-reset="searchReset"
                 @size-change="sizeChange"
                 @on-load="proposalkOnLoad"
                 @refresh-change="refreshChange">
        <template slot-scope="{ row }"
                  slot="typeName">
          <el-tag :type="
              row.type === '1'
                ? 'warning'
                : row.type === '2'
                ? ''
                : row.type === '3'
                ? 'danger'
                : 'info'
            ">
            {{
              row.type === "1"
                ? "缺少商品"
                : row.type === "2"
                ? "优化建议"
                : row.type === "3"
                ? "错误反馈"
                : "其他"
            }}
          </el-tag>
        </template>
        <template slot="querySearch">
          <el-input v-model="query.queryKey"
                    clearable
                    placeholder="请输入用户/手机号码"
                    @keyup.enter.native="proposalkOnLoad"
                    @clear="proposalkOnLoad"></el-input>
        </template>

        <template slot="menuLeft">
          <a :href="exportDataUrl"
             class="export">
            <el-button type="primary"
                       icon="el-icon-download"
                       @click="exportExcel"
                       size="small">导出</el-button>
          </a>
        </template>
      </avue-crud>
    </div>
  </basic-container>
</template>
<script>
import getFeedbackList from '@/api/proposal';
import { baseExportDataUrl } from '@/config/env'
import projectConfig from '@/api/projectConfig'


export default {
  data() {
    return {
      proposalLoading: true, // 表格loading
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      }, // 请求页数相关
      exportDataUrl: '', // 导出路径
      query: {
        queryKey: '',
      }, // 参数
      proposalOption: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        border: true,
        index: true,
        selectClearBtn: false,
        menu: false,
        addBtn: false,
        menuWidth: 200,
        labelWidth: 100,
        dialogWidth: 880,
        dialogClickModal: false,
        searchMenuSpan: 4,
        column: [
          {
            label: '反馈时间',
            prop: 'createDate',
          },
          {
            label: '用户姓名',
            prop: 'name',
          },
          {
            label: '手机号码',
            prop: 'phone',
          },
          {
            label: '类型',
            prop: 'typeName',
            slot: true,
          },
          {
            label: '备注',
            prop: 'remark',
          },
          {
            label: '',
            prop: 'query',
            showColumn: false,
            hide: true,
            search: true,
            searchslot: true,
            searchLabelWidth: 1,
          },
        ],
      }, // 表格配置参数
      proposalDatas: [], // 表格数据列表
    };
  },

  created() {
    this.exportDataUrl = baseExportDataUrl + projectConfig.URL_proposal_exportData;
  },
  methods: {
    refreshChange() {
      this.page.currentPage = 1
      this.proposalkOnLoad()
    },
    // 导出订单列表
    exportExcel() {
      this.$message({
        message: '数据正在导出,请耐心等候',
        type: 'success',
      });
    },
    searchChange(params, done) {
      this.page.currentPage = 1;
      this.proposalkOnLoad();
      done()
    },
    searchReset() {
      this.query.queryKey = ''
      this.proposalkOnLoad();
    },
    // 获取当前页面
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    // 每页数据量
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.proposalkOnLoad();
    },
    // 初始化页面
    proposalkOnLoad() {
      this.proposalLoading = true;
      const query = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
        queryKey: this.query.queryKey,
      };
      getFeedbackList(query).then(
        res => {
          const resData = res.data.returnObject;
          this.page.total = resData.total;
          this.proposalDatas = resData.list
          this.proposalLoading = false;
        },
        () => {
          this.proposalLoading = false;
        }
      ).catch(() => { });
    },
  },
};
</script>
<style lang="scss">
.proposal {
  .avue-crud__menu {
    min-height: 20px !important;
  }
  .export {
    display: inline-block;
  }
}
</style>
