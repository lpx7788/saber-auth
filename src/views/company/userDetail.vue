<template>
  <basic-container class="company_user">
    <el-drawer title="编辑"
               :visible.sync="drawer"
               size="50%"
               :before-close="drawerClose"
               :close-on-press-escape="false"
               :append-to-body="true">
      <div class="drawer_info">
        <avue-form ref="drawerForm"
                   v-model="drawerForm"
                   :option="drawerFormOption"
                   @submit="submit"></avue-form>
      </div>
    </el-drawer>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <avue-skeleton :loading="loading"
                         :rows="1">
            <div class="flex-between">
              <div class="font14">
                <i class="iconfont iconicon_boss"></i>
                <b> {{ data.user && data.user.userName }}</b>
                <b>({{ data.user && data.user.userPhone }})</b>
              </div>
              <div>
                <el-button type="primary"
                           icon="el-icon-refresh"
                           @click="init">刷新</el-button>
                <el-button type="primary"
                           icon="el-icon-edit"
                           @click="drawer = true">编辑</el-button>
              </div>
            </div>
          </avue-skeleton>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-divider content-position="left">
            <el-link :underline="false"
                     type="primary">基本信息</el-link>
          </el-divider>
          <div v-if="!loading">
            <el-row>
              <el-col :span="8">
                <p>真实姓名：{{ data.user && data.user.userName }}</p>
              </el-col>
              <el-col :span="8">
                <p>身份证号码：{{ data.user && data.user.userIdentity }}</p>
              </el-col>
              <el-col :span="8">
                <p>手机号码：{{ data.user && data.user.userPhone }}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <p>
                  注册时间：{{
                    moment(data.user && data.user.createDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  }}
                </p>
              </el-col>
              <el-col :span="8">
                <p>推荐人手机：{{ data.user && data.user.refereePhone }}</p>
              </el-col>
              <el-col :span="8">
                <p>推荐人名称：{{ data.user && data.user.refereeUserName }}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <p>
                  是否平台买手：<el-tag :type="
                      data.user && data.user.isBuyer === '1'
                        ? 'success'
                        : 'danger'
                    ">{{
                      data.user && data.user.isBuyer === "1" ? "是" : "否"
                    }}</el-tag>
                </p>
              </el-col>
            </el-row>
          </div>
          <avue-skeleton :loading="loading"></avue-skeleton>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-divider content-position="left">
            <el-link :underline="false"
                     type="primary">认证公司信息</el-link>
          </el-divider>
          <avue-crud :option="option"
                     :table-loading="loading"
                     :data="data.userCompany"
                     @refresh-change="refreshChange">
            <template slot-scope="{ row }"
                      slot="roleName">
              <el-tag>{{ row.roleName }}</el-tag>
            </template>
            <template slot-scope="{ row }"
                      slot="businessDirectionName">
              <el-tag>{{ row.businessDirectionName }}</el-tag>
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
                    ? "正常"
                    : "已拒绝"
                }}
              </el-tag>
            </template>
          </avue-crud>
        </el-card>
      </el-col>
    </el-row>
  </basic-container>
</template>
<script>
import { queryCompanyUserDetail, queryCompanyUserEdit } from '@/api/company/user'

const moment = require('moment');

export default {
  data() {
    return {
      loading: false,
      data: {},
      drawer: false,
      drawerForm: {},
      drawerFormOption: {
        emptyBtn: false,
        labelWidth: '120',
        column: [{
          label: '真实姓名',
          prop: 'userName',
          rules: [{
            required: true,
            message: '请输入真实姓名',
            trigger: 'change',
          }],
        }, {
          label: '身份证号码',
          prop: 'userIdentity',
          rules: [{
            required: true,
            message: '请输入身份证号码',
            trigger: 'change',
          }],
        }, {
          label: '手机号',
          prop: 'userPhone',
          rules: [{
            required: true,
            message: '请输入手机号',
            trigger: 'change',
          }],
        }, {
          label: '推荐人名称',
          prop: 'refereeUserName',
          rules: [{
            required: true,
            message: '请输入推荐人名称',
            trigger: 'change',
          }],
        }, {
          label: '推荐人手机',
          prop: 'refereePhone',
          rules: [{
            required: true,
            message: '请输入推荐人手机',
            trigger: 'change',
          }],
        }, {
          label: '注册时间',
          prop: 'createDate',
          type: 'datetime',
          rules: [{
            required: true,
            message: '请选择注册时间',
            trigger: 'change',
          }],
        }, {
          label: '是否平台买手',
          prop: 'isBuyer',
          type: 'radio',
          dicData: [{
            label: '是',
            value: '1',
          }, {
            label: '否',
            value: '0',
          },
          ],
          rules: [{
            required: true,
            message: '请选择是否平台买手',
            trigger: 'change',
          }],
        }],
      },
      option: {
        addBtn: false,
        delBtn: false,
        editBtn: false,
        viewBtn: false,
        refreshBtn: false,
        tip: false,
        border: true,
        dialogModal: false,
        menu: false,
        column: [{
          label: '公司名称',
          prop: 'companyName',
          span: 24,
          row: true,
        },
        {
          label: '简称',
          prop: 'companyShortName',
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
          label: '业务方向',
          prop: 'businessDirectionName',
          span: 24,
          row: true,
          slot: true,
        },
        {
          label: '有效期',
          prop: 'validityDate',
          span: 24,
          row: true,
        },
        {
          label: '账户状态',
          prop: 'userCompanyStatusName',
          span: 24,
          row: true,
          slot: true,
        }, {
          label: '上次登录时间',
          prop: 'lastLoginDate',
          span: 24,
          row: true,
        }, {
          label: '提交认证时间',
          prop: 'createDate',
          span: 24,
          row: true,
        }],
      },
    }
  },
  watch: {
    $route() {
      this.init()
    },
  },
  methods: {
    moment,
    refreshChange() {
      this.init()
    },
    submit(form, done) {
      let buyer;
      if (form.isBuyer === '1') {
        buyer = true
      } else {
        buyer = false
      }
      queryCompanyUserEdit({
        userCode: form.userCode,
        userName: form.userName,
        userPhone: form.userPhone,
        userIdentity: form.userIdentity,
        createDate: moment(form.createDate).valueOf(),
        refereePhone: form.refereePhone,
        refereeUserName: form.refereeUserName,
        isBuyer: buyer,
      }).then(() => {
        this.drawer = false
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
        this.init()
        done()
      }).catch(() => { })
    },
    drawerClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          this.initDrawerForm(this.data)
          done();
        })
        .catch(() => { });
    },
    initDrawerForm(val) {
      this.drawerForm = val.user
    },
    init() {
      this.loading = true
      queryCompanyUserDetail({
        userCode: this.$route.query.code,
      }).then(res => {
        this.loading = false
        this.data = res.data.returnObject
        this.initDrawerForm(this.data)
      }).catch(() => { })
    },
  },
  created() {
    this.init()
  },
}
</script>
