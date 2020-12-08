<template>
  <el-row class="dict-page">
    <el-col :span="12">
      <basic-container>
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>字典列表</span>
          </div>
          <div class="clearfix">
            <avue-crud :option="optionParents"
                       :table-loading="loading"
                       :data="dataParent"
                       :page="pageParent"
                       ref="crud"
                       v-model="formParent"
                       :permission="permissionList"
                       :before-open="beforeOpen"
                       @row-del="rowDel"
                       @row-update="rowUpdate"
                       @row-save="rowSave"
                       @row-click="handleRowClick"
                       @search-change="searchChange"
                       @search-reset="searchReset"
                       @selection-change="selectionChange"
                       @current-change="currentChange"
                       @size-change="sizeChange"
                       @refresh-change="refreshChange"
                       @on-load="onLoadParent">
              <template slot="menuLeft">
                <el-button type="danger"
                           size="small"
                           icon="el-icon-delete"
                           v-if="permission.dict_delete"
                           plain
                           @click="handleDelete">删 除
                </el-button>
              </template>
              <template slot-scope="{ row }"
                        slot="isSealed">
                <el-tag>{{ row.isSealed === 0 ? "否" : "是" }}</el-tag>
              </template>
            </avue-crud>
          </div>
        </el-card>
      </basic-container>
    </el-col>
    <el-col :span="12">
      <basic-container>
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            [ <span class="mainColor">{{ dictValue }}</span> ] 字典详情
          </div>
          <div class="clearfix">
            <avue-crud :option="optionChilsd"
                       :table-loading="loadingChild"
                       :data="dataChild"
                       ref="crudChild"
                       v-model="formChild"
                       :permission="permissionList"
                       :before-open="beforeOpenChild"
                       :before-close="beforeCloseChild"
                       @row-del="rowDelChild"
                       @row-update="rowUpdateChild"
                       @row-save="rowSaveChild"
                       @search-change="searchChangeChild"
                       @search-reset="searchResetChild"
                       @selection-change="selectionChangeChild"
                       @current-change="currentChangeChild"
                       @size-change="sizeChangeChild"
                       @refresh-change="refreshChangeChild"
                       @on-load="onLoadChild">
              <template slot="menuLeft">
                <el-button type="danger"
                           size="small"
                           icon="el-icon-delete"
                           v-if="permission.dict_delete"
                           plain
                           @click="handleDelete">删 除
                </el-button>
              </template>
              <template slot-scope="scope"
                        slot="menu">
                <el-button type="text"
                           icon="el-icon-circle-plus-outline"
                           size="small"
                           @click.stop="handleAdd(scope.row, scope.index)"
                           v-if="userInfo.roleName.includes('admin')">新增子项
                </el-button>
              </template>
              <template slot-scope="{ row }"
                        slot="isSealed">
                <el-tag>{{ row.isSealed === 0 ? "否" : "是" }}</el-tag>
              </template>
            </avue-crud>
          </div>
        </el-card>
      </basic-container>
    </el-col>
  </el-row>
