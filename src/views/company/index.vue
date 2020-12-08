<template>
  <basic-container class="company_list">
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
                  placeholder="请输入企业名称/简称搜索"
                  @keyup.enter.native="queryJoinList"
                  @clear="queryJoinList"></el-input>
      </template>
      <template slot="menuLeft">
        <el-button icon="el-icon-download"
                   type="primary"
                   @click="exportData">导出</el-button>
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
                slot="companyShortName">
        <span>{{ row.companyShortName ? row.companyShortName : "-" }}</span>
      </template>
      <template slot-scope="{ row }"
                slot="companyName">
        <span>{{ row.companyName ? row.companyName : "-" }}</span>
      </template>
      <template slot-scope="{ row }"
                slot="superUserPhone">
        <span>{{ row.superUserPhone ? row.superUserPhone : "-" }}</span>
      </template>
      <template slot-scope="{ row }"
                slot="userName">
        <span>{{ row.userName ? row.userName : "-" }}</span>
      </template>
      <template slot-scope="{ row }"
                slot="direction">
        <span>{{ row.direction ? row.direction : "-" }}</span>
      </template>
      <template slot-scope="{ row }"
                slot="verifyUserName">
        <span>{{ row.verifyUserName ? row.verifyUserName : "-" }}</span>
      </template>
      <template slot-scope="{ row }"
                slot="reviewTime">
        <span>{{ row.reviewTime ? row.reviewTime : "-" }}</span>
      </template>
      <template slot-scope="{ row }"
                slot="createDate">
        <span>{{ row.createDate ? row.createDate : "-" }}</span>
      </template>

      <template slot-scope="{ row }"
                slot="menu">
        <el-button icon="el-icon-view"
                   size="small"
                   type="text"
                   @click="goToDetail(row)">查看</el-button>
        <!-- <el-button icon="el-icon-check"
        size="small" type="text"
        @click="examine(row,1)"
        v-if="row.companyStatus==='1'">通过</el-button> -->
        <!-- <el-button icon="el-icon-close"
        size="small" type="text"
        @click="examine(row,2)"
        v-if="row.companyStatus==='1'">拒绝</el-button> -->
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
                     icon="el-icon-check"
                     @click="dialogExamineSubmit"
                     :loading="dialogExamineLoading">提 交</el-button>
        </template>
      </avue-form>
    </el-dialog>
    <el-drawer title="添加企业"
               :visible.sync="drawer"
               size="50%"
               :before-close="drawerClose"
               :close-on-press-escape="false"
               :append-to-body="true">
      <avue-form ref="drawerForm"
                 v-model="drawerForm"
                 :option="drawerFormOption">
        <template slot="mobilePhone">
          <el-select v-model="drawerForm.mobilePhone">
            <el-option v-for="(item, index) in registerPhones"
                       :key="index"
                       :label="item.userPhone"
                       :value="item.userPhone"></el-option>
          </el-select>
        </template>
        <template slot="imageFile">
          <upload ref="imageFile"
                  :change="changeImage"
                  :height="200"
                  :width="200" />
        </template>
        <template slot="authorizationFile">
          <upload ref="authorizationFile"
                  :change="changeAuthorization"
                  :height="200"
                  :width="200" />
        </template>
        <template slot="menuForm">
          <el-button type="primary"
                     icon="el-icon-check"
                     @click="drawerSubmit"
                     :loading="drawerLoading">提 交</el-button>
        </template>
      </avue-form>
    </el-drawer>
  </basic-container>
</template>
<script>
import { queryJoinList, joinExamine } from '@/api/company/join';
import { queryAllRegisterPhone, addCompany } from '@/api/company/index'
import projectConfig from '@/api/projectConfig'
import { baseExportDataUrl } from '@/config/env'

