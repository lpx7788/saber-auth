<template>
  <div class="info">
    <!-- 右侧编辑企业信息弹窗 -->
    <el-drawer title="编辑"
               :visible.sync="drawer"
               size="50%"
               :before-close="drawerClose"
               :close-on-press-escape="false"
               :append-to-body="true"
               @open="drawerOpen">
      <div class="drawer_info">
        <avue-form ref="drawerForm"
                   v-model="drawerForm"
                   :option="drawerFormOption">
          <template slot="tradingCategoryCode">
            <category v-model="tradingCategoryCode"
                      ref="category"
                      :isMultiple="true"
                      :isClearable="true"
                      @input="changeCategory"
                      :disabled="data.companyStatus === '3'"
                      :isCollapseTags="true" />
          </template>
          <template slot="carefullyChosenSeller">
            <el-switch v-model="value"
                       :disabled="data.companyStatus === '3'">
            </el-switch>
          </template>
          <template slot="companyIdentity">
            <el-select v-model="data.companyIdentity"
                       :disabled="data.companyStatus === '3'"
                       placeholder="请选择">
              <el-option v-for="item in companyIdentityDicData"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template slot="companyName">
            <el-input :disabled="
                data.companyStatus === '2' || data.companyStatus === '3'
              "
                      v-model="drawerForm.companyName" />
          </template>
          <template slot="userName">
            <el-input disabled
                      v-model="drawerForm.userName" />
          </template>
          <template slot="introducer">
            <el-input :disabled="data.companyStatus === '3'"
                      v-model="drawerForm.introducer" />
          </template>
          <template slot="companyShortName">
            <el-input :disabled="
                data.companyStatus === '2' || data.companyStatus === '3'
              "
                      v-model="drawerForm.companyShortName" />
          </template>
          <template slot="creditNum">
            <el-input :disabled="
                data.companyStatus === '2' || data.companyStatus === '3'
              "
                      v-model="drawerForm.creditNum" />
          </template>
          <template slot="remark">
            <el-input type="textarea"
                      :disabled="data.companyStatus === '3'"
                      v-model="drawerForm.remark" />
          </template>
          <template slot="imageFile">
            <upload ref="imageFile"
                    :disabled="
                data.companyStatus === '2' || data.companyStatus === '3'
              "
                    :change="changeImage"
                    :deleted="delImageFile"
                    :height="200"
                    :width="200" />
          </template>
          <template slot="authorizationFile">
            <upload ref="authorizationFile"
                    :disabled="
                data.companyStatus === '2' || data.companyStatus === '3'
              "
                    :change="changeAuthorization"
                    :deleted="delAuthorizationFile"
                    :height="200"
                    :width="200" />
          </template>
          <template slot="menuForm">
            <el-button type="primary"
                       icon="el-icon-check"
                       v-if="data.companyStatus != '3'"
                       @click="drawerSubmit(drawerForm)">提 交</el-button>
          </template>
        </avue-form>
      </div>
    </el-drawer>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="flex-between"
               v-if="!loading">
            <div>
              <i class="iconfont icon-web-icon-"></i>
              <b class="pr10 font14">
                {{ data.companyName }}</b>
              <el-tag v-if="data.carefullyChosenSeller"
                      type="light">精选卖家</el-tag>
              <el-tag :type="
                  data.companyStatus === '1'
                    ? 'warning'
                    : data.companyStatus === '2'
                    ? 'success'
                    : data.companyStatus === '3'
                    ? 'danger'
                    : 'info'
                ">
                {{
                  data.companyStatus === "1"
                    ? "待审核"
                    : data.companyStatus === "2"
                    ? "已通过"
                    : data.companyStatus === "3"
                    ? "已拒绝"
                    : "未知"
                }}
              </el-tag>
            </div>
            <div>
              <div class="mr20 inline"
                   v-if="data.companyStatus === '2'">
                <el-select v-model="currentIdentity"
                           placeholder="请选择">
                  <el-option v-for="item in identityOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <el-button size="small"
                         type="primary"
                         icon="el-icon-refresh"
                         @click="getDetail">刷新</el-button>
              <el-button size="small"
                         type="primary"
                         icon="el-icon-view"
                         @click="drawer = true"
                         v-if="data.companyStatus === '3'">查看</el-button>
              <el-button size="small"
                         type="primary"
                         icon="el-icon-edit"
                         @click="drawer = true"
                         v-if="data.companyStatus === '2' || data.companyStatus === '1'">
                编辑</el-button>
              <el-button icon="el-icon-check"
                         size="small"
                         type="success"
                         @click="examine(1)"
                         v-if="data.companyStatus === '1'">通过</el-button>
              <el-button icon="el-icon-close"
                         size="small"
                         type="danger"
                         @click="examine(2)"
                         v-if="data.companyStatus === '1'">拒绝</el-button>
            </div>
          </div>
          <avue-skeleton :loading="loading"
                         :rows="1"></avue-skeleton>
        </el-card>
      </el-col>
    </el-row>
    <!-- 提交人信息 -->
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-divider content-position="left">
            <el-link :underline="false"
                     type="primary">入驻信息</el-link>
          </el-divider>
          <el-row v-if="!loading">
            <el-col :span="8">
              <p>入驻申请人：{{ data.userName ? data.userName : "-" }}</p>
            </el-col>
            <el-col :span="8">
              <p>联系方式：{{ data.mobilePhone ? data.mobilePhone : "-" }}</p>
            </el-col>
          </el-row>
          <avue-skeleton :loading="loading"
                         :rows="1"></avue-skeleton>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="data.companyStatus != 1">
      <el-col :span="24">
        <el-card class="box-card">
          <el-divider content-position="left">
            <el-link :underline="false"
                     type="primary">审核信息</el-link>
          </el-divider>
          <div v-if="!loading">
            <!-- 已拒绝显示 -->
            <div v-if="data.companyStatus == 3">
              <el-row>
                <el-col :span="12">
                  <p>审核人：{{ data.verifyUserName }}</p>
                </el-col>
                <el-col :span="12">
                  <p>审核时间：{{ data.lastupdateDate }}</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <p>拒绝原因：{{ data.remark }}</p>
                </el-col>
              </el-row>
            </div>
            <!-- 已通过显示 -->
            <div v-if="data.companyStatus == 2">
              <el-row>
                <el-col :span="8">
                  <p>企业简称：{{ data.companyShortName }}</p>
                </el-col>
                <el-col :span="8">
                  <p>审核人：{{ data.verifyUserName }}</p>
                </el-col>
                <el-col :span="8">
                  <p>审核时间：{{ data.lastupdateDate }}</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <p>推荐人：{{ data.introducer ? data.introducer : "-" }}</p>
                </el-col>
                <el-col :span="8">
                  <p>备注：{{ data.remark ? data.remark : "-" }}</p>
                </el-col>
              </el-row>
            </div>
          </div>
          <avue-skeleton :loading="loading"></avue-skeleton>
        </el-card>
      </el-col>
    </el-row>
    <!-- 认证信息 -->
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-divider content-position="left">
            <el-link :underline="false"
                     type="primary">认证信息</el-link>
          </el-divider>
          <div v-if="!loading">
            <el-row>
              <el-col :span="8">
                <p>
                  CA认证状态：
                   <el-tag :type="
                        data.companyCaStatus != 3
                            ? 'warning' : 'success'
                        ">
                        {{
                        data.companyCaStatus != 3
                            ? "未认证":"已认证"
                        }}
                    </el-tag>
                </p>
              </el-col>
              <el-col :span="8">
                <p>
                  公司名称：{{ data.companyName }}
                  <el-tag v-if="data.checkCompanyName === 'Y'"
                          type="success">正确</el-tag>
                  <el-tag v-else
                          type="warning">未知</el-tag>
                </p>
              </el-col>
              <el-col :span="8">
                <p>
                  社会统一信用代码：{{ data.creditNum }}
                  <el-tag v-if="data.checkCreditNum === 'Y'"
                          type="success">正确</el-tag>
                  <el-tag v-else
                          type="warning">未知</el-tag>
                </p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <p>
                  企业身份：
                  <el-tag>{{ data.companyIdentityName }}</el-tag>
                </p>
              </el-col>
              <el-col :span="8">
                <p>企业地址：{{ data.address }}</p>
              </el-col>
              <el-col :span="8">
                <p>企业注册资本：{{ data.registeredCapital }} 万元</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <p class="overHidden">
                  交易品种：
                  <span v-if="categoryNameList.length == 0">-</span>
                  <el-popover placement="top-start"
                              width="200"
                              trigger="hover">
                    <template slot="reference">
                      <div class="inline">
                        <el-tag :disable-transitions="false"
                                :hit="false"
                                effect="dark"
                                v-for="(item, index) in categoryNameList"
                                :key="index">{{ item }}</el-tag>
                      </div>
                    </template>
                    <span v-for="(item, index) in categoryNameList"
                          :key="index">{{ item }}
                      <i v-if="index != categoryNameList.length - 1">、</i>
                    </span>
                  </el-popover>
                </p>
              </el-col>
                <el-col :span="8">
                    <p>法人姓名：{{data.legalPerson?(data.legalPerson=='null'?'-':data.legalPerson):'-'}}</p>
                </el-col>
                    <el-col :span="8">
                    <p>法人身份证：{{data.legalPersonCard?(data.legalPersonCard=='null'?'-':data.legalPersonCard):'-'}}</p>
                </el-col>
            </el-row>
            <el-row>
               <el-col :span="8"
                      class="flex">
                <p>营业执照：</p>
                <p>
                  <el-image :src="data.licensePicUrl"
                            class="infoPic"
                            :preview-src-list="[data.licensePicUrl]"></el-image>
                </p>
              </el-col>
              <el-col :span="8"
                      class="flex">
                <p>认证授权书：</p>
                <p>
                  <el-image :src="data.authorizationFileUrl"
                            class="infoPic"
                            :preview-src-list="[data.authorizationFileUrl]">
                  </el-image>
                </p>
              </el-col>
            </el-row>
          </div>
          <avue-skeleton :loading="loading"></avue-skeleton>
        </el-card>
      </el-col>
    </el-row>
    <!-- 企业资料核查 -->
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-divider content-position="left">
            <el-link :underline="false"
                     type="primary">企业资料核查</el-link>
          </el-divider>
          <div v-if="!loading">
            <div v-if="data.detailByYJ != null">
              <el-row>
                <el-col :span="4"
                        class="key">
                  <span>注册资本：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.RegistCapi }}</span>
                </el-col>
                <el-col :span="4"
                        class="key">
                  <span>实缴资本：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>-</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"
                        class="key">
                  <span>经营状态：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.Status }}</span>
                </el-col>
                <el-col :span="4"
                        class="key">
                  <span>成立日期：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.StartDate }}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"
                        class="key">
                  <span>注册号：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.No }}</span>
                </el-col>
                <el-col :span="4"
                        class="key">
                  <span>组织机构代码：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.OrgNo }}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"
                        class="key">
                  <span>纳税人识别号：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.CreditCode }}</span>
                </el-col>
                <el-col :span="4"
                        class="key">
                  <span>社会统一信用代码：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.CreditCode }}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"
                        class="key">
                  <span>公司类型：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.EconKind }}</span>
                </el-col>
                <el-col :span="4"
                        class="key">
                  <span>所属行业：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.Industry }}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"
                        class="key">
                  <span>核准日期：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.CheckDate }}</span>
                </el-col>
                <el-col :span="4"
                        class="key">
                  <span>登记机关：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.BelongOrg }}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"
                        class="key">
                  <span>所属地区：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.Province }}</span>
                </el-col>
                <el-col :span="4"
                        class="key">
                  <span>英文名：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.dataNameEg }}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"
                        class="key">
                  <span>曾用名：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.OriginalName }}</span>
                </el-col>
                <el-col :span="4"
                        class="key">
                  <span>经营方式：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.ScopeType }}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"
                        class="key">
                  <span>人员规模：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.Employee }}</span>
                </el-col>
                <el-col :span="4"
                        class="key">
                  <span>企业期限：</span>
                </el-col>
                <el-col :span="8"
                        class="value">
                  <span>{{ data.detailByYJ.TeamEnd }}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"
                        class="key">
                  <span>企业地址：</span>
                </el-col>
                <el-col :span="20"
                        class="value">
                  <span>{{ data.detailByYJ.Address }}</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"
                        class="key">
                  <span>经营范围：</span>
                </el-col>
                <el-col :span="20"
                        class="value">
                  <span>{{ data.detailByYJ.Scope }}</span>
                </el-col>
              </el-row>
            </div>
            <div v-else>
              <el-row>
                <el-col :span="24">
                  <p>找不到名字匹配的企业</p>
                </el-col>
              </el-row>
            </div>
          </div>
          <avue-skeleton :loading="loading"></avue-skeleton>
        </el-card>
      </el-col>
    </el-row>
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
  </div>
