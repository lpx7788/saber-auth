<!--商品品种页面-->
<template>
  <el-row class="category-page">
    <el-col :span="12">
      <basic-container>
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>商品品种列表</span>
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
            [ <span class="mainColor">{{ categoryName }}</span> ] 商品品种详情
          </div>
          <div class="clearfix">
            <avue-crud :option="optionChilds"
                       :table-loading="loadingChild"
                       :data="dataChild"
                       :page="pageChild"
                       ref="crudChild"
                       v-model="formChild"
                       :permission="permissionList"
                       :before-open="beforeOpenChild"
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
  getCategoryTree,
} from '@/api/dataCenter/category';
import { optionParent, optionChild } from '@/const/dataCenter/category';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      categoryName: '暂无',
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
    ...mapGetters(['permission']),
    permissionList() {
      return {
        // addBtn: this.vaildData(this.permission.dict_add, false),
        // delBtn: this.vaildData(this.permission.dict_delete, false),
        // editBtn: this.vaildData(this.permission.dict_edit, false),
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
    // 编辑（上级品种下拉选择树）
    getCategoryTree().then(res => {
      const column = this.findObject(this.optionChilds.column, 'parentId');
      column.dicData = res.data.data;
    }).catch(() => { });
  },
  methods: {

    // 新增
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
    // 编辑更新
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
          this.onLoadParent(this.pageParent);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        }).catch(e => e);
    },
    // 左侧表格点击操作
    handleRowClick(row) {
      this.parentId = row.id;
      this.categoryName = row.categoryName;
      this.$refs.crudChild.value.code = row.code;
      this.$refs.crudChild.value.parentId = row.id;
      this.$refs.crudChild.option.column.filter(item => {
        const itemData = item
        if (itemData.prop === 'code') {
          itemData.value = row.code;
        }
        if (item.prop === 'parentId') {
          itemData.value = row.id;
        }
        return true
      });
      this.onLoadChild(this.pageChild);
    },
    // 搜索重置
    searchReset() {
      this.query = {};
      this.onLoadParent(this.pageParent);
    },
    // 搜索
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
        //   getCategory(this.formParent.id).then(res => {
        //     this.formParent = res.data.data;
        //   }).catch(() => {});
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
    // 新增详情
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
    // 编辑更新详情
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
    // 详情搜索重置
    searchResetChild() {
      this.query = {};
      this.onLoadChild(this.pageChild);
    },
    // 详情搜索
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
    // 详情批量删除
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
      if (['edit', 'view'].includes(type)) {
        //   getCategory(this.formChild.id).then(res => {
        //     this.formChild = res.data.data;
        //   }).catch(() => { });
      }
      done();
    },
    currentChangeChild(currentPage) {
      this.pageChild.currentPage = currentPage;
    },
    sizeChangeChild(pageSize) {
      this.pageChild.pageSize = pageSize;
    },
    // 刷新商品品种详情
    refreshChangeChild() {
      this.onLoadChild(this.pageChild, this.query);
    },
    // 商品品种列表
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
    // 商品品种详情信息
    onLoadChild(page, params = {}) {
      this.loadingChild = true;
      getChildList(
        page.currentPage,
        page.pageSize,
        this.parentId,
        Object.assign(params, this.query)
      ).then(res => {
        const returnData = res.data.data;
        this.dataChild = returnData.records;
        this.loadingChild = false;
        this.selectionClear();
      }).catch(() => { });
    },
  },
};
</script>
<style lang="scss">
.category-page {
  .el-input--suffix .el-input__inner {
    padding: 0 6px !important;
  }
  .el-button + .el-button {
    margin-left: 0 !important;
  }
}
</style>
