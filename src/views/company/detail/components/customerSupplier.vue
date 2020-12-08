<template>
  <div class="customer">
    <avue-crud :option="option"
               :data="data"
               :table-loading="loading"
               :page.sync="page"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange">
      <template slot-scope="scope"
                slot="purchase">
        <el-popover placement="right"
                    width="200"
                    trigger="hover">
          <p v-for="(item, idx) in scope.row.purchaseList"
             :key="idx">
            {{ item.contractName }}：{{ item.availableQuotaNum }}
          </p>
          <el-button type="text"
                     slot="reference">{{ scope.row.purchaseList[0].contractName }}：{{
              scope.row.purchaseList[0].availableQuotaNum
            }}</el-button>
        </el-popover>
      </template>
      <template slot-scope="scope"
                slot="sell">
        <el-popover placement="right"
                    width="200"
                    trigger="hover">
          <p v-for="(item, idx) in scope.row.salesList"
             :key="idx">
            {{ item.contractName }}：{{ item.availableQuotaNum }}
          </p>
          <el-button type="text"
                     slot="reference">{{ scope.row.salesList[0].contractName }}：{{
              scope.row.salesList[0].availableQuotaNum
            }}</el-button>
        </el-popover>
      </template>
    </avue-crud>
  </div>
</template>
<script>
import { queryCompanySuppliers, queryCompanyCustomers } from '@/api/company/index'

export default {
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      data: [],
      loading: false,
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
        viewBtn: false,
        height: 'auto',
        tip: false,
        border: true,
        dialogModal: false,
        menu: false,
        column: [
          {
            label: '公司全称',
            prop: 'companyName',
            span: 24,
            row: true,
          },
          {
            label: '联系人',
            prop: 'companyContacts',
            span: 24,
            row: true,
          },
          {
            label: '联系电话',
            prop: 'companyContactNumber',
            span: 24,
            row: true,
          }, {
            label: '采购额度',
            prop: 'purchase',
            span: 24,
            row: true,
            slot: true,
          },
          {
            label: '销售额度',
            prop: 'sell',
            span: 24,
            row: true,
            slot: true,
          },
        ],
      },
    }
  },
  methods: {
    refreshChange() {
      this.page.currentPage = 1
      this.init()
    },
    init() {
      this.loading = true
      const params = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
        companyCode: this.$route.query.code,
      }
      if (this.type === '1') {
        queryCompanyCustomers(params).then(res => {
          this.loading = false
          this.data = res.data.returnObject.customers
          this.page.total = res.data.returnObject.total
        }).catch(() => { })
      } else {
        queryCompanySuppliers(params).then(res => {
          this.loading = false
          this.data = res.data.returnObject.suppliers
          this.page.total = res.data.returnObject.total
        }).catch(() => { })
      }
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.currentPage = 1
      this.page.pageSize = pageSize;
      this.init()
    },
  },
  mounted() {
    this.init()
  },
}
</script>
