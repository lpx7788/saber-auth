<!--商城仓库页面-->
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
      <template slot-scope="{ }"
                slot="provinceSearch">
        <provinceCityCascader isClearable
                              @input="provinceCityChange" />
      </template>
      <template slot-scope="{ row }"
                slot="troc">
        <div v-for="item in row.fees"
             :key="item.id">
          <span v-if="item.feeType === 2">{{ item.categoryName }} : {{ item.fee }}元/吨</span>
        </div>
      </template>
      <template slot-scope="{ row }"
                slot="famc">
        <div v-for="item in row.fees"
             :key="item.id">
          <span v-if="item.feeType === 1">{{ item.categoryName }} : {{ item.fee }}元/吨</span>
        </div>
      </template>
      <template slot-scope="{ row }"
                slot="province">
        <span>{{ row.mergerName }}</span>
      </template>
      <template slot-scope="{ row }"
                slot="areaCode">
        <span>{{ row.areaName }}</span>
      </template>
      <template slot="search"
                slot-scope="{ }">
        <el-input class="searchInput"
                  v-model="otherParmas.searchValue"
                  clearable
                  placeholder="请输入仓库全称或仓库简称等关键词"></el-input>
      </template>
      <template slot-scope="{ row }"
                slot="area">{{ row.value }}</template>
    </avue-crud>
  </basic-container>
</template>
<script>
import {
  getList,
  getAreaList,
  add,
  update,
  remove,
} from '@/api/dataCenter/warehouse';
import { mapGetters } from 'vuex';
import provinceCityCascader from '@/components/province-city-cascader';

export default {
  components: {
    provinceCityCascader,
  },
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
      otherParmas: {
        city: '',
        province: '',
        searchValue: '',
      },
      selectionList: [],
      typeList: [],
      option: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        searchShow: true,
        searchMenuSpan: 4,
        border: true,
        delBtn: false, // 行内删除
        addBtn: false, // 新增
        editBtn: false, // 新增
        selection: false, // 去除选择
        index: true,
        // viewBtn: true,
        // selection: true,
        menu: false,
        dialogClickModal: false,
        column: [
          {
            label: '仓库编号',
            prop: 'code',
            search: true,
            searchSpan: 4,
          },
          {
            label: '仓库全称',
            prop: 'name',
          },
          {
            label: '仓库简称',
            prop: 'shortName',
          },
          {
            label: '转货权',
            prop: 'troc',
            slot: true,
          },
          {
            label: '运杂费',
            prop: 'famc',
            slot: true,
          },
          {
            label: '所在地区',
            prop: 'areaCode',
            type: 'select',
            dicData: [],
            props: {
              label: 'dictValue',
              value: 'dictKey',
            },
            dataType: 'number',
            search: true,
            searchSpan: 4,
            slot: true,
            width: 120,
          },
          {
            label: '所在省市',
            prop: 'province',
            search: true,
            searchSpan: 4,
            searchslot: true,
            slot: true,
          },
          {
            label: '具体地址',
            prop: 'address',
            overHidden: true,
          },
          {
            label: '创建时间',
            prop: 'createTime',
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
    this.onLoadAreaList(this.page);
  },
  methods: {
    // 获取仓库地区
    onLoadAreaList(page) {
      const id = '1123598814738777249';
      getAreaList(page.currentPage, page.pageSize, id)
        .then(res => {
          const returnData = res.data.data.records;
          const column = this.findObject(this.option.column, 'areaCode');
          column.dicData = returnData;
          this.typeList = returnData;
        })
        .catch(() => { });
    },
    // 省市下拉操作
    provinceCityChange(value) {
      if (value.length !== 0) {
        this.otherParmas.province = value[0];
        this.otherParmas.city = value[1];
      } else {
        this.otherParmas.province = '';
        this.otherParmas.city = '';
      }
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
      const paramsTotal = Object.assign(params, this.query, this.otherParmas);
      // if (paramsTotal.length !== 0) {
      //   paramsTotal = JSON.stringify(paramsTotal).replace(/area/g, "areaCode");
      //   paramsTotal = JSON.parse(paramsTotal);
      // }
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

<style>
</style>