</template>
<script>
import {
  getParentList,
  getChildList,
  remove,
  update,
  add,
  getDict,
  getDictTree,
} from '@/api/system/dict';
import { optionParent, optionChild } from '@/const/system/dict';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      dictValue: '暂无',
      parentId: -1,
      formParent: {},
      formChild: {},
      selectionList: [],
      query: {},
      loading: true,
      loadingChild: true,
      pageParent: {
        pageSize: 10,
        pageSizes: [10, 30, 50, 100, 200],
        currentPage: 1,
        total: 0,
      },
      pageChild: {
        pageSize: 10,
        pageSizes: [10, 30, 50, 100, 200],
        currentPage: 1,
        total: 0,
      },
      dataParent: [],
      dataChild: [],
      optionParents: optionParent,
      optionChilds: optionChild,
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'permission']),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.dict_add, false),
        delBtn: this.vaildData(this.permission.dict_delete, false),
        editBtn: this.vaildData(this.permission.dict_edit, false),
        viewBtn: false,
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
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      getDictTree().then(res => {
        const column = this.findObject(this.optionChilds.column, 'parentId');
        column.dicData = res.data.data;
      });
    },
    handleAdd(row) {
      this.$refs.crudChild.value.parentId = row.id;
      this.$refs.crudChild.option.column.filter(item => {
        const itemData = item
        if (itemData.prop === 'parentId') {
          itemData.value = row.id;
        }
        return true
      });
      this.$refs.crudChild.rowAdd();
    },
    rowSave(row, loading, done) {
      const form = {
        ...row,
        dictKey: -1,
      };
      add(form).then(
        () => {
          loading();
          this.onLoadParent(this.pageParent);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        },
        () => {
          done();
        }
      ).catch(() => { });
    },
    rowUpdate(row, index, loading, done) {
      update(row).then(
        () => {
          loading();
          this.onLoadParent(this.pageParent);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        },
        () => {
          done();
        }
      ).catch(() => { });
    },
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
          this.onLoadParent(this.pageParent);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        }).catch(e => e);
    },
    handleRowClick(row) {
      this.query = {};
      this.parentId = row.id;
      this.dictValue = row.dictValue;
      this.$refs.crudChild.value.code = row.code;
      this.$refs.crudChild.value.parentId = row.id;
      this.$refs.crudChild.option.column.filter(item => {
        const itemData = item
        if (itemData.prop === 'code') {
          itemData.value = row.code;
        }
        if (itemData.prop === 'parentId') {
          itemData.value = row.id;
        }
        return true
      });
      this.onLoadChild(this.pageChild);
    },
    searchReset() {
      this.query = {};
      this.onLoadParent(this.pageParent);
    },
    searchChange(params, done) {
      this.query = params;
      this.pageParent.currentPage = 1;
      this.onLoadParent(this.pageParent, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
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
          this.onLoadParent(this.pageParent);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          this.$refs.crud.toggleSelection();
        }).catch(e => e);
    },
    beforeOpen(done, type) {
      if (['edit', 'view'].includes(type)) {
        getDict(this.formParent.id).then(res => {
          this.formParent = res.data.data;
        }).catch(() => { });
      }
      done();
    },
    currentChange(currentPage) {
      this.pageParent.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.pageParent.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoadParent(this.pageParent, this.query);
    },
    rowSaveChild(row, loading, done) {
      add(row).then(
        () => {
          loading();
          this.onLoadChild(this.pageChild);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        },
        () => {
          done();
        }
      ).catch(() => { });
    },
    rowUpdateChild(row, index, loading, done) {
      update(row).then(
        () => {
          loading();
          this.onLoadChild(this.pageChild);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        },
        () => {
          done();
        }
      ).catch(() => { });
    },
    rowDelChild(row) {
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoadChild(this.pageChild);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        }).catch(e => e);
    },
    searchResetChild() {
      this.query = {};
      this.onLoadChild(this.pageChild);
    },
    searchChangeChild(params, done) {
      this.query = params;
      this.pageChild.currentPage = 1;
      this.onLoadChild(this.pageChild, params);
      done();
    },
    selectionChangeChild(list) {
      this.selectionList = list;
    },
    selectionClearChild() {
      this.selectionList = [];
      this.$refs.crudChild.toggleSelection();
    },
    handleDeleteChild() {
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
          this.onLoadChild(this.pageChild);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          this.$refs.crudChild.toggleSelection();
        }).catch(e => e);
    },
    beforeOpenChild(done, type) {
      if (['add', 'edit'].includes(type)) {
        this.initData();
      }
      if (['edit', 'view'].includes(type)) {
        getDict(this.formChild.id).then(res => {
          this.formChild = res.data.data;
        }).catch(() => { });
      }
      done();
    },
    beforeCloseChild(done) {
      this.$refs.crudChild.value.parentId = this.parentId;
      this.$refs.crudChild.option.column.filter(item => {
        const itemData = item;
        if (itemData.prop === 'parentId') {
          itemData.value = this.parentId;
        }
        return true
      });
      done();
    },
    currentChangeChild(currentPage) {
      this.pageChild.currentPage = currentPage;
    },
    sizeChangeChild(pageSize) {
      this.pageChild.pageSize = pageSize;
    },
    refreshChangeChild() {
      this.onLoadChild(this.pageChild, this.query);
    },
    onLoadParent(page, params = {}) {
      this.loading = true;
      getParentList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const returnData = res.data.data;
        this.pageParent.total = returnData.total;
        this.dataParent = returnData.records;
        this.loading = false;
        this.selectionClear();
      }).catch(() => { });
    },
    onLoadChild(page, params = {}) {
      this.loadingChild = true;
      getChildList(
        page.currentPage,
        page.pageSize,
        this.parentId,
        Object.assign(params, this.query)
      ).then(res => {
        this.dataChild = res.data.data;
        this.loadingChild = false;
        this.selectionClear();
      });
    },
  },
};
</script>
<style lang="scss">
.dict-page {
  .el-input--suffix .el-input__inner {
    padding: 0 6px !important;
  }
  .el-button + .el-button {
    margin-left: 0 !important;
  }
}
</style>
