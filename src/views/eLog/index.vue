<template>
  <basic-container>
    <div class="eLog-page">
      <avue-crud :option="eLogOption"
                 :table-loading="eLogLoading"
                 :data="eLogDatas"
                 :page.sync="page"
                 v-model="form"
                 ref="crud"
                 @current-change="currentChange"
                 @size-change="sizeChange"
                 @search-change="searchChange"
                 @search-reset="searchReset"
                 @on-load="eLogOnLoad">
        <template slot="userNameSearch">
          <el-input v-model="query.userName"
                    clearable
                    placeholder="输入用户姓名搜索"></el-input>
        </template>
        <template slot="companyNameSearch">
          <el-input v-model="query.companyName"
                    clearable
                    placeholder="输入公司名称搜索"></el-input>
        </template>
        <template slot="callTime"
                  slot-scope="scope">
          <div>
            {{ moment(scope.row.callTime).format("YYYY-MM-DD HH:mm:ss") }}
          </div>
        </template>
        <template slot="requestUrl"
                  slot-scope="scope">
          <el-popover placement="top-start"
                      title="调用地址"
                      width="400"
                      trigger="hover">
            <pre style="white-space: pre-wrap"
                 v-html="scope.row.requestUrl"></pre>
            <div slot="reference">
              <pre class="ellipsis"
                   style="white-space: pre-wrap"
                   v-html="scope.row.requestUrl"></pre>
            </div>
          </el-popover>
        </template>
        <template slot="requestParam"
                  slot-scope="scope">
          <el-popover placement="top-start"
                      title="请求参数"
                      width="400"
                      trigger="hover">
            <pre style="white-space: pre-wrap"
                 v-html="analysisFun(scope.row.requestParam)"></pre>
            <div slot="reference">
              <pre class="ellipsis"
                   style="white-space: pre-wrap"
                   v-html="analysisFun(scope.row.requestParam)"></pre>
            </div>
          </el-popover>
        </template>
        <template slot="returnParam"
                  slot-scope="scope">
          <el-popover placement="top-start"
                      title="接口返回参数"
                      width="500"
                      trigger="hover">
            <pre style="white-space: pre-wrap"
                 v-html="analysisFun(scope.row.returnParam)"></pre>
            <div slot="reference">
              <pre class="ellipsis"
                   style="white-space: pre-wrap"
                   v-html="analysisFun(scope.row.returnParam)"></pre>
            </div>
          </el-popover>
        </template>
      </avue-crud>
    </div>
  </basic-container>
</template>
<script>

import getCaList from '@/api/elog/index';
const moment = require('moment');

export default {
  data() {
    return {
      eLogLoading: false, // 表格loading
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      }, // 请求页数相关
      query: {
        userName: '',
        companyName: '',
      }, // 参数
      eLogOption: {
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
            label: '公司名称',
            prop: 'companyName',
            search: true,
            searchslot: true,
            width: 210,
            align: 'center',
          },
          {
            label: '用户姓名',
            prop: 'userName',
            search: true,
            searchslot: true,
            width: 120,
            align: 'center',
          },
          {
            label: '调用接口名',
            prop: 'urlName',
            width: 250,
            align: 'center',
          },
          {
            label: '调用地址',
            prop: 'requestUrl',
            slot: true,
            align: 'center',
          },
          {
            label: '请求参数',
            prop: 'requestParam',
            slot: true,
            align: 'center',
          },
          {
            label: '接口返回参数',
            prop: 'returnParam',
            slot: true,
            align: 'center',
          },
          {
            label: '请求时间',
            prop: 'callTime',
            slot: true,
            align: 'center',
            width: 160,
          },
        ],
      }, // 表格配置参数
      eLogDatas: [], // 表格数据列表
    };
  },

  methods: {
    moment,
    analysisFun(src) {
      src = JSON.parse(src)
      src = JSON.stringify(src, null, 4)
      return src
    },
    // 搜索关键字
    onSearch() {
      this.page.currentPage = 1;
      this.eLogOnLoad();
    },
    // 获取当前页面
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    // 每页数据量
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.eLogOnLoad();
    },
    //重置表单
    searchReset() {
      this.query.userName = '';
      this.query.companyName = '';
      this.eLogOnLoad();
    },
    //搜索
    searchChange(params, done) {
      this.query = Object.assign(params, this.query, this.page)
      this.eLogOnLoad()
      done();
    },
    // 初始化页面
    eLogOnLoad() {
      this.eLogLoading = true;
      getCaList(
        Object.assign(
          this.query, {
          pageSize: this.page.pageSize,
          pageNum: this.page.currentPage,
        }
        )
      )
        .then(res => {
          this.eLogDatas = res.data.returnObject.list;
          this.page.total = res.data.returnObject.total
          this.eLogLoading = false;
          this.selectionClear();
        }).catch(() => { });
    },
  },
};
</script>
<style lang="scss">
.eLog-page {
  .avue-crud__menu {
    min-height: 20px !important;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
}
</style>
