<template>
  <basic-container>
    <div class="account-page">
      <avue-crud :option="accountOption"
                 :table-loading="loading"
                 :data="accountList"
                 :page.sync="page"
                 v-model="form"
                 ref="crud"
                 @current-change="currentChange"
                 @size-change="sizeChange"
                 @on-load="onLoad"
                 @search-change="searchChange"
                 @search-reset="searchReset"
                 @refresh-change="refreshChange">
        <template slot="approvalStatusSearch">
          <avue-select v-model="query.approvalStatus"
                       @change="handChangeApprovalStatus"
                       placeholder="请选择"
                       type="tree"
                       :dic="approvalStatusDatas"></avue-select>
        </template>
        <template slot="connectionStatusSearch">
          <avue-select class="select-input"
                       v-model="query.connectionStatus"
                       @change="handChangeConnectionStatus"
                       placeholder="请选择"
                       type="tree"
                       :dic="connectionStatusDatas"></avue-select>
        </template>
        <template slot="operatingStatusSearch">
          <avue-select class="buyer"
                       v-model="query.operatingStatus"
                       @change="getOrderStatus"
                       placeholder="请选择"
                       type="tree"
                       :dic="operatingStatusDatas"></avue-select>
        </template>

        <template slot="search">
          <el-input class="searchInput"
                    v-model="query.queryKey"
                    clearable
                    placeholder="请输入公司名字/品种名称"
                    @keyup.enter.native="onLoad"
                    @clear="onLoad"></el-input>
        </template>
        <template slot-scope="{ row }"
                  slot="approvalStatus">
          <el-tag :type="row.approvalStatus === 0 ? 'warning' : 'success'">{{
            row.approvalStatus === 0 ? "未审核" : "已审核"
          }}</el-tag>
        </template>
        <template slot-scope="{ row }"
                  slot="connectionStatus">
          <el-tag :type="row.connectionStatus === 0 ? 'danger' : 'success'">{{
            row.connectionStatus === 0 ? "未连接" : "已连接"
          }}</el-tag>
        </template>
        <template slot-scope="{ row }"
                  slot="operatingStatus">
          <el-tag :type="row.operatingStatus === 0 ? 'danger' : 'success'">{{
            row.operatingStatus === 0 ? "已停用" : "使用中"
          }}</el-tag>
        </template>
        <template slot-scope="{ row }"
                  slot="menu">
          <el-button type="text"
                     icon="el-icon-check"
                     size="small"
                     class="btnStyle"
                     v-if="row.operatingStatus === '0'"
                     @click="
              editAccountStatus(
                row.companyAutoHedgeId,
                '3',
                row.brokerName,
                row.account
              )
            ">恢复使用</el-button>
          <el-button type="text"
                     icon="el-icon-close"
                     size="small"
                     class="btnStyle"
                     v-if="row.operatingStatus === '1'"
                     @click="
              editAccountStatus(
                row.companyAutoHedgeId,
                '2',
                row.brokerName,
                row.account
              )
            ">停止使用</el-button>
          <el-button type="text"
                     icon="el-icon-edit"
                     size="small"
                     class="btnStyle"
                     v-if="row.approvalStatus === '1'"
                     @click="openEditDialog($index, row)">修改密码</el-button>
        </template>
      </avue-crud>
      <!-- 修改期货账户密码弹窗-->
      <el-dialog title="修改套保账户密码"
                 :append-to-body="true"
                 :visible.sync="editPassDialogVisible"
                 width="40%"
                 center>
        <el-form :model="editPassForm"
                 :rules="editPassFormRules"
                 ref="editPassForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="企业简称：">
            <span>{{ editPassForm.companyShortName }}</span>
          </el-form-item>
          <el-form-item label="期货公司：">
            <span>{{ editPassForm.companyName }}</span>
          </el-form-item>
          <el-form-item label="交易账户：">
            <span>{{ editPassForm.account }}</span>
          </el-form-item>
          <el-form-item label="交易密码："
                        prop="password">
            <el-input type="password"
                      size="mini"
                      v-model="editPassForm.password"></el-input>
          </el-form-item>
          <el-form-item label="交易席位：">
            <template>
              <el-radio v-model="editPassForm.seat"
                        disabled
                        label="1">主席</el-radio>
              <el-radio v-model="editPassForm.seat"
                        disabled
                        label="2">次席</el-radio>
            </template>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="editPassDialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="editPassword"
                     v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </basic-container>
</template>

<script>
import {
  getHedgeAccountList,
  getAccountEditStatus,
  accountEditPassword,
} from '@/api/hedge/account';
import md5 from 'js-md5';

