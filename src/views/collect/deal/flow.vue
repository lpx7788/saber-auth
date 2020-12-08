<template>
  <basic-container>
    <div class="collect-flow">
      <avue-crud :option="flowOption"
                 :table-loading="flowLoading"
                 :data="flowDatas"
                 :page.sync="page"
                 v-model="form"
                 ref="crud"
                 @current-change="currentChange"
                 @size-change="sizeChange"
                 @on-load="flowOnLoad">
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
      flowLoading: false, // 表格loading
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      }, // 请求页数相关
      exportDataUrl: '', // 导出路径
      query: {
        queryKey: '',
      }, // 参数
      flowOption: {
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
            label: '卖家',
            prop: '',
          },
          {
            label: '买家',
            prop: '',
          },
          {
            label: '商品品种',
            prop: '',
            type: 'select',
            search: true,
            searchSpan: 5,
          },
          {
            label: '交易吨数',
            prop: '',
          },
          {
            label: '成交状态',
            prop: '',
          },
          {
            label: '业务经理',
            prop: '',
          },
          {
            label: '日期',
            prop: 'createDate',
          },
        ],
      }, // 表格配置参数
      flowDatas: [], // 表格数据列表
    };
  },

  created() {
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
      this.flowOnLoad();
    },
    // 获取当前页面
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    // 每页数据量
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.flowOnLoad();
    },
    // 初始化页面
    flowOnLoad() {

    },
  },
};
</script>
<style lang="scss">
.collect-flow {
  .avue-crud__menu {
    min-height: 20px !important;
  }
  .export {
    display: inline-block;
  }
}
</style>
