<template>
  <div class="staff">
    <avue-crud :option="option"
               :data="data"
               :table-loading="loading"
               :page.sync="page"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange">
      <template slot="roleCodeExp"
                slot-scope="{ row }">
        <el-tag>{{ row.roleCodeExp }}</el-tag>
      </template>
      <template slot="allowPricingExp"
                slot-scope="{ row }">
        <el-tag :type="row.allowPricing === '1' ? 'success' : 'danger'">{{
          row.allowPricing === "1" ? "是" : "否"
        }}</el-tag>
      </template>
      <template slot-scope="{ row }"
                slot="menu">
        <el-button icon="el-icon-check"
                   size="small"
                   type="text"
                   @click="examine(row, 1)">通过</el-button>
        <el-button icon="el-icon-close"
                   size="small"
                   type="text"
                   @click="examine(row, 2)">拒绝</el-button>
      </template>

      <template slot="companyStatusSearch">
        <el-select v-model="companyStatus"
                   clearable
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
      <template slot="businessDirectionExp"
                slot-scope="{ row }">
        <el-tag>{{ row.businessDirectionExp }}</el-tag>
      </template>
    </avue-crud>
  </div>
</template>
<script>
import { queryCompanyUsers } from '@/api/company/index'

export default {
  data() {
    return {
      loading: false,
      companyStatus: '',
      data: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      option: {
        index: true,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        viewBtn: true,
        tip: false,
        border: true,
        dialogModal: false,
        menu: true,
        searchMenuSpan: 4,
        dialogWidth: 500,
        labelWidth: 130,
        column: [
          {
            label: '审核状态',
            prop: 'companyStatus',
            span: 24,
            row: true,
            slot: true,
            searchSpan: 4,
            searchslot: true,
            showColumn: false,
            search: true,
            hide: true,

          },
          {
            label: '员工姓名',
            prop: 'userName',
            span: 24,
          },
          {
            label: '手机号码',
            prop: 'userPhone',
            span: 24,
          },
          {
            label: '权限',
            prop: 'roleCodeExp',
            span: 24,
            slot: true,
          }, {
            label: '是否允许点价',
            prop: 'allowPricingExp',
            span: 24,
            slot: true,
          },
          {
            label: '业务方向',
            prop: 'businessDirectionExp',
            span: 24,
            slot: true,
          },
        ],
      },
    }
  },
  methods: {
    changeCompanyStatus() {

    },
    refreshChange() {
      this.init()
    },
    init() {
      this.loading = true
      queryCompanyUsers({
        pageNum: this.page.currentPage,
        companyCode: this.$route.query.code,
      }).then(res => {
        this.loading = false
        this.data = res.data.returnObject
      }).catch(() => { })
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss" >
.staff .avue-form__menu {
  display: none !important;
}
</style>
