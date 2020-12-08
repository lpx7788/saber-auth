<template>
  <basic-container>
    <div class="info">
      <avue-crud :option="infoOption"
                 :table-loading="infoLoading"
                 :data="InformationListDatas"
                 :page.sync="page"
                 v-model="form"
                 ref="crud"
                 @row-del="deleteIndustry"
                 @current-change="currentChange"
                 @size-change="sizeChange"
                 @selection-change="selectionChange"
                 @on-load="infoOnLoad"
                 @search-change="searchChange"
                 @search-reset="searchReset"
                 @refresh-change="refreshChange">
        <template slot="typeName"
                  slot-scope="{ row }">
          <el-tag>{{ row.typeName }}</el-tag>
        </template>
        <template slot="displayName"
                  slot-scope="{ row }">
          <el-tag :type="row.display ? 'success' : 'danger'">{{
            row.displayName
          }}</el-tag>
        </template>
        <template slot="isTopName"
                  slot-scope="{ row }">
          <el-tag :type="row.isTop ? 'success' : 'danger'">{{
            row.isTopName
          }}</el-tag>
        </template>
        <template slot="consultationTypeSearch">
          <el-select size="small"
                     allow-create
                     clearable
                     filterable
                     placeholder="请选择"
                     @change="consultationTypeChange"
                     v-model="query.consultationType">
            <el-option label="全部"
                       value=""></el-option>
            <el-option label="有色"
                       value="1"></el-option>
            <el-option label="黑色"
                       value="2"></el-option>
            <el-option label="农产品"
                       value="3"></el-option>
            <el-option label="化工"
                       value="4"></el-option>
            <el-option label="其它"
                       value="5"></el-option>
          </el-select>
        </template>
        <template slot="typeNameSearch">
          <el-select size="small"
                     allow-create
                     clearable
                     filterable
                     placeholder="请选择"
                     @change="typeChange"
                     v-model="query.type">
            <el-option label="全部"
                       value=""></el-option>
            <el-option label="要闻"
                       value="1"></el-option>
            <el-option label="关注"
                       value="2"></el-option>
            <el-option label="快讯"
                       value="3"></el-option>
            <el-option label="精选"
                       value="4"></el-option>
          </el-select>
        </template>
        <template slot="sourceSearch">
          <el-select size="small"
                     allow-create
                     clearable
                     filterable
                     placeholder="请选择或者输入"
                     @change="sourceChange"
                     v-model="query.source">
            <el-option v-for="item in consultationSourceSelectArr"
                       :key="item"
                       :label="item"
                       :value="item"></el-option>
          </el-select>
        </template>
        <template slot="displayNameSearch">
          <el-select size="small"
                     allow-create
                     clearable
                     filterable
                     placeholder="请选择"
                     @change="statuschange"
                     v-model="query.display">
            <el-option v-for="item in statusOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </template>
        <template slot="createUserNameSearch">
          <el-select size="small"
                     allow-create
                     clearable
                     filterable
                     placeholder="请选择"
                     @change="editorchange"
                     v-model="query.editor">
            <el-option v-for="item in editorSelectArr"
                       :key="item"
                       :label="item"
                       :value="item"></el-option>
          </el-select>
        </template>
        <template slot="search">
          <datePicker @input="changeDataPicker"
                      :defaultTime="currentTime"
                      ref="datePick"
                      class="mr20"></datePicker>
          <el-input class="searchInput"
                    v-model="query.queryKey"
                    clearable
                    placeholder="请输入关键词"
                    @keyup.enter.native="infoOnLoad"
                    @clear="infoOnLoad"></el-input>
        </template>
        <template slot="menuLeft">
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="small"
                     :disabled="disabledBatchDelete"
                     @click="batchRemove">批量删除</el-button>
        </template>
        <template slot-scope="scope"
                  slot="menu">
          <el-button type="text"
                     size="small"
                     icon="el-icon-edit"
                     class="none-border"
                     @click.stop="editIndustry(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.display === false"
                     type="text"
                     size="small"
                     icon="el-icon-view"
                     class="none-border"
                     @click.stop="showIndustry(scope.row, '1')">显示</el-button>
          <el-button v-if="scope.row.display === true"
                     type="text"
                     size="small"
                     icon="icon-yincang"
                     class="none-border"
                     @click.stop="showIndustry(scope.row, '0')">
            隐藏</el-button>
          <el-button v-if="scope.row.isTop === false"
                     type="text"
                     size="small"
                     icon="el-icon-upload2"
                     class="none-border"
                     @click.stop="toopedIndustry(scope.row, '1')">顶置</el-button>
          <el-button v-if="scope.row.isTop === true"
                     type="text"
                     size="small"
                     icon="el-icon-download"
                     class="none-border"
                     @click.stop="toopedIndustry(scope.row, '0')">取消顶置</el-button>
        </template>

      </avue-crud>
    </div>
  </basic-container>
