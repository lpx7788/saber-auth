<!--商品属性页面-->
<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page.sync="page"
               :permission="permissionList"
               :before-open="beforeOpen"
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
                slot="category">
        {{ row.value }}
      </template>
    </avue-crud>
  </basic-container>
</template>
<script>
import { getList, getTypeList, add, update, remove } from '@/api/dataCenter/attribute';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      form: {},
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      selectionList: [],
      typeList: [],
      option: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        delBtn: false, // 行内删除
        addBtn: false, // 新增
        // editBtn:false, // 新增
        selection: false, // 去除选择
        index: true,
        // viewBtn: true,
        // selection: true,
        dialogClickModal: false,
        column: [
          {
            label: '编号',
            prop: 'code',
            search: true,
            rules: [{
              required: true,
              message: '请输入编号',
              trigger: 'blur',
            }],
          },
          {
            label: '名称',
            prop: 'name',
            search: true,
            rules: [{
              required: true,
              message: '请输入名称',
              trigger: 'blur',
            }],
          },
          {
            label: '属性值',
            prop: 'category',
            type: 'select',
            dicData: [],
            props: {
              label: 'dictValue',
              value: 'dictKey',
            },
            dataType: 'number',
            slot: true,
            search: true,
            rules: [{
              required: true,
              message: '请选择属性值',
              trigger: 'blur',
            }],
          },
          {
            label: '属性排序',
            prop: 'sort',
            type: 'number',
            rules: [{
              required: true,
              message: '请输入属性排序',
              trigger: 'blur',
            }],
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
  created() {
    // 获取商品类型
    this.onLoadTypeList(this.page)
  },
  methods: {
    onLoadTypeList(page) {
      const id = '1123598814738777240'
      getTypeList(
        page.currentPage,
        page.pageSize,
        id,
      ).then(res => {
        const returnData = res.data.data.records;
        const column = this.findObject(this.option.column, 'category');
        column.dicData = returnData
        this.typeList = returnData
      }).catch(() => { });
    },

    // 新增
    rowSave(row, done, loading) {
      add(row).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
        done();
      }, () => {
        loading();
      }).catch(() => { });
    },
    // 编辑
    rowUpdate(row, index, done, loading) {
      update(row).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
        done();
      }, () => {
        loading();
      }).catch(() => { });
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
        }).catch(e => e);
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
        }).catch(e => e);
    },
    beforeOpen(done, type) {
      if (['edit', 'view'].includes(type)) {
        //   getDetail(this.form.id).then(res => {
        //     this.form = res.data.data;
        //   }).catch(() => {});
      }

      done();
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
        paramsTotal = JSON.stringify(paramsTotal).replace(/category/g, 'code_equal');
        paramsTotal = JSON.parse(paramsTotal);
      }
      getList(page.currentPage, page.pageSize, paramsTotal).then(res => {
        const returnData = res.data.data;
        this.page.total = returnData.total;
        this.data = returnData.records;
        this.loading = false;
        this.selectionClear();
      }).catch(() => { });
    },
  },
};
</script>

<style>
</style>
