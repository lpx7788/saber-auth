<!--期货合约页面-->
<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page.sync="page"
               :permission="permissionList"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">
      <template slot-scope="{ row }"
                slot="menu">
        <el-button icon="el-icon-view"
                   :size="size"
                   type="text"
                   @click="editBtnHandle(row)">查看</el-button>
      </template>
      <template slot-scope="{ row }"
                slot="status">
        <el-tag v-if="row.status === '已下架'"
                type="danger">{{
          row.status
        }}</el-tag>
        <el-tag v-else>{{ row.status }}</el-tag>
      </template>
    </avue-crud>
    <el-dialog title="查 看"
               :append-to-body="true"
               @opened="beforeOpen"
               :visible.sync="dialogViewVisible">
      <el-form :model="form"
               label-width="160px"
               v-loading="formLoading">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="交易品种：">{{
              editFormData.name
            }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交易单位：">{{
              editFormData.tradingUnit
            }}</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="交割单位：">{{
              editFormData.deliveryUnit
            }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交割地点：">{{
              editFormData.deliveryPoint
            }}</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="交割方式：">{{
              editFormData.deliveryMethod
            }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交易代码：">{{
              editFormData.futuresCode
            }}</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="交易时间：">{{
              editFormData.tradingHours
            }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最后交易日：">{{
              editFormData.lastTradingDay
            }}</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="上市交易所：">{{
              editFormData.exchangeName
            }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最小变动价位：">{{ editFormData.mqf }}元/吨</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="最低交易保证金：">{{
              editFormData.mtm
            }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </basic-container>
</template>
<script>
import { getList, getDetail, add, update, remove } from '@/api/dataCenter/contract';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      form: {},
      query: {},
      dialogViewVisible: false, // 弹窗状态
      viewRow: false,
      formLoading: true,
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      editFormData: {},
      selectionList: [],
      typeList: [],
      option: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        menuWidth: 140,
        border: true,
        delBtn: false, // 行内删除
        addBtn: false, // 新增
        editBtn: false, // 编辑
        viewBtn: false, // 查看
        selection: false, // 去除选择
        index: true,
        // selection: true,
        dialogClickModal: false,
        column: [
          {
            label: '合约编号',
            prop: 'code',
            search: true,
            rules: [
              {
                required: true,
                message: '请输入合约编号',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '合约名称',
            prop: 'name',
            search: true,
            rules: [
              {
                required: true,
                message: '请输入合约名称',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '上市日',
            prop: 'openDate',
            rules: [
              {
                required: true,
                message: '请输入上市日',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '到期日',
            prop: 'expiryDate',
            rules: [
              {
                required: true,
                message: '请输入到期日',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '开始交割日',
            prop: 'startDeliveryDate',
            rules: [
              {
                required: true,
                message: '请输入开始交割日',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '最后交割日',
            prop: 'endDeliveryDate',
            rules: [
              {
                required: true,
                message: '请输入最后交割日',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '挂牌基准价',
            prop: 'basisPrice',
            rules: [
              {
                required: true,
                message: '请输入挂牌基准价',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '状态',
            prop: 'status',
            search: true,
            slot: true,
            type: 'select',
            dicData: [
              { name: '上架中', id: 0 },
              { name: '已下架', id: 1 },
            ],
            props: {
              label: 'name',
              value: 'id',
            },
            rules: [
              {
                required: true,
                message: '请输入状态',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '期货编号',
            prop: 'futuresCode',
            rules: [
              {
                required: true,
                message: '请输入期货编号',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '期货交易所',
            prop: 'exchangeName',
            rules: [
              {
                required: true,
                message: '请输入期货交易所',
                trigger: 'blur',
              },
            ],
          },
        ],
      },
      data: [],
    };
  },
  computed: {
    ...mapGetters(['permission']),
    permissionList() {
      return {
        // addBtn: this.vaildData(this.permission.post_add, false),
        // viewBtn: this.vaildData(this.permission.post_view, false),
        // delBtn: this.vaildData(this.permission.post_delete, false),
        // editBtn: this.vaildData(this.permission.post_edit, false)
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
    editBtnHandle(row) {
      this.viewRow = row;
      this.dialogViewVisible = true;
    },
    beforeOpen() {
      this.formLoading = true;
      this.$nextTick(() => {
        getDetail(this.viewRow.code)
          .then(res => {
            this.editFormData = res.data.data;
            this.formLoading = false;
          })
          .catch(() => { });
      });
    },

    // 新增
    rowSave(row, done, loading) {
      add(row)
        .then(
          () => {
            this.onLoad(this.page);
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            done();
          },
          () => {
            loading();
          }
        )
        .catch(() => { });
    },
    // 编辑
    rowUpdate(row, index, done, loading) {
      update(row)
        .then(
          () => {
            this.onLoad(this.page);
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            done();
          },
          () => {
            loading();
          }
        )
        .catch(() => { });
    },
    // 删除
    rowDel(row) {
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        })
        .catch(e => e);
    },
    // 批量删除
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning('请选择至少一条数据');
        return;
      }
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          this.$refs.crud.toggleSelection();
        })
        .catch(e => e);
    },

    // 搜索重置
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    // 搜索操作
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    // 初始化页面
    onLoad(page, params = {}) {
      this.loading = true;
      let paramsTotal = Object.assign(params, this.query);
      if (paramsTotal.length !== 0) {
        paramsTotal = JSON.stringify(paramsTotal).replace(
          /status/g,
          'isDeleted'
        );
        paramsTotal = JSON.parse(paramsTotal);
      }
      getList(page.currentPage, page.pageSize, paramsTotal)
        .then(res => {
          const returnData = res.data.data;
          this.page.total = returnData.total;
          this.data = returnData.records;
          this.loading = false;
          this.selectionClear();
        })
        .catch(() => { });
    },
  },
};
</script>
