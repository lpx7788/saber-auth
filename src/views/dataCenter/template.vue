<!--模板管理页面-->
<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page.sync="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               :before-close="beforeClose"
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
      <template slot-scope="{}"
                slot="categoryCodeSearch">
        <categoryCascader isClearable
                          v-model="categoryCode"
                          @input="categoryCascaderSearchChange" />
      </template>
      <!-- <template slot="search" slot-scope="{row,size}">
        <el-input
          class="searchKey"
          v-model="searchText"
          clearable
          placeholder="请输入企业名称/简称搜索"
          @keyup.enter.native="queryJoinList"
          @clear="queryJoinList"
        ></el-input>
      </template>-->
      <template slot-scope="{ row }"
                slot="category">
        <el-tag>{{ row.categoryName }}</el-tag>
      </template>
      <template slot-scope="{ row }"
                slot="createTime">
        <span>{{ row.createTime.split("T").join(" ") }}</span>
      </template>
      <template slot-scope="{ row }"
                slot="updateTime">
        <span>{{ row.updateTime.split("T").join(" ") }}</span>
      </template>
      <template slot-scope="{ row }"
                slot="priceType">{{
        operatorSymbol(row.priceType.split(","))
      }}</template>
      <template slot-scope=""
                slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   @click.stop="handleAdd('', 'add')">新增</el-button>
      </template>
      <template slot-scope="scope"
                slot="menu">
        <el-button type="text"
                   icon="el-icon-view"
                   size="small"
                   @click="handleAdd(scope.row, 'view')">查看</el-button>
        <el-button type="text"
                   icon="el-icon-edit"
                   size="small"
                   @click="handleAdd(scope.row, 'edit')">编辑</el-button>
      </template>
    </avue-crud>
    <!-- 新增或者编辑弹窗-->
    <el-drawer class="tempplate-drawer"
               :title="
        openType === 'edit' ? (openType === 'view' ? '查看' : '编辑') : '新增'
      "
               :visible.sync="addDialogVisible"
               :direction="direction"
               @closed="closedDrawer"
               :append-to-body="true"
               size="800px">
      <el-form class="template-drawer"
               :model="formData"
               ref="formData"
               :rules="rules"
               label-width="auto">
        <el-row>
          <el-form-item label="模板名称："
                        prop="templateName"
                        :rules="{
              required: true,
              message: '请输入模板名称',
              trigger: 'change',
            }">
            <span v-if="openType === 'view'">{{
              formData.templateName ? formData.templateName : "-"
            }}</span>
            <el-input v-else
                      class="form-item"
                      v-model="formData.templateName"
                      placeholder="请输入模板名称"></el-input>
          </el-form-item>
          <el-form-item label="模板类型："
                        prop="templateType"
                        :rules="{
              required: true,
              message: '请输入模板类型',
              trigger: 'change',
            }">
            <span v-if="openType === 'view'">{{
              formData.templateType === 1 ? "私有" : "公共"
            }}</span>
            <el-select v-else
                       v-model="formData.templateType"
                       class="form-item"
                       default-first-option
                       clearable
                       filterable
                       placeholder="请选择模板类型">
              <el-option v-for="(item, index) in templateTypeDicData"
                         :label="item.label"
                         :value="item.value"
                         :key="index">
                <span>{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模板状态："
                        prop="status"
                        :rules="{
              required: true,
              message: '请选择模板状态',
              trigger: 'change',
            }">
            <span v-if="openType === 'view'">{{
              formData.status === 1 ? "删除" : "正常"
            }}</span>
            <el-select v-else
                       v-model="formData.status"
                       class="form-item"
                       default-first-option
                       clearable
                       filterable
                       placeholder="请选择模板状态">
              <el-option v-for="(item, index) in statusDicData"
                         :label="item.label"
                         :value="item.value"
                         :key="index">
                <span>{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格类型："
                        prop="priceType"
                        :rules="{
              required: true,
              message: '请选择价格类型',
              trigger: 'change',
            }">
            <span v-if="openType === 'view'">{{
              operatorSymbol(formData.priceType)
            }}</span>
            <el-select v-else
                       v-model="formData.priceType"
                       default-first-option
                       clearable
                       filterable
                       multiple="true"
                       placeholder="请选择价格类型"
                       class="form-item">
              <el-option v-for="(item, index) in priceTypeDicData"
                         :label="item.label"
                         :value="item.value"
                         :key="index">
                <span>{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="formData.templateType === 1"
                        label="企业名称："
                        prop="companyList"
                        :rules="{
              required: true,
              message: '请输入企业名称',
              trigger: 'change',
            }">
            <span v-if="openType === 'view'">{{
              this.companyNameList ? this.companyNameList : "-"
            }}</span>
            <el-select v-else
                       class="form-item"
                       v-model="formData.companyList"
                       multiple
                       default-first-option
                       clearable
                       filterable
                       placeholder="请输入或者选择企业名称">
              <el-option v-for="item in companyList.buyer"
                         :key="item.companyCode"
                         :label="item.companyName"
                         :value="item.companyCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品品种："
                        prop="categoryCode"
                        :rules="{
              required: true,
              validator: categoryCodeValidator,
              trigger: 'change',
            }">
            <span v-if="openType === 'view'">{{
              this.categoryNameList ? this.categoryNameList : "-"
            }}</span>
            <categoryCascader v-else
                              :width="100"
                              class="form-item"
                              isClearable
                              :isMultiple="true"
                              v-model="categoryCodeList"
                              @input="categoryCascaderChange" />
          </el-form-item>
          <el-form-item ref="clearValidate"
                        class="file-input"
                        label="导入模板："
                        prop="file"
                        :rules="{
              required: true,
              validator: templateFile,
              trigger: 'change',
            }">
            <div>
              <input class="none"
                     type="file"
                     id="files"
                     ref="filesInputRef"
                     name="files"
                     accept=".pdf, .ppt, .xls, .xlsx, .doc, .docx"
                     placeholder="file"
                     @change="tirggerFile($event)" />
              <el-button class="input-button-btn inline-b"
                         v-if="openType !== 'view'"
                         type="primary"
                         plain
                         @click="$refs.filesInputRef.click()">+ 点击上传</el-button>

              <span class="input-button-text">{{
                this.formData.file
                  ? this.formData.file.name
                    ? this.formData.file.name
                    : ""
                  : this.editfile
                  ? editfile
                  : "请上传模板文档"
              }}</span>
            </div>
          </el-form-item>
          <el-form-item label="合同订单sql："
                        prop="orderSql"
                        :rules="{
              required: true,
              message: '请输入合同订单sql',
              trigger: 'change',
            }">
            <span v-if="openType === 'view'">{{
              formData.orderSql ? formData.orderSql : "-"
            }}</span>
            <el-input v-else
                      class="form-item"
                      placeholder="请输入合同订单sql"
                      type="textarea"
                      v-model="formData.orderSql"></el-input>
          </el-form-item>

          <el-form-item label="合同体填充sql："
                        prop="contentSql"
                        :rules="{
              required: true,
              message: '请输入合同体填充sql',
              trigger: 'change',
            }">
            <span v-if="openType === 'view'">{{
              formData.contentSql ? formData.contentSql : "-"
            }}</span>
            <el-input v-else
                      class="form-item"
                      placeholder="请输入合同体填充sql"
                      type="textarea"
                      v-model="formData.contentSql"></el-input>
          </el-form-item>

          <el-form-item label="合同基本字段："
                        prop="mainFields"
                        :rules="{
              required: true,
              message: '请输入合同基本字段：',
              trigger: 'change',
            }">
            <span v-if="openType === 'view'">{{
              formData.mainFields ? formData.mainFields : "-"
            }}</span>
            <el-input type="textarea"
                      v-else
                      class="form-item"
                      placeholder="请输入合同基本字段"
                      v-model="formData.mainFields"></el-input>
          </el-form-item>
          <el-form-item label="折扣列下标："
                        prop="discountRowNum"
                        :rules="{
              required: true,
              message: '请输入折扣列下标：',
              trigger: 'change',
            }">
            <span v-if="openType === 'view'">{{
              formData.discountRowNum ? formData.discountRowNum : "-"
            }}</span>
            <el-input v-else
                      type="number"
                      class="form-item"
                      placeholder="请输入折扣列下标"
                      v-model="formData.discountRowNum"></el-input>
          </el-form-item>
          <el-form-item label="价格占位符："
                        prop="priceFields"
                        :rules="{
              required: true,
              message: '请输入价格占位符',
              trigger: 'change',
            }">
            <span v-if="openType === 'view'">{{
              formData.priceFields ? formData.priceFields : "-"
            }}</span>
            <el-input v-else
                      class="form-item"
                      placeholder="请输入价格占位符"
                      v-model="formData.priceFields"></el-input>
          </el-form-item>
          <div class="template-content">
            <el-divider content-position="left">模板内容</el-divider>
            <div class="template-content-item"
                 v-for="(item, index) in formData.templateContentList"
                 :key="index">
              <el-form-item :label="'模板标题' + '(' + Number(index + 1) + ')：'"
                            :prop="'templateContentList.' + index + '.title'"
                            :rules="{
                  required: true,
                  message: '请输入模板标题',
                  trigger: 'change',
                }">
                <span v-if="openType === 'view'">{{
                  formData.templateContentList[index].title
                    ? formData.templateContentList[index].title
                    : "-"
                }}</span>
                <el-input v-else
                          class="form-item"
                          v-model="formData.templateContentList[index].title"
                          placeholder="请输入模板标题"></el-input>
                <i v-if="openType !== 'view'"
                   class="ml10 pointer"
                   :class="
                    index === 0
                      ? 'mainColor el-icon-circle-plus-outline'
                      : 'cRed el-icon-remove-outline'
                  "
                   @click="templateContentHandle(index)"></i>
              </el-form-item>
              <el-form-item label="模板内容："
                            :prop="'templateContentList.' + index + '.paragraph'"
                            :rules="{
                  required: true,
                  message: '请输入模板内容',
                  trigger: 'change',
                }">
                <span v-if="openType === 'view'">{{
                  formData.templateContentList[index].paragraph
                    ? formData.templateContentList[index].paragraph
                    : "-"
                }}</span>
                <el-input v-else
                          class="form-item"
                          type="textarea"
                          v-model="formData.templateContentList[index].paragraph"
                          placeholder="请输入模板内容"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-row>
      </el-form>
      <div class="drawer-footer center">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary"
                   @click="addSubmit('formData')">提 交</el-button>
      </div>
    </el-drawer>
  </basic-container>
