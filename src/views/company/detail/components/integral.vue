<template>
  <div class="integral">
    <avue-crud :option="option"
               :data="data"
               v-model="crudObj"
               :table-loading="loading"
               :page.sync="page"
               @current-change="currentChange"
               @size-change="sizeChange"
               :before-open="beforeOpen"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @refresh-change="refreshChange">
      <template slot-scope="scope"
                slot="condition">
        <el-tag>{{
          scope.row.rewardConditions == "1"
            ? "成交价达到指导价且成交"
            : "成交即可"
        }}</el-tag>
      </template>
      <template slot="categoryNameForm">
        <categoryCascade v-model="category"
                         @input="categoryChange" />
      </template>
      <template slot="conditionForm">
        <el-select v-model="crudObj.rewardConditions"
                   @change="conditionChange">
          <el-option label="成交价达到指导价且成交"
                     value="1"></el-option>
          <el-option label="成交即可"
                     value="2"></el-option>
        </el-select>
      </template>
    </avue-crud>
  </div>
</template>
<script>
import { queryCompanyIntegral, queryCompanyAddIntegral, queryCompanyDelIntegral } from '@/api/company/integral'
import categoryCascade from '@/components/category-cascader'
import { findCategoryParent } from '@/util/util'

export default {
  data() {
    return {
      loading: false,
      data: [],
      crudObj: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      conditionForm: '1',
      option: {
        index: true,
        viewBtn: false,
        height: 'auto',
        calcHeight: 30,
        tip: false,
        border: true,
        dialogWidth: '30%',
        column: [
          {
            label: '奖励品种',
            prop: 'categoryName',
            span: 24,
            row: true,
            formslot: true,
            rules: [{
              required: true,
              message: '请输入奖励品种',
              trigger: 'change',
            }],
          },
          {
            label: '奖励条件',
            prop: 'condition',
            span: 24,
            row: true,
            slot: true,
            formslot: true,
            rules: [{
              required: true,
              message: '请输入奖励条件',
              trigger: 'change',
            }],
          },
          {
            label: '奖励数量',
            prop: 'rewardNum',
            span: 24,
            row: true,
            rules: [{
              required: true,
              message: '请输入奖励数量',
              trigger: 'change',
            }],
          },
        ],
      },
      category: [],
      dialogType: null,
      categoryTree: [],
    }
  },
  components: {
    categoryCascade,
  },
  methods: {
    refreshChange() {
      this.init()
    },
    init() {
      this.loading = true
      queryCompanyIntegral({
        companyCode: this.$route.query.code,
      }).then(res => {
        this.loading = false
        this.data = res.data.returnObject
      }).catch(() => { })
      this.$store.dispatch('QueryCategoryTree').then(res => {
        this.categoryTree = res
      })
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.currentPage = 1
      this.page.pageSize = pageSize;
      this.init()
    },
    beforeOpen(done, type) {
      this.dialogType = type
      if (this.dialogType === 'edit') {
        this.category = findCategoryParent(this.categoryTree, 'categoryName', this.crudObj.categoryName)
        this.crudObj.condition = this.crudObj.rewardConditions
      } else {
        this.category = []
      }
      done()
    },
    updateHandle(done) {
      const name = findCategoryParent(this.categoryTree, 'categoryCode', this.category[1], 'categoryName')
      const code = findCategoryParent(this.categoryTree, 'categoryCode', this.category[1])
      const params = {
        companyCode: this.$route.query.code,
        categoryName: name[1],
        categoryCode: code[1],
        rewardConditions: this.crudObj.rewardConditions,
        rewardNum: this.crudObj.rewardNum,
      }
      if (this.dialogType === 'edit') params.id = this.crudObj.id
      queryCompanyAddIntegral(params).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
        this.init()
        done()
      }).catch(() => { })
    },
    // 编辑保存
    rowUpdate(row, index, done,) {
      this.updateHandle(done)
    },
    // 新增保存
    rowSave(row, done,) {
      this.updateHandle(done)
    },
    rowDel(row) {
      this.$confirm('是否确定删除该奖励品种?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        queryCompanyDelIntegral({
          id: row.id,
        }).then(() => {
          this.init()
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        }).catch(() => { })
      }).catch(() => {

      })
    },
    conditionChange() {
      this.crudObj.condition = this.crudObj.rewardConditions
    },
    categoryChange() {
      this.crudObj.categoryName = findCategoryParent(this.categoryTree, 'categoryCode', this.category[1])
    },
  },
  mounted() {
    this.init()
  },
}
</script>
