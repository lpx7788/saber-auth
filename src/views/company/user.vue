<template>
  <basic-container class="company_user">
    <avue-crud :data="data"
               :option="option"
               :table-loading="loading"
               :page.sync="page"
               :span-method="spanMethod"
               @current-change="currentChange"
               @size-change="sizeChange"
               @on-load="queryUserList"
               @search-change="searchChange"
               @search-reset="searchReset"
               @refresh-change="refreshChange">
      <template slot-scope="{ row }"
                slot="roleName">
        <el-tag>{{ row.roleName }}</el-tag>
      </template>
      <template slot="userCompanyStatusNameSearch">
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
                  placeholder="请输入企业名称/简称/手机号/姓名搜索"
                  @keyup.enter.native="queryUserList"
                  @clear="queryUserList"></el-input>
      </template>
      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-download"
                   @click="exportData">导出</el-button>
      </template>
      <template slot-scope="{ row }"
                slot="userCompanyStatusName">
        <el-tag :type="
            row.userCompanyStatus === '1'
              ? 'warning'
              : row.userCompanyStatus === '2'
              ? 'success'
              : 'danger'
          ">
          {{
            row.userCompanyStatus === "1"
              ? "待审核"
              : row.userCompanyStatus === "2"
              ? "已通过"
              : "已拒绝"
          }}
        </el-tag>
      </template>
      <template slot-scope="{ row }"
                slot="menu">
        <el-button icon="el-icon-view"
                   size="small"
                   type="text"
                   @click="goToDetail(row)">查看</el-button>
        <el-button icon="el-icon-refresh"
                   size="small"
                   type="text"
                   @click="openReset(row)">重置密码</el-button>
        <el-popconfirm title="此操作将删除该用户, 是否继续?"
                       class="ml10"
                       @onConfirm="delHandle(row)">
          <el-button icon="el-icon-close"
                     size="small"
                     type="text"
                     slot="reference">删除</el-button>
        </el-popconfirm>
      </template>
    </avue-crud>
    <el-dialog title="重置密码"
               :visible.sync="dialogReset"
               :append-to-body="true"
               width="30%">
      <avue-form ref="dialogReset"
                 :option="dialogResetOption"
                 @submit="resetPassword"></avue-form>
    </el-dialog>
  </basic-container>
</template>
<script>
import { mapGetters } from 'vuex';
import { queryCompanyUserList } from '@/api/company/user';
import projectConfig from '@/api/projectConfig'
import { baseExportDataUrl } from '@/config/env'

export default {
  data() {
    return {
      dialogData: {},
      dialogReset: false,
      companyStatus: '2', // 企业状态
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
            label: '用户编号',
            prop: 'userId',
            span: 24,
            row: true,
            width: '100',
          },
          {
            label: '真实姓名',
            prop: 'userName',
            span: 24,
            row: true,
            width: '100',
          },
          {
            label: '手机号码',
            prop: 'userPhone',
            span: 24,
            row: true,
          },
          {
            label: '所属公司',
            prop: 'companyName',
            span: 24,
            row: true,
          },
          {
            label: '用户身份',
            prop: 'roleName',
            span: 24,
            row: true,
            slot: true,
          },
          {
            label: '有效期',
            prop: 'validityDate',
            span: 24,
            row: true,
          }, {
            label: '企业状态',
            prop: 'userCompanyStatusName',
            span: 24,
            row: true,
            slot: true,
            search: true,
            searchSpan: 4,
            searchslot: true,
          }, {
            label: '上次登录时间',
            prop: 'lastLoginDate',
            span: 24,
            row: true,
            width: '200',
          }],
      },
      dialogResetOption: {
        emptyBtn: false,
        column: [
          {
            label: '原密码',
            type: 'input',
            prop: 'oldPw',
            span: 24,
            rules: [{
              required: true,
              message: '请输入原密码',
              trigger: 'change',
            }],
          },
          {
            label: '新密码',
            type: 'input',
            prop: 'newPw',
            span: 24,
            rules: [{
              required: true,
              message: '请输入新密码',
              trigger: 'change',
            }],
          },
        ],
      },
      data: [],
      exportDataUrl: '',
      spanArr: [],
    };
  },
  computed: {
    ...mapGetters(['permission']),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.notice_add, false),
        viewBtn: this.vaildData(this.permission.notice_view, false),
        delBtn: this.vaildData(this.permission.notice_delete, false),
        editBtn: this.vaildData(this.permission.notice_edit, false),
      };
    },
    ids() {
      const ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.id);
      });
      return ids.join(',');
    },
  },
  methods: {
    refreshChange() {
      this.page.currentPage = 1
      this.queryUserList()
    },
    searchReset() {
      this.companyStatus = ''
      this.searchText = ''
      this.queryUserList()
    },
    searchChange(params, done) {
      this.queryUserList()
      done()
    },
    countSpanArr(data) {
      let contactDot = 0;
      this.spanArr = []
      data.forEach((item, index) => {
        const itemData = item
        itemData.index = index;
        // if (index === 0) {
        //   this.spanArr.push(1);
        // } else {
        //   if (item.userId === data[index - 1].userId) {
        //     this.spanArr[contactDot] += 1;
        //     this.spanArr.push(0);
        //   } else {
        //     this.spanArr.push(1);
        //     contactDot = index;
        //   }
        // }
        if (index === 0) {
          this.spanArr.push(1);
        } else if (index !== 0 && item.userId === data[index - 1].userId) {
          this.spanArr[contactDot] += 1;
          this.spanArr.push(0);
        } else {
          this.spanArr.push(1);
          contactDot = index;
        }
      })
    },
    // 同一个用户合并一行
    spanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 9) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        }
      }
    },
    exportData() {
      this.$message.success('数据导出中，请耐心等待')
      // window.location.href = this.exportDataUrl
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.currentPage = 1
      this.page.pageSize = pageSize;
      this.queryUserList();
    },
    queryUserList() {
      this.exportDataUrl = `${baseExportDataUrl}${projectConfig.URL_company_userList_export}?userCompanyStatus=${this.companyStatus}`
      this.loading = true;
      queryCompanyUserList({
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
        userCompanyStatus: this.companyStatus,
        queryKey: this.searchText,
      })
        .then(res => {
          const returnData = res.data.returnObject;
          this.page.total = returnData.total;
          this.data = returnData.list;
          this.countSpanArr(this.data)
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    changeCompanyStatus() {
      const pageData = {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      }
      this.page = pageData
      this.queryUserList();
    },
    // 查看详情
    goToDetail(row) {
      this.$router.push({ path: `/company/userDetail?code=${row.userCode}` });
    },
    // 删除用户
    delHandle() {
    },
    openReset(row) {
      this.dialogReset = true
      this.dialogData = row
      this.$nextTick(() => {
        this.$refs.dialogReset.resetForm()
      })
    },
    resetPassword(form, done) {
      this.dialogReset = false
      done()
    },
  },
};
</script>
