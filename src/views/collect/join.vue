<template>
  <basic-container>
    <div class="join-page">
      <avue-crud :option="joinOption"
                 :table-loading="joinLoading"
                 :data="joinDatas"
                 :page.sync="page"
                 v-model="form"
                 ref="crud"
                 @current-change="currentChange"
                 @size-change="sizeChange"
                 @on-load="joinOnLoad">
        <template slot="querySearch">
          <el-input v-model="query.queryKey"
                    clearable
                    placeholder="请输入公司名字/品种名称"></el-input>
        </template>
      </avue-crud>
    </div>
  </basic-container>
</template>
<script>
import { baseExportDataUrl } from '@/config/env';
import projectConfig from '@/api/projectConfig';

export default {
  data() {
    return {
      consultationSourceSelectArr: [],
      joinLoading: false, // 表格loading
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      }, // 请求页数相关
      exportDataUrl: '', // 导出路径
      query: {
        queryKey: '',
      }, // 参数
      joinOption: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        border: true,
        index: true,
        selectClearBtn: false,
        addBtn: false,
        menuWidth: 200,
        menu: false,
        labelWidth: 100,
        dialogWidth: 880,
        dialogClickModal: false,
        searchMenuSpan: 4,
        column: [
          {
            label: '公司',
            prop: 'createDate',
          },
          {
            label: '交易品种',
            prop: 'name',
          },
          {
            label: '业务经理',
            prop: 'phone',
          },
          {
            label: '入驻申请时间',
            prop: 'typeName',
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
      joinDatas: [], // 表格数据列表
    };
  },

  created() {
    // this.exportDataUrl =baseExportDataUrl + projectConfig.URL_proposal_exportData;
    this.exportDataUrl = `${baseExportDataUrl}${projectConfig.URL_proposal_exportData}`;
  },
  methods: {
    // 导出订单列表
    exportExcel() {
      this.$message({
        message: '数据正在导出,请耐心等候',
        type: 'success',
      });
    },
    // 搜索关键字
    onSearch() {
      this.page.currentPage = 1;
      this.joinOnLoad();
    },
    // 获取当前页面
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    // 每页数据量
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.joinOnLoad();
    },
    // 初始化页面
    joinOnLoad() {
      // this.joinLoading = true
    },
  },
};
</script>
<style lang="scss">
.join-page {
  .avue-crud__menu {
    min-height: 20px !important;
  }
  .export {
    display: inline-block;
  }
}
</style>