</template>
<script>
import { queryCompanyDetail, editComapany } from '@/api/company/index'
import { joinExamine } from '@/api/company/join'
import { findCategoryParent } from '@/util/util'
import upload from '@/components/upload'
import category from '@/components/category-cascader'

export default {
  data() {
    return {
      loading: false,
      drawer: false,
      data: {},
      dialogExamineType: 1,
      dialogExamine: false,
      dialogExamineForm: {},
      dialogExamineOption: {
        emptyBtn: false,
        submitBtn: false,
        column: [],
      },
      currentIdentity: '超级管理员',
      companyIdentityDicData: [{
        label: '买家',
        value: '1',
      }, {
        label: '卖家',
        value: '2',
      }, {
        label: '买家和卖家',
        value: '3',
      }],
      identityOptions: [{
        label: '超级管理员',
        value: '1',
      }, {
        label: '管理员',
        value: '2',
      }],
      dialogExamineLoading: false,
      categoryNameList: [],
      drawerForm: {},
      drawerFormOption: {
        labelWidth: '140',
        emptyBtn: false,
        submitBtn: false,
        column: [
          {
            label: '精选卖家',
            type: 'switch',
            prop: 'carefullyChosenSeller',
            span: 24,
            formslot: true,
          }, {
            label: '入驻申请人',
            type: 'input',
            prop: 'userName',
            disabled: true,
            formslot: true,
            rules: [{
              required: true,
              message: '请输入入驻申请人',
              trigger: 'change',
            }],
            span: 12,
          }, {
            label: '联系方式',
            prop: 'mobilePhone',
            disabled: true,
            span: 12,
          }, {
            label: '企业名称',
            type: 'input',
            prop: 'companyName',
            formslot: true,
            rules: [{
              required: true,
              message: '请输入企业名称',
              trigger: 'change',
            }],
            span: 12,
          }, {
            label: '企业身份',
            type: 'select',
            prop: 'companyIdentity',
            formslot: true,
            span: 12,
          }, {
            label: '企业简称',
            type: 'input',
            prop: 'companyShortName',
            formslot: true,
            rules: [{
              required: true,
              message: '请输入企业简称',
              trigger: 'change',
            }],
            span: 12,
          },
          {
            label: '交易品种',
            formslot: true,
            prop: 'tradingCategoryCode',
            span: 12,
          }, {
            label: '社会统一信用代码',
            type: 'input',
            prop: 'creditNum',
            formslot: true,
            rules: [{
              required: true,
              message: '请输入社会统一信用代码',
              trigger: 'change',
            }],
            span: 12,
          }, {
            label: '推荐人',
            type: 'input',
            prop: 'introducer',
            span: 12,
            formslot: true,
          }, {
            label: '备注',
            type: 'textarea',
            prop: 'remark',
            formslot: true,
            span: 24,
          }, {
            label: '营业执照',
            prop: 'imageFile',
            formslot: true,
            span: 12,
          }, {
            label: '认证授权书',
            prop: 'authorizationFile',
            formslot: true,
            span: 12,
          }],
      },
      tradingCategoryCode: [],
    }
  },
  components: {
    upload,
    category,
  },
  methods: {
    drawerOpen() {
      this.$nextTick(() => {
        this.$refs.imageFile.setFile(this.data.licensePicUrl)
        this.$refs.authorizationFile.setFile(this.data.authorizationFileUrl)
      })
    },
    drawerClose(done) {
      done();
    },
    // 获取详情信息
    getDetail() {
      this.loading = true
      queryCompanyDetail({ companyCode: this.$route.query.code })
        .then(res => {
          let carefullyChosenSeller;
          if (this.data.carefullyChosenSeller) {
            carefullyChosenSeller = true
          } else {
            carefullyChosenSeller = false
          }
          this.loading = false
          this.categoryNameList = []
          this.tradingCategoryCode = []
          this.data = res.data.returnObject
          this.data.forEach(
            (item, index) => {
              this.drawerForm[index] = this.data[index]
            }
          )
          this.dialogExamineForm.shortName = this.data.companyShortName ? this.data.companyShortName : ''
          this.dialogExamineForm.introducer = this.data.companyintroducer ? this.data.companyintroducer : ''
          this.dialogExamineForm.remark = this.data.companyremark ? this.data.companyremark : ''
          this.drawerForm.carefullyChosenSeller = carefullyChosenSeller
          this.drawerForm.imageFile = this.data.licensePicUrl
          this.drawerForm.authorizationFile = this.data.authorizationFileUrl
          if (this.data.tradingCategoryCode && this.data.tradingCategoryCode !== '') {
            const arr = this.data.tradingCategoryCode.split(',')
            this.$store.dispatch('QueryCategoryTree')
              .then(resData => {
                arr.forEach(item => {
                  const itemData = item;
                  const name = findCategoryParent(resData, 'categoryCode', itemData, 'categoryName')
                  if (name) {
                    this.categoryNameList.push(name[1])
                  }
                  this.tradingCategoryCode.push(findCategoryParent(resData, 'categoryCode', itemData))
                });
              })
          }
        }).catch(() => { })
    },
    // 入驻审核
    examine(type) {
      this.dialogExamineType = type
      if (type === 1) {
        this.dialogExamineOption.column = [{
          label: '企业简称',
          type: 'input',
          prop: 'shortName',
          placeholder: '请输入企业简称，限8个字符内',
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
    delAuthorizationFile() {
      this.drawerForm.authorizationFile = null
    },
    delImageFile() {
      this.drawerForm.imageFile = null
    },
    changeCategory(val) {
      this.tradingCategoryCode = val
    },
    changeImage(val) {
      this.drawerForm.imageFile = val
    },
    changeAuthorization(val) {
      this.drawerForm.authorizationFile = val
    },
    dialogExamineSubmit() { // 审核企业
      this.$refs.dialogExamine.validate(valid => {
        if (valid) {
          this.dialogExamineLoading = true
          const params = this.dialogExamineForm
          params.companyCode = this.data.companyCode
          if (this.dialogExamineType === 1) {
            params.isPass = 'Y'
            params.userCode = 'e9b68b96ef3648adb99c1a8a9a3b12c3'
          } else {
            params.isPass = 'N'
          }
          joinExamine(params).then(() => {
            this.dialogExamine = false
            this.dialogExamineLoading = false
            this.getDetail()
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
          }).catch(() => {
            this.dialogExamine = false
            this.dialogExamineLoading = false
          })
        }
      })
    },
    drawerSubmit(form, done) { // 编辑企业信息
      this.$refs.drawerForm.validate(valid => {
        if (valid) {
          const tradingCategoryCode = this.tradingCategoryCode.map(item => {
            return item[1]
          })
          const formData = new FormData()
          formData.append('companyCode', form.companyCode)
          formData.append('userName', form.userName)
          formData.append('userIdentity', form.userIdentity)
          formData.append('mobilePhone', form.mobilePhone)
          formData.append('companyName', form.companyName)
          formData.append('companyShortName', form.companyShortName)
          // formData.append('referee',form.referee)
          formData.append('introducer', form.introducer)
          formData.append('carefullyChosenSeller', form.carefullyChosenSeller ? '1' : '0')
          formData.append('remark', form.remark)
          formData.append('companyIdentity', form.companyIdentity)
          formData.append('creditNum', form.creditNum)
          formData.append('tradingCategoryCode', tradingCategoryCode.join(','))
          if (this.drawerForm.imageFile instanceof File) {
            formData.append('imageFile', this.drawerForm.imageFile)
          }
          if (this.drawerForm.authorizationFile instanceof File) {
            formData.append('authorizationFile', this.drawerForm.authorizationFile)
          }
          editComapany(formData).then(() => {
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            this.drawer = false
            this.getDetail()
            done()
          }).catch(() => { })
        }
      })
    },
  },
  created() {
    this.getDetail()
  },
}
</script>

<style lang="scss" scoped>
.info {
  padding: 10px 6px;
  box-sizing: border-box;
  .infoPic {
    width: 150px;
    height: 150px;
  }
}
</style>
