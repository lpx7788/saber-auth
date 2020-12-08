<template>
  <basic-container>
    <div class="collect-company">
      <avue-crud :option="companyOption"
                 :table-loading="companyLoading"
                 :data="companyDatas"
                 :page.sync="page"
                 v-model="form"
                 ref="crud"
                 @current-change="currentChange"
                 @size-change="sizeChange"
                 @on-load="companyOnLoad"
                 @search-change="searchChange"
                 @search-reset="searchReset">
        <template slot="typeSearch">
          <el-select size="small"
                     v-model="query.type"
                     @change="changeType">
            <el-option label="卖家"
                       value="1"></el-option>
            <el-option label="买家"
                       value="2"></el-option>
          </el-select>
        </template>
        <template slot="querySearch">
          <el-select size="small"
                     v-model="query.companyCode"
                     allow-create
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option></el-option>
          </el-select>
        </template>
        <template slot="search">
          <el-input class="searchInput"
                    v-model="query.queryKey"
                    placeholder="请输入关键词"></el-input>
        </template>
      </avue-crud>
    </div>
  </basic-container>
</template>
<script>

export default {
  components: {

  },
  data() {
    return {
      consultationSourceSelectArr: [],
      companyLoading: true, // 表格loading
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      query: {
        companyCode: '',
        queryKey: '',
        type: '1',
      }, // 参数
      companyOption: {
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
            label: '成交品种',
            prop: '',
          },
          {
            label: '成交数量',
            prop: '',
          },
          {
            label: '成交金额',
            prop: '',
          },
          {
            label: '日期',
            prop: 'createDate',
          },
          {
            label: '交易公司',
            prop: 'query',
            showColumn: false,
            hide: true,
            search: true,
            searchslot: true,
          },
          {
            label: '交易身份',
            prop: 'type',
            showColumn: false,
            hide: true,
            search: true,
            searchslot: true,
            searchSpan: 4,
          },
        ],
      }, // 表格配置参数
      companyDatas: [], // 表格数据列表
    };
  },
  created() {
    this.companyOption.column.splice(1, 0, {
      label: this.query.type === '1' ? '买家' : '卖家',
      prop: '',
    })
  },
  methods: {
    searchReset() {
      this.query = {
        companyCode: '',
        queryKey: '',
        type: this.query.type,
      }
    },
    searchChange(params, done) {
      done()
    },
    changeType() {
      this.companyOption.column[1].label = this.query.type === '1' ? '买家' : '卖家'
    },
    handleChange() {
    },
    // 获取当前页
    currentChange(currentPage) {
      this.page.currentPage = currentPage
    },
    // 每页数据条数
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.companyOnLoad();
    },
    // 初始化页面
    companyOnLoad() {
      this.companyLoading = false
    },
  },
};
</script>
<style lang="scss">
.collect-company {
  .avue-crud__menu {
    min-height: 0px !important;
  }
  .export {
    display: inline-block;
  }
  .el-tabs {
    border: 1px solid #eee;
  }
  .elForm {
    .el-form-item__content {
      display: inline-block;
    }
  }
}
</style>