</template>
<script>
import { remove, add, update } from '@/api/dataCenter/template';
import { mapGetters } from 'vuex';
import { getCompanyList } from '@/api/order/index';
import categoryCascader from '@/components/category-cascader';
import { findCategoryParent } from '@/util/util';

export default {
  components: {
    categoryCascader,
  },
  data() {
    const categoryCodeValidators = (rule, value, callback) => {
      if (this.categoryCodeList === []) {
        callback(new Error('请导选择商品品种'));
      } else {
        callback();
      }
    };
    const templateFiles = (rule, value, callback) => {
      if (this.formData.file === '' && this.editfile === '') {
        callback(new Error('请导入模板'));
      } else {
        callback();
      }
    };
    const templateTypeDicDatas = [
      {
        label: '公共',
        value: 0,
      },
      {
        label: '私有',
        value: 1,
      },
    ];
    const statusDicDatas = [
      {
        label: '正常',
        value: 0,
      },
      {
        label: '删除',
        value: 1,
      },
    ];
    const priceTypeDicDatas = [
      {
        label: '点价',
        value: '1',
      },
      {
        label: '确定价',
        value: '2',
      },
      {
        label: '延期点价',
        value: '3',
      },
    ];

    return {
      categoryCodeValidator: categoryCodeValidators,
      templateFile: templateFiles,
      templateTypeDicData: templateTypeDicDatas,
      statusDicData: statusDicDatas,
      priceTypeDicData: priceTypeDicDatas,
      form: {},
      query: {},
      // loading: true,
      loading: false,
      openType: 'add', // 打开方式
      addDialogVisible: false,
      categoryCodeList: [], // 商品品种code名称列表
      categoryNameList: [], // 商品品种名称列表
      companyNameList: [], // 公司名称列表
      editfile: '', // 导入文件路径
      categoryTree: [], // 商品品种树
      formData: {
        file: '', // 模板文件
        categoryCode: '', // 商品code
        templateName: '', // 模板名称
        templateType: '', // 模板类型
        status: '', // 模板状态
        priceType: [], // 价格类型
        priceFields: '', // 价格
        orderSql: '', // 合计列sql
        contentSql: '', // 合同基本
        discountRowNum: '', // 折扣列下标
        mainFields: '', // 合同基本字段
        companyList: [],
        templateContentList: [
          {
            title: '',
            paragraph: '',
          },
        ], // 模板内容
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      companyList: [], // 公司列表
      selectionList: [],
      option: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        searchShow: true,
        searchMenuSpan: 4,
        border: true,
        index: true,
        viewBtn: false,
        editBtn: false,
        addBtn: false,
        dialogClickModal: false,
        column: [
          {
            label: '模板名称',
            prop: 'templateName',
          },
          {
            label: '模板类型',
            prop: 'templateType',
            dicData: templateTypeDicDatas,
          },
          {
            label: '商品品种',
            prop: 'categoryCode',
            search: true,
            searchSpan: 4,
            searchslot: true,
            slot: true,
            hide: true,
            editDisplay: false,
            viewDisplay: false,
            addDisplay: false,
          },
          {
            label: '模板状态',
            prop: 'status',
            dicData: statusDicDatas,
          },
          {
            label: '价格类型',
            prop: 'priceType',
            type: 'select',
            slot: true,
            dicData: priceTypeDicDatas,
            overHidden: true,
            search: true,
            searchSpan: 4,
          },

          {
            label: '创建日期',
            prop: 'createTime',
            editDisplay: false,
            viewDisplay: false,
            addDisplay: false,
            slot: true,
          },
          {
            label: '修改日期',
            prop: 'updateTime',
            editDisplay: false,
            viewDisplay: false,
            addDisplay: false,
            slot: true,
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
        //     addBtn: this.vaildData(this.permission.post_add, false),
        //     viewBtn: this.vaildData(this.permission.post_view, false),
        //     delBtn: this.vaildData(this.permission.post_delete, false),
        //     editBtn: this.vaildData(this.permission.post_edit, false),
      };
    },
  },
  mounted() {
    this.getCategoryTree();
    this.getCompanyDatas();
  },
  methods: {
    // 获取搜索时商品品种
    categoryCascaderSearchChange(val) {
      this.categoryCode = val[1]
    },
    // 获取商品品种数据
    getCategoryTree() {
      this.$store.dispatch('QueryCategoryTree').then((res) => {
        this.categoryTree = res;
      });
    },
    // 处理价格类型
    operatorSymbol(ele) {
      const arr = ele;
      const newArr = [];
      arr.forEach((item) => {
        let itemData = item
        if (itemData === '1') {
          itemData = '点价';
        } else if (itemData === '2') {
          itemData = '确定价';
        } else {
          itemData = '延期点价';
        }
        newArr.push(itemData);
      });
      return newArr.join(' , ');
    },
    // 获取模板文件
    tirggerFile(event) {
      if (event.target.files[0]) {
        this.formData.file = '';
        this.formData.file = event.target.files[0];
        this.$refs.clearValidate.clearValidate();
        this.editfile = '';
      }
    },
    // 获取商品品种(新增窗口多选)
    categoryCascaderChange(val) {
      this.formData.categoryCode = JSON.stringify(val);
      this.categoryCodeList = val;
    },
    // 新增、编辑提交
    addSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const companyCode = this.formData.companyList.join(',');
          const priceType = this.formData.priceType.join(',');
          const templateContent = JSON.stringify(
            this.formData.templateContentList
          );
          const categoryCode = JSON.stringify(this.categoryCodeList);
          const formData = new FormData();
          formData.append('categoryCode', categoryCode);
          formData.append('templateName', this.formData.templateName);
          formData.append('templateType', this.formData.templateType);
          formData.append('status', this.formData.status);
          formData.append('discountRowNum', this.formData.discountRowNum);
          formData.append('orderSql', this.formData.orderSql);
          formData.append('mainFields', this.formData.mainFields);
          formData.append('contentSql', this.formData.contentSql);
          formData.append('priceFields', this.formData.priceFields);
          formData.append('file', this.formData.file);
          formData.append('templateContent', templateContent);
          formData.append('companyCode', companyCode);
          formData.append('priceType', priceType);
          let requestFun;
          if (this.openType === 'edit') {
            formData.append('id', this.formData.id);
            requestFun = update(formData);
          } else {
            requestFun = add(formData);
          }
          requestFun
            .then(
              () => {
                this.$message({
                  type: 'success',
                  message: '操作成功!',
                });
                this.addDialogVisible = false;
                this.onLoad(this.page);
                this.$refs.formData.clearValidate();
              },
              () => {
                this.addDialogVisible = false;
              }
            )
            .catch(() => {
              this.addDialogVisible = false;
            });
        }
      });
    },
    // 增删模板内容
    templateContentHandle(index) {
      if (index === 0) {
        this.formData.templateContentList.push({ title: '', paragraph: '' });
      } else {
        this.formData.templateContentList.splice(index, 1);
      }
    },
    // 获取公司名称
    getCompanyName(companyArr) {
      const arr = companyArr.split(',');
      const nameArr = [];
      this.companyList.buyer.forEach((item) => {
        arr.forEach((ele) => {
          if (ele === item.companyCode) {
            nameArr.push(item.companyName);
          }
        });
      });
      this.companyNameList = nameArr.join(' , ');
    },
    // 获取公司列表
    getCompanyDatas() {
      const query = {
        type: '1',
      };
      getCompanyList(query)
        .then((res) => {
          if (res) {
            this.companyList = res.data.returnObject;
          }
        })
        .catch(() => { });
    },
    // 新建弹窗、编辑弹窗
    handleAdd(row, openType) {
      this.openType = openType;
      if (openType === 'add') {
        this.$nextTick(() => {
          if (this.$refs.formData) {
            this.$refs.formData.resetFields();
            this.formData.companyList = [];
          }
        });
      }
      if (openType === 'edit' || openType === 'view') {
        this.$nextTick(() => {
          Object.assign(this.formData, row);
          this.formData.templateContentList = JSON.parse(
            this.formData.templateContent
          );
          this.formData.companyList = row.companyCode
            ? row.companyCode.split(',')
            : [];
          this.formData.priceType = row.priceType
            ? row.priceType.split(',')
            : [];
          this.editfile = row.ossFileName;
          this.getCompanyName(this.formData.companyCode);
          if (row.childCategoryCode && row.childCategoryCode !== '') {
            const categoryCodeList = [];
            const categoryNameList = [];
            const arr = row.childCategoryCode.split(',');
            arr.forEach((item) => {
              const name = findCategoryParent(
                this.categoryTree,
                'categoryCode',
                item,
                'categoryName'
              );
              if (name) {
                categoryNameList.push(name[1]);
              }

              categoryCodeList.push(
                findCategoryParent(this.categoryTree, 'categoryCode', item)
              );
            });
            this.categoryCodeList = categoryCodeList;
            this.categoryNameList = categoryNameList.join(',');
          }
        });
      }
      this.addDialogVisible = true;
    },
    // 删除操作
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
        .catch((e) => e);
    },
    beforeClose(done) {
      this.$nextTick(() => {
        this.$refs.filesInputRef.resetFields();
      });
      done();
    },
    beforeOpen(done) {
      done();
    },
    searchReset() {
      this.query = {};
      this.categoryCode = '';
      this.onLoad(this.page);
    },
    // 搜索
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      const paramsData = Object.assign(params, { categoryCode: this.categoryCode });
      this.onLoad(this.page, paramsData);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
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
    // 获取页面数据
    //  onLoad(page, params = {}) {
    onLoad() {
      // this.loading = true;

      // getList(
      //   page.currentPage,
      //   page.pageSize,
      //   Object.assign(params, this.query)
      // )
      //   .then((res) => {
      //     const returnData = res.data.data;
      //     this.page.total = returnData.total;
      //     this.data = returnData.records;
      //     this.loading = false;
      //     this.selectionClear();
      //   })
      //   .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.input-button-text {
  color: #848282;
}
.input-button-btn {
  margin-right: 20px;
}
.form-item-file {
  /deep/input {
    border: none !important;
    line-height: revert;
  }
}
.tempplate-drawer {
  .drawer-footer {
    margin: 10px auto 30px;
  }
  .el-drawer__header {
    margin-bottom: 0 !important;
  }
}
.template-content {
  margin-top: 30px;
  .template-content-item {
    margin-top: 10px;
  }
  .el-divider__text {
    color: #b2b3b6;
  }
}
.contract-base {
  .el-divider__text {
    color: #b2b3b6;
  }
  margin-top: 30px;
  p {
    span {
      color: #606266;
      width: 70px;
      text-align: right;
      display: inline-block;
    }
  }
}
.form-item {
  width: 90%;
}
.form-item-file {
  .el-input__inner {
    border: none !important;
  }
}
.form-item-in {
  width: 80%;
}
.template-drawer {
  padding: 0 20px;
}
.searchKey {
  padding: 0 20px;
  width: 300px;
}
</style>
