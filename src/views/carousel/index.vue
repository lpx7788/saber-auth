<template>
  <basic-container>
    <!-- 网页轮播图数据 -->
    <div class="advertisement-page">
      <el-tabs type="card"
               v-model="tabsIdx"
               @tab-click="changeTabs">
        <el-tab-pane label="手机端"
                     name="1"> </el-tab-pane>
        <el-tab-pane label="网页端"
                     name="2"> </el-tab-pane>
      </el-tabs>
      <avue-crud :option="advertisementOption"
                 :table-loading="pageLoading"
                 :data="tableDatas"
                 :page.sync="page"
                 ref="crud"
                 @row-del="advertisementRowDel"
                 @on-load="advertisementOnLoad"
                 @refresh-change="refreshChange">
        <template slot="menuLeft">
          <el-button icon="el-icon-plus"
                     type="primary"
                     @click="openAddDialog('add', '')">新增</el-button>
        </template>
        <template slot-scope="scope"
                  slot="menu">
          <el-button type="text"
                     size="small"
                     icon="el-icon-edit"
                     @click="openEditDialog('edit', scope.row)">编辑</el-button>
          <el-popconfirm title="确定移动该轮播吗？"
                         class="ml10"
                         v-if="tableDatas.length > 1 && scope.row.$index !== 0"
                         @onConfirm="moveAdvertistment('1', scope.row.id)">
            <el-button type="text"
                       size="small"
                       slot="reference"
                       icon="el-icon-top">上移</el-button>
          </el-popconfirm>
          <el-popconfirm title="确定移动该轮播吗？"
                         class="ml10"
                         v-if="
              tableDatas.length > 1 &&
              scope.row.$index !== tableDatas.length - 1
            "
                         @onConfirm="moveAdvertistment('2', scope.row.id)">
            <el-button type="text"
                       size="small"
                       slot="reference"
                       icon="el-icon-bottom">下移</el-button>
          </el-popconfirm>
          <el-popconfirm title="确定删除该轮播吗？"
                         class="ml10"
                         @onConfirm="advertisementRowDel(scope.row)">
            <el-button size="small"
                       type="text"
                       slot="reference"
                       icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
        </template>
      </avue-crud>
    </div>
    <!-- 新增/编辑轮播图 -->
    <el-dialog :title="actionType === 'edit' ? '编辑' : '新增'"
               :visible.sync="dialogVisible"
               :append-to-body="true"
               width="40%"
               center
               @opened="openedChange"
               @closed="closedDialog">
      <el-form :model="addForm"
               :rules="addFormRules"
               ref="addForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="标题："
                      prop="title">
          <el-input type="input"
                    size="mini"
                    v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接："
                      prop="outLinkUrl">
          <el-input type="input"
                    size="mini"
                    v-model="addForm.outLinkUrl"></el-input>
        </el-form-item>
        <el-form-item label="显示终端："
                      prop="type">
          <el-radio-group v-model="addForm.type">
            <el-radio :label="'1'">手机</el-radio>
            <el-radio :label="'2'">网页</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="封面类型："
                      prop="coverPicType">
          <el-radio-group v-model="addForm.coverPicType"
                          @change="changeCoverPicType">
            <el-radio :label="'1'">链接</el-radio>
            <el-radio :label="'2'">图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="封面链接："
                      prop="coverPicUrl"
                      ref="coverPicUrl"
                      v-if="addForm.coverPicType === 1">
          <el-input type="input"
                    size="mini"
                    v-model="addForm.coverPicUrl"></el-input>
        </el-form-item>
        <el-form-item label="封面图片："
                      prop="coverPicFile"
                      ref="coverPicFile"
                      v-if="addForm.coverPicType === 2">
          <upload ref="coverImageFile"
                  :clearable="false"
                  :change="changeImage"
                  :height="100"
                  :width="100" />
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleAddAdvertisement"
                   v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>
<script>
import {
  getAdvertisementList,
  deleteAdvertisement,
  moveAdvertisement,
  addAdvertisement,
  editAdvertisement,
} from '@/api/carousel/index';
import upload from '@/components/upload';

