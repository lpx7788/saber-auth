<template>
  <basic-container class="company_join">
    <avue-crud :data="data"
               :option="option"
               :table-loading="loading"
               :page.sync="page"
               @current-change="currentChange"
               @size-change="sizeChange"
               @on-load="queryJoinList"
               @search-change="searchChange"
               @search-reset="searchReset"
               @refresh-change="refreshChange">
      <template slot="companyStatusNameSearch">
        <el-select v-model="companyStatus"
                   @change="changeCompanyStatus">
          <el-option label="全部"
                     value=""></el-option>
          <el-option label="待审核"
                     value="1"></el-option>
          <el-option label="已通过"
                     value="2"></el-option>
          <el-option label="已拒绝"
                     value="3"></el-option>
        </el-select>
      </template>
      <template slot="search">
        <el-input class="searchInput"
                  v-model="searchText"
                  clearable
                  placeholder="请输入企业名称搜索"
                  @keyup.enter.native="queryJoinList"
                  @clear="queryJoinList"></el-input>
      </template>
      <template slot-scope="{ row }"
                slot="companyStatusName">
        <el-tag :type="
            row.companyStatus === '1'
              ? 'warning'
              : row.companyStatus === '2'
              ? 'success'
              : 'danger'
          ">
          {{
            row.companyStatus === "1"
              ? "待审核"
              : row.companyStatus === "2"
              ? "已通过"
              : "已拒绝"
          }}
        </el-tag>
      </template>
      <template slot-scope="{ row }"
                slot="companyIdentityName">
        <el-tag>{{ row.companyIdentityName }}</el-tag>
      </template>
      <template slot-scope="{ row }"
                slot="menu">
        <el-button icon="el-icon-view"
                   size="small"
                   type="text"
                   @click="goToDetail(row)">查看</el-button>
        <el-button icon="el-icon-check"
                   size="small"
                   type="text"
                   @click="examine(row, 1)"
                   v-if="row.companyStatus === '1'">通过</el-button>
        <el-button icon="el-icon-close"
                   size="small"
                   type="text"
                   @click="examine(row, 2)"
                   v-if="row.companyStatus === '1'">拒绝</el-button>
      </template>
    </avue-crud>
    <el-dialog :title="dialogExamineType === 1 ? '审核通过' : '审核拒绝'"
               center
               :visible.sync="dialogExamine"
               width="30%"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :append-to-body="true"
               @close="dialogExamineClose">
      <avue-form ref="dialogExamine"
                 v-model="dialogExamineForm"
                 :option="dialogExamineOption"
                 :card="true">
        <template slot="menuForm">
          <el-button type="primary"
                     @click="dialogExamineSubmit"
                     :loading="dialogExamineLoading">提 交</el-button>
        </template>
      </avue-form>
    </el-dialog>
  </basic-container>
</template>
<script>
import { queryJoinList, joinExamine } from '@/api/company/join'

export default {
  data() {
    return {
      companyStatus: '1', // 企业状态
      searchText: null, // 搜索字段
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      selectionList: [],
      option: {
        index: true,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        viewBtn: false,
        height: 'auto',
        calcHeight: 30,
        dialogWidth: 900,
        tip: false,
        border: true,
        dialogModal: false,
        searchMenuSpan: 4,
        column: [
          {
            label: '编号',
            prop: 'id',
            span: 24,
            row: true,
            width: '100',
          },
          {
            label: '公司',
            prop: 'companyName',
            span: 24,
            row: true,
          },
          {
            label: '企业身份',
            prop: 'companyIdentityName',
            span: 24,
            row: true,
            slot: true,
          }, {
            label: '提交人',
            prop: 'userName',
            span: 24,
            row: true,
          },
          {
            label: '申请时间',
            prop: 'createDate',
            span: 24,
            row: true,
          },
          {
            label: '企业状态',
            prop: 'companyStatusName',
            span: 24,
            row: true,
            slot: true,
            search: true,
            searchSpan: 4,
            searchslot: true,
          },
        ],
      },
      data: [],
      dialogExamine: false, // 操作弹窗
      dialogExamineType: 1, // 操作弹窗类型
      dialogExamineOption: {
        emptyBtn: false,
        submitBtn: false,
        enter: false,
        column: [],
      },
      dialogExamineForm: {},
      dialogExamineData: {},
      dialogExamineLoading: false,
    };
  },
  computed: {
  },
  methods: {
    refreshChange() {
      this.page.currentPage = 1
      this.queryJoinList()
    },
    searchReset() {
      this.companyStatus = ''
      this.searchText = ''
      this.queryJoinList()
    },
    searchChange(params, done) {
      this.queryJoinList()
      done()
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage
    },
    sizeChange(pageSize) {
      this.page.currentPage = 1
      this.page.pageSize = pageSize;
      this.queryJoinList()
    },
    queryJoinList() {
      this.loading = true
      queryJoinList({
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
        companyStatus: this.companyStatus,
        queryKey: this.searchText,
      }).then(res => {
        const returnData = res.data.returnObject;
        this.page.total = returnData.total;
        this.data = returnData.list;
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    changeCompanyStatus() {
      this.queryJoinList()
    },
    // 入驻审核
    examine(row, type) {
      this.dialogExamineData = row
      this.dialogExamineType = type
      this.dialogExamineOption.column = []
      if (type === 1) {
        this.dialogExamineOption.column = [{
          label: '企业简称',
          type: 'input',
          prop: 'shortName',
          placeholder: '请输入 企业简称，限8个字符内',
          span: 24,
          rules: [{
            required: true,
            message: '请输入企业简称',
            trigger: 'change',
          }],
        }, {
          label: '推荐人',
          type: 'input',
          prop: 'introducer',
          span: 24,
        }, {
          label: '备注',
          type: 'input',
          prop: 'remark',
          span: 24,
          rules: [{
            required: false,
          }],
        }]
      } else {
        this.dialogExamineOption.column = [{
          label: '拒绝理由',
          type: 'input',
          prop: 'remark',
          span: 24,
          rules: [{
            required: true,
            message: '请输入拒绝理由',
            trigger: 'change',
          }],
        }]
      }
      this.dialogExamine = true
    },
    // 查看详情
    goToDetail(row) {
      this.$router.push({ path: `/company/detail?code=${row.companyCode}` });
    },
    dialogExamineSubmit() { // 提交表单操作
      this.$refs.dialogExamine.validate(valid => {
        if (valid) {
          this.dialogExamineLoading = true
          const params = this.dialogExamineForm
          params.companyCode = this.dialogExamineData.companyCode
          if (this.dialogExamineType === 1) {
            params.isPass = 'Y'
            params.userCode = 'a19a2d31559947f582d6505fb2c62cb4'
          } else {
            params.isPass = 'N'
          }
          joinExamine(params).then(() => {
            this.dialogExamine = false
            this.dialogExamineLoading = false
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            this.queryJoinList()
          }).catch(() => {
            this.dialogExamine = false
            this.dialogExamineLoading = false
          })
        }
      })
    },
    dialogExamineClose() {
      this.$refs.dialogExamine.clearValidate()
    },
  },
};
</script>