export default {
  data() {
    return {
      registerPhones: [],
      drawerLoading: false,
      drawerFormOption: {
        emptyBtn: false,
        submitBtn: false,
        column: [
          {
            label: '公司名称',
            type: 'input',
            prop: 'companyName',
            rules: [{
              required: true,
              message: '请输入公司名称',
              trigger: 'change',
            }],
            span: 12,
          },
          {
            label: '公司简称',
            type: 'input',
            prop: 'companyShortName',
            rules: [{
              required: true,
              message: '请输入公司简称',
              trigger: 'change',
            }],
            span: 12,
          }, {
            label: '手机号',
            prop: 'mobilePhone',
            formslot: true,
            span: 12,
          }, {
            label: '推荐人',
            type: 'input',
            prop: 'referee',
            span: 12,
          }, {
            label: '姓名',
            type: 'input',
            prop: 'userName',
            rules: [{
              required: true,
              message: '请输入姓名',
              trigger: 'change',
            }],
            span: 12,
          }, {
            label: '身份证号',
            type: 'input',
            prop: 'userIdentity',
            rules: [{
              required: true,
              message: '请输入身份证号',
              trigger: 'change',
            }],
            span: 12,
          }, {
            label: '企业身份',
            type: 'select',
            prop: 'companyIdentity',
            clearable: false,
            dicData: [{
              label: '买家',
              value: '1',
            }, {
              label: '卖家',
              value: '2',
            }, {
              label: '买家和卖家',
              value: '3',
            }],
            span: 12,
          }, {
            label: '统一社会信用代码',
            type: 'input',
            prop: 'creditNum',
            rules: [{
              required: true,
              message: '请输入统一社会信用代码',
              trigger: 'change',
            }],
            span: 12,
          }, {
            label: '备注',
            type: 'textarea',
            prop: 'remark',
            span: 24,
          }, {
            label: '营业执照',
            prop: 'imageFile',
            formslot: true,
            rules: [{
              required: true,
              message: '请上传营业执照',
              trigger: 'change',
            }],
            span: 12,
          }, {
            label: '认证授权书',
            prop: 'authorizationFile',
            formslot: true,
            rules: [{
              required: true,
              message: '请上传认证授权书',
              trigger: 'change',
            }],
            span: 12,
          }],
      },
      drawerForm: {},
      drawer: false,
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
            label: '企业全称',
            prop: 'companyName',
            span: 24,
            row: true,
            slot: true,
            minWidth: 120,
          },
          {
            label: '企业简称',
            prop: 'companyShortName',
            span: 24,
            row: true,
            slot: true,
          },
          {
            label: '业务方向',
            prop: 'direction',
            span: 24,
            row: true,
            slot: true,
          },
          {
            label: '入驻申请人',
            prop: 'userName',
            span: 24,
            row: true,
            slot: true,
          },
          {
            label: '联系方式',
            prop: 'superUserPhone',
            span: 24,
            row: true,
            slot: true,
          },
          {
            label: '入驻申请时间',
            prop: '',
            span: 24,
            row: true,
          },
          {
            label: '审核状态',
            prop: 'companyStatusName',
            span: 24,
            slot: true,
            search: true,
            searchSpan: 4,
            searchslot: true,
          },
          {
            label: '审核人',
            prop: 'verifyUserName',
            span: 24,
            row: true,
            slot: true,
          },
          {
            label: '审核时间',
            prop: '',
            span: 24,
            row: true,
            slot: true,
          },
        ],
      },
      data: [],
      dialogExamineData: {},
      dialogExamineType: 1,
      dialogExamine: false,
      dialogExamineOption: {
        emptyBtn: false,
        submitBtn: false,
        column: [],
      },
      exportDataUrl: '',
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
    changeImage(val) {
      this.drawerForm.imageFile = val
    },
    changeAuthorization(val) {
      this.drawerForm.authorizationFile = val
    },
    drawerSubmit() {
      this.drawerLoading = true
      const formData = new FormData()
      formData.append('userName', this.drawerForm.userName)
      formData.append('userIdentity', this.drawerForm.userIdentity)
      formData.append('userPhone', this.drawerForm.mobilePhone)
      formData.append('companyName', this.drawerForm.companyName)
      formData.append('companyShortName', this.drawerForm.companyShortName)
      formData.append('referee', this.drawerForm.referee)
      formData.append('remark', this.drawerForm.remark)
      formData.append('companyIdentity', this.drawerForm.companyIdentity)
      formData.append('creditNum', this.drawerForm.creditNum)
      formData.append('imageFile', this.drawerForm.imageFile)
      formData.append('authorizationFile', this.drawerForm.authorizationFile)
      addCompany(formData).then(() => {
        this.drawerLoading = false
        this.drawer = false
      }).catch(() => { })
    },
    queryAllUserPhone() {
      queryAllRegisterPhone().then(res => {
        this.registerPhones = res.data.returnObject
      }).catch(() => { })
    },
    drawerClose(done) {
      done()
    },
    addCompany() {
      this.drawer = true
      this.drawerForm.companyIdentity = '1'
    },
    exportData() {
      this.$message.success('数据导出中，请耐心等候')
      window.location.href = this.exportDataUrl
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.currentPage = 1
      this.page.pageSize = pageSize;
      this.queryJoinList();
    },
    queryJoinList() {
      this.queryAllUserPhone()
      this.exportDataUrl =
        `${baseExportDataUrl}${projectConfig.URL_company_list_export}
      ?companyStatus=${this.companyStatus}`
      this.loading = true;
      queryJoinList({
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
        companyStatus: this.companyStatus,
        queryKey: this.searchText,
      })
        .then(res => {
          const returnData = res.data.returnObject;
          this.page.total = returnData.total;
          this.data = returnData.list;
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
      this.page = pageData;
      this.queryJoinList();
    },
    // 查看详情
    goToDetail(row) {
      this.$router.push({ path: `/company/detail?code=${row.companyCode}` });
    },
    // 入驻审核
    // examine(row,type){
    //   this.dialogExamineData = row
    //   this.dialogExamineType = type
    //   if(type === 1){
    //     this.dialogExamineOption.column = [{
    //       label: "企业简称",
    //       type: "input",
    //       prop: "shortName",
    //       placeholder: "请输入 企业简称，限8个字符内",
    //       span: 24,
    //       rules: [{
    //           required: true,
    //           message: "请输入企业简称",
    //           trigger: "change"
    //       }]
    //     },{
    //       label: "推荐人",
    //       type: "input",
    //       prop: "introducer",
    //       span: 24,
    //     },{
    //       label: "备注",
    //       type: "input",
    //       prop: "remark",
    //       span: 24,
    //       rules: [{
    //         required: false
    //       }]
    //     },]
    //   }else{
    //     this.dialogExamineOption.column = [{
    //       label: "拒绝理由",
    //       type: "input",
    //       prop: "remark",
    //       span: 24,
    //       rules: [{
    //           required: true,
    //           message: "请输入拒绝理由",
    //           trigger: "change"
    //       }]
    //     }]
    //   }
    //   this.dialogExamine = true
    // },
    dialogExamineSubmit() {
      this.$refs.dialogExamine.validate(valid => {
        if (valid) {
          const params = this.dialogExamineForm
          params.companyCode = this.dialogExamineData.companyCode
          if (this.dialogExamineType === 1) {
            params.isPass = 'Y'
            params.userCode = 'e9b68b96ef3648adb99c1a8a9a3b12c3'
          } else {
            params.isPass = 'N'
          }
          joinExamine(params).then(() => {
            this.dialogExamineLoading = false
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
          }).catch(() => {
            this.dialogExamineLoading = false
          })
        }
      })
    },
  },
};
</script>
