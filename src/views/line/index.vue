<template>
  <basic-container>
    <avue-crud :option="lineOption"
               :table-loading="pageLoading"
               :data="lineData"
               :page.sync="page"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-reset="searchReset"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="lineLoad">
      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   @click.stop="handleAdd('', 'add')">新增</el-button>
      </template>
      <template slot-scope="scope"
                slot="menu">
        <el-button type="text"
                   icon="el-icon-edit"
                   size="small"
                   @click="handleAdd(scope.row, 'edit')">编辑</el-button>
      </template>
      <template slot-scope="scope"
                slot="lastupdateDate">{{
        moment(scope.row.lastupdateDate).format("YYYY-MM-DD HH:mm:ss")
      }}</template>
    </avue-crud>
    <!-- 新增或者编辑弹窗-->
    <el-dialog :title="openType === 'edit' ? '编辑线路' : '新增线路'"
               :append-to-body="true"
               :visible.sync="addDialogVisible"
               width="38%"
               @closed="closedDialog"
               center>
      <el-form :model="formData"
               ref="formData"
               :rules="rules"
               label-width="120px">
        <el-form-item label="线路起点："
                      prop="origin"
                      :rules="{
            required: true,
            message: '请输入起点',
            trigger: 'change',
          }">
          <el-select v-model="formData.origin"
                     default-first-option
                     clearable
                     filterable
                     placeholder="请选择或搜索线路起点"
                     class="form-item">
            <el-option v-for="item in originListList.buyer"
                       :key="item.companyCode"
                       :label="item.companyName"
                       :value="item.companyCode"></el-option>
          </el-select>
        </el-form-item>

        <!-- 线路增删内容块 -->
        <div class="lineOperation"
             v-for="(item, index) in formData.lineOperationList"
             :key="index">
          <!-- 线路 -->
          <el-form-item :label="'线路节点' + Number(index + 1) + '：'"
                        :prop="'lineOperationList.' + index + '.line'"
                        :rules="{
              required: true,
              message: '请输入线路节点' + Number(index + 1),
              trigger: 'change',
            }">
            <el-select v-model="item.line"
                       default-first-option
                       clearable
                       filterable
                       :placeholder="'请选择或搜索线路节点' + Number(index + 1)"
                       class="form-item">
              <el-option v-for="item in originListList.buyer"
                         :key="item.companyCode"
                         :label="item.companyName"
                         :value="item.companyCode"></el-option>
            </el-select>
            <i class="ml10 pointer"
               :class="
                index === 0
                  ? 'mainColor el-icon-circle-plus-outline'
                  : 'cRed el-icon-remove-outline'
              "
               @click="lineOperationHandle(index)"></i>
          </el-form-item>
          <!-- 差价 -->
          <el-form-item label="差价："
                        :prop="'lineOperationList.' + index + '.priceSpread'"
                        :rules="{
              required: true,
              message: '请输入差价',
              trigger: 'change',
            }">
            <el-input class="form-item"
                      v-model="item.priceSpread"
                      placeholder="请输入差价"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="addSubmit('formData')">确认提交</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>
<script>
import { getCompanyList } from '@/api/order/index';
import {
  addLine,
  deleteLine,
  getLineList,
} from '@/api/line/index';

const moment = require('moment');

export default {
  data() {
    return {
      form: {},
      query: {},
      pageLoading: true,
      addDialogVisible: false, // 新增按钮
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      }, // 页码
      originListList: [], // 路线起点列表
      formData: {
        origin: '', // 起点
        lineOperationList: [
          {
            line: '',
            priceSpread: '',
          },
        ], // 线路操作块数组
      }, // 请求参数
      lineOption: {
        height: 'auto',
        calcHeight: 30,
        dialogWidth: 800,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        editBtn: false,
        addBtn: false,
        border: true,
        index: true, // 列编号
        dialogClickModal: false,
        column: [
          {
            label: '线路',
            prop: 'title',
          },
          {
            label: '创建时间',
            prop: 'lastupdateDate',
            slot: true,
          },
        ],
      },
      lineData: [], // 页面数据
      openType: 'add',
    };
  },

  created() {
    this.lineLoad();
    this.getOriginListDatas();
  },
  mounted() { },
  methods: {
    moment,
    // 获取路线起点列表
    getOriginListDatas() {
      const query = {
        type: '1',
      };
      getCompanyList(query).then(res => {
        if (res) {
          this.originListList = res.data.returnObject;
        }
      }).catch(() => { });
    },
    // 增删线路
    lineOperationHandle(index) {
      if (index === 0) {
        this.formData.lineOperationList.push({ line: '', priceSpread: '' });
      } else {
        this.formData.lineOperationList.splice(index, 1);
      }
    },
    // 新增、编辑
    addSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const parmas = {
            origin: this.formData.origin,
            lineOperationList: JSON.stringify(this.formData.lineOperationList),
          }
          addLine(parmas).then(
            () => {
              this.$message({
                type: 'success',
                message: '操作成功!',
              });
              this.addDialogVisible = false;
              this.lineLoad();
            },
            () => {
              this.addDialogVisible = false;
            }
          ).catch(err => {
            this.addDialogVisible = false;
            this.$message.error(err.data.errorMsg);
          });
        }
      });
    },
    closedDialog() {
      this.$refs.formData.resetFields();
    },
    // 新建弹窗、编辑
    handleAdd(row, openType) {
      this.openType = openType;
      if (openType === 'edit') {
        this.$nextTick(() => {
          this.formData.origin = row.title;
          this.formData.lineOperationList = [
            {
              line: '111',
              priceSpread: '111',
            },
            {
              line: '222',
              priceSpread: '222',
            }]
        });
      }
      this.formData.lineOperationList = [{ line: '', priceSpread: '' }]
      this.addDialogVisible = true;
    },
    // 编辑更新操作
    rowUpdate() {
      this.handleAdd();
    },
    // 删除操作
    rowDel(row) {
      this.$confirm('是否确认要删除该线路：深圳皋鹏→深圳康年，删除后，深圳康年将不再收到深圳皋鹏推送的订单?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const query = {
          id: row.id,
        };
        deleteLine(query)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.addDialogVisible = false;
            this.lineLoad();
          })
      }).catch(() => { });
    },

    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },

    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.lineLoad();
    },

    refreshChange() {
      this.page.currentPage = 1;
      this.lineLoad();
    },

    // 初始化页面
    lineLoad() {
      this.pageLoading = true;
      const parmas = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
      };
      getLineList(parmas)
        .then(
          res => {
            this.lineData = res.data.returnObject.list;
            this.pageLoading = false;
          },
          () => {
            this.pageLoading = false;
          }
        )
        .catch(() => { });
    },
  },
};
</script>
<style lang="scss" scoped>
.form-item {
  width: 70%;
}
</style>