</template>
<script>
import datePicker from '@/components/date-picker/main';
import {
  getCategoryArr,
  getEditorArr,
  getInformationList,
  deleteInformation,
  toppedInformation,
  displayInformation,
  batchRemoveInformation,
} from '@/api/information';

export default {
  components: {
    datePicker,
  },
  data() {
    return {
      consultationSourceSelectArr: [], // 资讯来源
      editorSelectArr: [], // 编辑者列表
      infoLoading: true, // 表格loading
      currentTime: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      }, // 请求页数相关
      query: {
        queryKey: '',
        source: '',
        display: '',
        editor: '',
        type: '',
        consultationType: '',
      }, // 请求参数
      statusOptions: [
        {
          value: '',
          label: '全部',
        },
        {
          value: '1',
          label: '可见',
        },
        {
          value: '0',
          label: '不可见',
        },
      ], // 资讯状态
      infoOption: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        editBtn: false,
        border: true,
        index: true,
        selectClearBtn: false,
        addBtn: false,
        selection: true,
        menuWidth: 300,
        labelWidth: 100,
        dialogWidth: 880,
        dialogClickModal: false,
        searchMenuSpan: 4,
        menuAlign: 'left',
        column: [
          {
            label: '资讯标题',
            prop: 'title',
            overHidden: true,
          },
          {
            label: '资讯来源',
            prop: 'source',
            search: true,
            searchslot: true,
            searchSpan: 5,
          },
          {
            label: '资讯类型',
            prop: 'typeName',
            slot: true,
            search: true,
            searchslot: true,
            searchSpan: 5,
          },
          {
            label: '资讯状态',
            prop: 'displayName',
            search: true,
            searchslot: true,
            searchSpan: 5,
            slot: true,
          },
          {
            label: '是否顶置',
            prop: 'isTopName',
            slot: true,
          },
          {
            label: '创建时间',
            prop: 'createDate',
            width: '180',
          },
          {
            label: '更新时间',
            prop: 'lastupdatDate',
            width: '180',
          },
          {
            label: '编辑者',
            prop: 'createUserName',
            search: true,
            searchslot: true,
            searchSpan: 5,
          },
          {
            label: '所属分类',
            prop: 'consultationType',
            showColumn: false,
            hide: true,
            search: true,
            searchslot: true,
            searchSpan: 4,
          },
        ],
      }, // 表格配置参数
      InformationListDatas: [], // 表格数据列表
      disabledBatchDelete: true, // 禁用批量删除按钮
    };
  },

  created() {
    this.getIndustryCategory();
    this.getIndustryEditor();
  },
  methods: {
    refreshChange() {
      this.page.currentPage = 1
      this.infoOnLoad()
    },
    searchChange(params, done) {
      this.infoOnLoad()
      done()
    },
    searchReset() {
      this.currentTime = []
      this.query = {
        queryKey: '',
        source: '',
        display: '',
        editor: '',
        type: '',
        consultationType: '',
      }
      this.infoOnLoad()
    },
    editIndustry(row) {
      this.$router.push({
        path: './edit',
        query: {
          id: row.id,
        },
      })
    },
    typeChange(val) {
      this.page.currentPage = 1;
      this.query.type = val;
      this.infoOnLoad();
    },
    consultationTypeChange(val) {
      this.page.currentPage = 1;
      this.query.consultationType = val;
      this.infoOnLoad();
    },
    // 资讯来源关键字获取
    sourceChange(value) {
      this.page.currentPage = 1;
      this.query.source = value;
      this.infoOnLoad();
    },
    // 资讯状态关键字获取
    statuschange(value) {
      this.page.currentPage = 1;
      this.query.display = value;
      this.infoOnLoad();
    },
    // 编辑者关键字获取
    editorchange(value) {
      this.page.currentPage = 1;
      this.query.editor = value;
      this.infoOnLoad();
    },
    // 获取自定义时间戳
    changeDataPicker(value) {
      this.page.currentPage = 1;
      this.query.dateKey = '';
      if (value) {
        this.query.createDateStart = value[0] / 1000;
        this.query.createDateEnd = value[1] / 1000;
        this.currentTime = value
      } else {
        this.query.createDateStart = '';
        this.query.createDateEnd = '';
        this.currentTime = []
      }
      this.infoOnLoad();
    },
    // 批量删除
    batchRemove() {
      const condition = this.idArr !== undefined &&
        this.idArr !== null &&
        this.idArr.length > 0
      if (condition) {
        this.$confirm('确定批量删除资讯?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            batchRemoveInformation(this.idArr).then(() => {
              this.infoLoading = false;
              this.$message({
                type: 'success',
                message: '操作成功!',
              });
              this.infoOnLoad();
            });
          })
          .catch(() => {
            this.infoLoading = false;
          });
      }
    },
    // 全选/反选
    selectionChange(val) {
      this.idArr = val.map((m) => {
        return m.id;
      })
      if (this.idArr.length > 0) {
        this.disabledBatchDelete = false;
      } else {
        this.disabledBatchDelete = true;
      }
    },
    // 删除资讯
    deleteIndustry(row) {
      const idNum = row.id;
      if (idNum !== null && typeof idNum !== 'undefined') {
        this.$confirm('确定删除该资讯?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            const param = {
              id: idNum,
            };
            deleteInformation(param).then(() => {
              this.infoLoading = false;
              this.$message({
                type: 'success',
                message: '操作成功!',
              });
              this.infoOnLoad();
            });
          })
          .catch(() => {
            this.infoLoading = false;
          });
      }
    },
    // 取消/置顶资讯
    toopedIndustry(row, toppedData) {
      let param;
      let msg;
      if (toppedData === '1') {
        msg = '确定置顶该资讯？';
        param = {
          id: row.id,
          topped: toppedData,
          type: row.type,
          category: row.category,
        };
      } else {
        msg = '确定取消置顶该资讯？';
        param = {
          id: row.id,
          topped: '0',
        };
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          toppedInformation(param).then(() => {
            this.infoLoading = false;
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
            this.infoOnLoad();
          });
        })
        .catch(() => {
          this.infoLoading = false;
        });
    },
    // 显示/隐藏资讯
    showIndustry(row, displayData) {
      const param = {
        id: row.id,
        display: displayData,
      };
      this.$confirm(displayData === '1' ? '确定显示该资讯？' : '确定隐藏该资讯?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        displayInformation(param).then(() => {
          this.infoLoading = false;
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          this.infoOnLoad();
        }).catch(() => {
          this.infoLoading = false;
        });
      })
        .catch(() => { });
    },
    // 获取资讯来源
    getIndustryCategory() {
      getCategoryArr().then(res => {
        this.consultationSourceSelectArr = res.data.returnObject;
      }).catch(() => { });
    },
    // 获取编辑者列表
    getIndustryEditor() {
      getEditorArr().then(res => {
        this.editorSelectArr = res.data.returnObject;
      }).catch(() => { });
    },
    // 搜索关键字
    onSearch() {
      this.page.currentPage = 1;
      this.infoOnLoad();
    },
    // 获取当前页面
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    // 每页数据量
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.infoOnLoad();
    },
    // 初始化页面
    infoOnLoad() {
      this.infoLoading = true;
      const query = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
        ...this.query,
      };
      getInformationList(query).then(
        res => {
          const resData = res.data.returnObject;
          this.page.total = resData.total;
          this.InformationListDatas = resData.list;
          this.infoLoading = false;
        },
        () => {
          this.infoLoading = false;
        }
      ).catch(() => { });
    },
  },
};
</script>
<style lang="scss">
.info {
  .inputItem {
    display: inline-block;
  }
  .avue-crud__menu {
    min-height: 0px !important;
  }
}
</style>