export default {
  components: {
    upload,
  },
  data() {
    const verifyCoverPicFile = (rule, value, callback) => {
      if (this.actionType === 'add' && !this.addForm.coverPicFile) {
        callback('请上传封面图片')
      } else {
        callback()
      }
    }
    return {
      tabsIdx: '1',
      pageLoading: true, // 表格loading
      dialogVisible: false, // 新增loading
      actionType: 'add', // 'edit'编辑，'add'新增
      addForm: {
        title: '',
        outLinkUrl: '',
        type: '1',
        coverPicType: '1',
        coverPicUrl: '',
        coverPicFile: null,
      }, // 弹窗参数
      addFormRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            min: 3,
            max: 100,
            message: '长度在 3 到 100 个字符',
            trigger: 'blur',
          },
        ],
        outLinkUrl: [
          { required: true, message: '请输入跳转链接', trigger: 'blur' },
          {
            min: 10,
            max: 255,
            message: '长度在 10 到 255 个字符',
            trigger: 'blur',
          },
        ],
        coverPicUrl: [
          { required: true, message: '请输入封面链接', trigger: 'blur' },
        ],
        coverPicFile: [
          { required: true, validator: verifyCoverPicFile, trigger: 'blur' },
        ],
      }, // 弹窗规则
      advertisementOption: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        border: true,
        index: true,
        viewBtn: false,
        selection: false,
        searchBtn: false,
        addBtn: false,
        editBtn: false,
        delBtn: false,
        align: 'left',
        menuAlign: 'left',
        column: [
          {
            label: '轮播标题',
            prop: 'title',
          },
          {
            label: '跳转连接',
            prop: 'outLinkUrl',
          },
          {
            label: '更新时间',
            prop: 'lastupdateDate',
          },
        ],
      },
      tableDatas: [], // 数据列表
      mobileDatas: [],
      webDatas: [],
    };
  },
  methods: {

    changeCoverPicType(val) {
      // 切换封面类型，清除封面图片和封面链接的校验结果
      if (val === '1') this.$refs.coverPicUrl.clearValidate()
      if (val === '2') this.$refs.coverPicFile.clearValidate()
    },
    changeTabs(tab) {
      if (tab.name === '1') this.tableDatas = this.mobileDatas
      if (tab.name === '2') this.tableDatas = this.webDatas
    },
    refreshChange() {
      this.getAdvertisementList(this.tabsIdx)
    },
    // 删除封面图
    delWebImageFile() {
      this.coverPicFileImage = '';
    },
    // 上传封面图
    changeImage(val) {
      this.addForm.coverPicFile = val
    },
    // 新建、编辑轮播确定按钮
    handleAddAdvertisement() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          const addPostFormData = new FormData();
          addPostFormData.append('adId', this.addForm.id);
          addPostFormData.append('title', this.addForm.title);
          addPostFormData.append('type', this.addForm.type);
          addPostFormData.append('outLinkUrl', this.addForm.outLinkUrl);
          addPostFormData.append('coverPicFile', this.addForm.coverPicFile);
          addPostFormData.append('coverPicUrl', this.addForm.coverPicUrl);
          addPostFormData.append('coverPicType', this.addForm.coverPicType);
          let queryMethods = ''
          if (this.actionType === 'edit') { queryMethods = editAdvertisement }
          if (this.actionType === 'add') { queryMethods = addAdvertisement }
          queryMethods(addPostFormData)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功!',
              });
              this.dialogVisible = false;
              this.advertisementOnLoad();
            },
              () => {
                this.dialogVisible = false;
              }).catch(() => { });
        }
      });
    },
    closedDialog() {
      this.addForm = {
        title: '',
        outLinkUrl: '',
        type: '1',
        coverPicType: '1',
        coverPicUrl: '',
        coverPicFile: null,
      }
    },
    openedChange() {
      this.$nextTick(() => {
        if (this.actionType === 'add' && this.addForm.coverPicType === '2') {
          this.$refs.coverImageFile.setFile('')
          this.$refs.addForm.resetFields();
        } else if (this.actionType !== 'add' && this.addForm.coverPicType === '2') {
          this.$refs.coverImageFile.setFile(this.addForm.coverPicUrl)
        }
      })
    },
    // 添加
    openAddDialog() {
      this.actionType = 'add';
      this.dialogVisible = true;
    },
    // 编辑
    openEditDialog(action, row) {
      this.dialogVisible = true;
      this.actionType = action;
      this.addForm = row;
    },
    // 删除操作
    advertisementRowDel(row) {
      const query = {
        id: row.id,
      };
      deleteAdvertisement(query).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
        this.getAdvertisementList(this.tabsIdx)
      }).catch(err => {
        this.dialogVisible = false;
        this.$message.error(err.data.errorMsg);
      })
    },
    // 移动
    moveAdvertistment(index, ids) {
      const query = {
        id: ids,
        move: index,
      };
      moveAdvertisement(query).then(() => {
        this.$message({
          type: 'success',
          message: '移动成功!',
        });
        this.getAdvertisementList(this.tabsIdx)
      }).catch(() => { })
    },

    getAdvertisementList(types) {
      this.pageLoading = true;
      getAdvertisementList({
        type: types,
      }).then(res => {
        types === '1' ? this.mobileDatas = res.data.returnObject : this.webDatas = res.data.returnObject
        this.tabsIdx === '1' ? this.tableDatas = this.mobileDatas : this.tableDatas = this.webDatas
        this.pageLoading = false
      },
        () => {
          this.pageLoading = false
        }).catch(() => { })
    },
    // 初始化页面
    advertisementOnLoad() {
      this.getAdvertisementList('1')
      this.getAdvertisementList('2')
    },
  },
};
</script>