export default {
  data() {
    return {
      loading: true,
      editPassDialogVisible: false, // 编辑弹窗
      editPassForm: {
        companyAutoHedgeId: '',
        companyShortName: '',
        companyName: '',
        account: '',
        password: '',
      }, // 编辑表单
      editPassFormRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 255, message: '255个字符以内', trigger: 'blur' },
        ],
      }, // 表单规则
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      // 页面页面相关
      query: {
        queryKey: '', // 查询关键字
        status: '',
        connStatus: '',
        approvalStatus: '',
        connectionStatus: '',
        operatingStatus: '',
      }, // 请求参数
      approvalStatusDatas: [
        {
          label: '全部',
          value: '',
        },
        {
          label: '未审核',
          value: '0',
        },
        {
          label: '已审核',
          value: '1',
        },
      ], // 审核状态数据
      connectionStatusDatas: [
        {
          label: '全部',
          value: '',
        },
        {
          label: '未连接',
          value: '0',
        },
        {
          label: '已连接',
          value: '1',
        },
      ], // 连接情况
      operatingStatusDatas: [
        {
          label: '全部',
          value: '',
        },
        {
          label: '已停用',
          value: '0',
        },
        {
          label: '使用中',
          value: '1',
        },
      ], // 使用情况
      accountOption: {
        index: true,
        height: 'auto',
        calcHeight: 30,
        tip: false,
        border: true,
        viewBtn: false,
        addBtn: false,
        selection: false,
        editBtn: false,
        delBtn: false,
        selectClearBtn: false,
        menuWidth: 200,
        labelWidth: 100,
        dialogWidth: 880,
        dialogClickModal: false,
        searchMenuSpan: 4,
        column: [
          {
            label: '企业简称',
            prop: 'companyShortName',
          },
          {
            label: '期货公司',
            type: 'select',
            prop: 'brokerName',
          },
          {
            label: '期货账户',
            prop: 'account',
          },
          {
            label: '账号审核状态',
            prop: 'approvalStatus',
            slot: true,
            search: true,
            searchslot: true,
            searchSpan: 4,
            searchLabelWidth: 100,
          },
          {
            label: '连接情况',
            prop: 'connectionStatus',
            slot: true,
            search: true,
            searchslot: true,
            searchSpan: 4,
          },
          {
            label: '账号使用状态',
            prop: 'operatingStatus',
            slot: true,
            search: true,
            searchslot: true,
            searchSpan: 4,
            searchLabelWidth: 100,
          },
          {
            label: '创建人',
            prop: 'createUserName',
          },
          {
            label: '创建时间',
            prop: 'createDate',
            width: '180',
          },
          {
            label: '修改时间',
            prop: 'lastUpdateDate',
            width: '180',
          },
        ],
      },
      accountList: [], // 账户列表
    };
  },
  created() {
  },
  methods: {
    refreshChange() {
      this.page.currentPage = 1
      this.onLoad()
    },
    searchChange(params, done) {
      this.onLoad()
      done()
    },
    searchReset() {
      this.currentTime = []
      this.query = {
        queryKey: '', // 查询关键字
        status: '',
        connStatus: '',
        approvalStatus: '',
        connectionStatus: '',
        operatingStatus: '',
      }
      this.onLoad()
    },
    // 关键字搜索：
    onSearch() {
      this.page.currentPage = 1;
      this.onLoad();
    },
    // 审核状态：
    handChangeApprovalStatus() {
      this.page.currentPage = 1;
      this.onLoad();
    },
    // 连接情况：
    handChangeConnectionStatus() {
      this.page.currentPage = 1;
      this.onLoad();
    },
    // 使用情况：
    handChangeOperatingStatus() {
      this.page.currentPage = 1;
      this.onLoad();
    },
    // 修改期货账户密码
    editPassword() {
      this.$refs.editPassForm.validate(valid => {
        if (valid) {
          const query = {
            companyAutoHedgeId: this.editPassForm.companyAutoHedgeId,
            password: md5(this.editPassForm.password),
            seat: this.seat,
          };
          accountEditPassword(query).then(() => {
            this.onLoad(this.page);
            this.$message({
              type: 'success',
              message: '修改密码成功',
            });
            this.editPassDialogVisible = false
          }).catch(() => {
            this.addDialogVisible = false;
          });
        }
      });
    },
    // 打开修改密码窗口
    openEditDialog(index, row) {
      const rowData = row
      this.editPassDialogVisible = true;
      rowData.seat = String(row.seat);
      this.editPassForm = rowData;
      this.editPassForm.password = '';
    },
    // 修改账号状态
    editAccountStatus(id, status, brokerName, account) {
      const statusData = status
      // 2停止使用 3恢复使用
      const tip = statusData === '2'
        ? `是否确认停止使用${brokerName}${account}账户？停止后，与该账户相关的套保规则也将停止。`
        : `是否确认恢复使用${brokerName}${account}账户？恢复后，与该账户相关的套保规则也将恢复。`;
      const typeStatus = statusData === '2' ? 'warning' : 'success';
      const query = {
        companyAutoHedgeId: id,
        status: statusData,
      };
      this.$confirm(tip, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: typeStatus,
      })
        .then(() => {
          getAccountEditStatus(query)
            .then(() => {
              this.onLoad(this.page);
              this.$message({
                type: 'success',
                message: '操作成功!',
              });
            });
        })
        .catch(() => {
          this.addDialogVisible = false;
        });
    },
    // 获取当前页面
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    // 每页数据量
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.onLoad();
    },
    // 初始化页面
    onLoad() {
      this.loading = true;
      const query = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
        connectionStatus: this.query.connectionStatus,
        operatingStatus: this.query.operatingStatus,
        queryKey: this.query.queryKey,
        approvalStatus: this.query.approvalStatus,
      };
      getHedgeAccountList(query).then(
        res => {
          const resData = res.data.returnObject;
          this.page.total = resData.total;
          this.accountList = resData.list;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      ).catch(() => { });
    },
  },
};
</script>

<style  lang="scss">
.account-page {
  .btnStyle {
    border: 0;
    background-color: transparent !important;
  }
  .avue-crud__menu {
    min-height: 20px !important;
  }
}
</style>
