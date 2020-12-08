<template>
  <div class="hedging">
    <el-row>
      <el-col>
        <el-card>
          <el-form inline>
            <el-form-item label="是否开通自动套保功能">
              <el-switch v-model="hedgingSwitch"
                         :disabled="switchLoading"
                         @change="changeHedgingSwitch"></el-switch>
            </el-form-item>
            <el-form-item label="是否开启自动套保"
                          v-if="hedgingSwitch">
              <el-switch v-model="openHedgingSwitch"
                         :disabled="switchLoading"
                         @change="changeOpenHedgingSwitch"></el-switch>
            </el-form-item>
            <el-form-item label="自动套保资料"
                          v-if="hedgingSwitch">
              <upload v-loading="switchLoading"
                      element-loading-spinner="el-icon-loading">
                <!-- <el-button type="primary" icon="el-icon-upload">上传</el-button> -->
              </upload>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card>
          <el-tabs v-model="tabsNum2">
            <el-tab-pane name="first">
              <span slot="label"><i class="el-icon-user"></i> 套保账户管理</span>
              <avue-crud :page="pageAccount"
                         :data="dataAccount"
                         :table-loading="tableAccountLoading"
                         :option="optionAccount"
                         @refresh-change="refreshChange(1)">
                <template slot="account">
                  <el-tag plain
                          type="success">正常</el-tag>
                </template>
                <template slot="accountStatus">
                  <el-tag plain
                          type="success">已连接</el-tag>
                </template>
                <template slot="connectStatus">
                  <el-tag plain
                          type="success">已使用</el-tag>
                </template>
                <template slot="menu">
                  <el-button type="text"
                             icon="icon-tingzhi3">
                    停止使用</el-button>
                  <el-button type="text"
                             icon="icon-bofang2">
                    恢复使用</el-button>
                </template>
              </avue-crud>
            </el-tab-pane>
            <el-tab-pane name="second">
              <span slot="label"><i class="el-icon-pie-chart"></i> 套保品种及比例</span>
              <avue-crud :page="pageCategory"
                         :data="dataCategory"
                         :table-loading="tableCategoryLoading"
                         :option="optionCategory"
                         :before-open="beforeOpen"
                         @refresh-change="refreshChange(2)">
                <template slot="expand">
                  <el-row>
                    <el-col :span="8">
                      <span>开仓策略：优选保值</span>
                    </el-col>
                    <el-col :span="8">
                      <span>点价限制：关闭</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <span>挂单限制：关闭</span>
                    </el-col>
                    <el-col :span="8">
                      <span>休盘策略：禁止点价/撤单</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>交割月策略：挂单中满足指定整数倍部分挂单，
                      挂在交割月，不足部分暂时不挂单，
                      等待当月的成交（或者价格到了）之后，
                      不足部分就按照市价直接挂单到次月。</el-col>
                  </el-row>
                </template>
                <template slot="accountStatus">
                  <el-tag plain
                          type="success">正常</el-tag>
                </template>
                <template slot="menu">
                  <el-button type="text"
                             icon="icon-editor2">
                    设置策略</el-button>
                </template>
                <template slot-scope="{ row }"
                          slot="categoryForm">
                  <span>{{ getCategoryCode(row.category) }}</span>
                  <category v-model="categoryCode" />
                </template>
              </avue-crud>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import upload from '@/components/upload'
import category from '@/components/category-cascader'
import { findCategoryParent } from '@/util/util'
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      tabsNum2: 'first',
      pageAccount: {
        pageSize: 10,
        currentPage: 1,
        total: 1,
      },
      pageCategory: {
        pageSize: 10,
        currentPage: 1,
        total: 1,
      },
      tableAccountLoading: false,
      tableCategoryLoading: false,
      changeAble: true,
      categoryCode: [],
      hedgingSwitch: false,
      openHedgingSwitch: false,
      switchLoading: false,
      loadingAccount: false,
      loadingCategory: false,
      dataAccount: [{
        companyShortName: '深圳康年',
        companyName: '广州期货',
        account: '323242342342',
        accountStatus: '审核中',
        connectStatus: '未连接',
        editDate: '2018-12-29',
      }],
      dataCategory: [{
        id: 1,
        category: '热轧卷板',
        proportion: '99%',
        account: '华泰期货 3232323232323',
        accountStatus: '正常',
        openingStrategy: '优选保值',
        pointPriceLimit: '关闭',
        pendingOrderLimit: '关闭',
        closedStrategy: '禁止点价/撤单',
        deliveryMonthStrategy:
          '挂单中满足指定整数倍部分挂单,挂在交割月,不足部分暂时不挂单,等待当月的成交(或者价格到了)之后,不足部分就按照市价直接挂单到次月.',
      }],
      optionAccount: {
        index: true,
        delBtn: false,
        viewBtn: false,
        border: true,
        dialogWidth: 500,
        labelWidth: 130,
        column: [
          {
            label: '期货公司',
            prop: 'companyName',
            span: 24,
            type: 'select',
          }, {
            label: '账户',
            prop: 'companyShortName',
            span: 24,
          }, {
            label: '席位',
            prop: 'companyNames',
            span: 24,
            type: 'select',
            dicData: [
              {
                label: '主席',
                value: '1',
              },
              {
                label: '次席',
                value: '2',
              },
            ],
          }, {
            label: '账户审核状态',
            prop: 'account',
            span: 24,
            addDisplay: false,
            editDisplay: false,
            slot: true,
          }, {
            label: '连接情况',
            prop: 'accountStatus',
            span: 24,
            addDisplay: false,
            editDisplay: false,
            slot: true,
          }, {
            label: '账户使用状态',
            prop: 'connectStatus',
            span: 24,
            addDisplay: false,
            editDisplay: false,
            slot: true,
          }, {
            label: '修改时间',
            prop: 'editDate',
            span: 24,
            addDisplay: false,
            editDisplay: false,
          },
        ],
      },
      optionCategory: {
        expand: true,
        rowKey: 'id',
        viewBtn: false,
        border: true,
        index: true,
        dialogWidth: 500,
        labelWidth: 130,
        column: [
          {
            label: '套保品种',
            prop: 'category',
            span: 24,
            formslot: true,
          }, {
            label: '采购保值比例',
            prop: 'proportion',
            span: 24,
          }, {
            label: '销售保值比例',
            prop: 'proportion',
            span: 24,
          }, {
            label: '套保账户',
            prop: 'account',
            span: 24,
          }, {
            label: '状态',
            prop: 'accountStatus',
            span: 24,
            addDisplay: false,
            editDisplay: false,
            slot: true,
          },
        ],
      },
    }
  },
  components: {
    upload,
    category,
  },
  methods: {
    // 是否开通自动套保功能开关
    changeHedgingSwitch() {
      this.switchLoading = true
      setTimeout(() => {
        this.switchLoading = false
      }, 1000)
    },
    // 是否开启自动套保开关
    changeOpenHedgingSwitch() {
      this.switchLoading = true
      setTimeout(() => {
        this.switchLoading = false
      }, 1000)
    },
    getCategoryCode(code) {
      if (code) {
        this.$store.dispatch('QueryCategoryTree').then(res => {
          const categoryCode = findCategoryParent(res, 'categoryName', code)
          if (this.changeAble
            && (this.categoryCode.length === 0
              || (this.categoryCode[1] !== categoryCode[1]))) {
            this.categoryCode = categoryCode
            this.changeAble = false
          }
        })
      }
    },
    beforeOpen(done, type) {
      if (type === 'edit') this.changeAble = true; done()
    },
  },
  mounted() {

  },
}
</script>

<style lang="scss" scoped>
.hedging {
  padding: 10px 6px;
}
</style>
