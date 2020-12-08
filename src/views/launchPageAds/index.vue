<template>
  <basic-container>
    <avue-crud :option="launchPageAdsOption"
               :table-loading="pageLoading"
               :data="launchPageAdsData"
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
               @on-load="launchPageAdsOnLoad">
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
                slot="advertisingPicture">
        <el-image :src="scope.row.advertisingPicture"
                  :preview-src-list="[scope.row.advertisingPicture]"></el-image>
      </template>
      <template slot-scope="scope"
                slot="advertisingUrl">
        <div>
          {{
            scope.row.advertisingUrl === "null" ? "无" : scope.row.advertisingUrl
          }}
        </div>
      </template>
      <template slot-scope="scope"
                slot="chooseTime">
        <div class="mainColor">
          星期{{
            scope.row.playingWeek
              .replace(/1/g, "一")
              .replace(/2/g, "二")
              .replace(/3/g, "三")
              .replace(/4/g, "四")
              .replace(/5/g, "五")
              .replace(/6/g, "六")
              .replace(/7/g, "日")
          }}
        </div>
        <div>
          {{
            scope.row.chooseTime === "1"
              ? "全天"
              : scope.row.chooseTime === "2"
              ? "09:00 - 21:00"
              : scope.row.chooseTime === "3"
              ? "21：00 - 00：00和00：00 - 09：00"
              : scope.row.specifiedStartTime +
                " - " +
                scope.row.specifiedEndTime
          }}
        </div>
      </template>
      <template slot-scope="scope"
                slot="lastupdateDate">{{
        moment(scope.row.lastupdateDate).format("YYYY-MM-DD HH:mm:ss")
      }}</template>
    </avue-crud>
    <!-- 新增或者编辑弹窗-->
    <el-dialog :title="openType === 'edit' ? '广告编辑' : '广告新建'"
               :append-to-body="true"
               :visible.sync="addDialogVisible"
               width="40%"
               @opened="opendDialog"
               @closed="closedDialog"
               center>
      <el-form :model="formData"
               ref="formData"
               :rules="rules"
               label-width="120px">
        <el-form-item label="广告标题"
                      prop="title">
          <div>
            <el-input class="w80"
                      v-model="formData.title"
                      size="small"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="启动页图片">
          <upload :clearable="false"
                  ref="startImageFile"
                  :deleted="delImageFile"
                  :change="changeImage"
                  :height="100"
                  :width="100" />
        </el-form-item>
        <el-form-item label="H5链接"
                      prop="advertisingUrl">
          <div>
            <el-input class="w80"
                      v-model="formData.advertisingUrl"
                      size="small"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="开始/结束日期"
                      prop="date">
          <el-date-picker class="laun-picker"
                          size="small"
                          v-model="formData.date"
                          value-format="yyyy-MM-dd"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="星期选择"
                      prop="week">
          <el-checkbox-group v-model="formData.week"
                             class="w80">
            <el-checkbox label="1">星期一</el-checkbox>
            <el-checkbox label="2">星期二</el-checkbox>
            <el-checkbox label="3">星期三</el-checkbox>
            <el-checkbox label="4">星期四</el-checkbox>
            <el-checkbox label="5">星期五</el-checkbox>
            <el-checkbox label="6">星期六</el-checkbox>
            <el-checkbox label="7">星期日</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="时段选择"
                      prop="timeType">
          <div>
            <el-select v-model="formData.timeType"
                       size="small"
                       class="w80">
              <el-option label="全天"
                         value="1"></el-option>
              <el-option label="白天（09：00 - 21：00）"
                         value="2"></el-option>
              <el-option label="夜晚（21：00 - 00：00和00：00 - 09：00）"
                         value="3"></el-option>
              <el-option label="指定时段"
                         value="4"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item v-if="formData.timeType === '4'"
                      label="指定时段"
                      prop="appointTime">
          <div class="w80 flex">
            <el-time-select class="mr20"
                            size="small"
                            @change="changeStartTime"
                            placeholder="起始时间"
                            v-model="formData.startTime"
                            :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00',
              }"></el-time-select>
            <el-time-select size="small"
                            :disabled="!formData.startTime"
                            placeholder="结束时间"
                            v-model="formData.endTime"
                            :picker-options="{
                start: '01:00',
                step: '01:00',
                end: '24:00',
                minTime: formData.startTime,
              }"></el-time-select>
          </div>
        </el-form-item>
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
import {
  addLaunchPageAds,
  deleteLaunchPageAds,
  getLaunchPageAdsList,
} from '@/api/launchPageAds/index';
import upload from '@/components/upload';

const moment = require('moment');

export default {
  components: {
    upload,
  },
  data() {
    var coverPicFileImageRule = (rule, value, callback) => {
      if (this.formData.coverPicFileImage) {
        callback();
      } else {
        callback(new Error('请选择广告图片'));
      }
    };
    var appointTimeRule = (rule, value, callback) => {
      if (!this.formData.startTime) {
        callback(new Error('请选择开始时间'));
      } else if (!this.formData.endTime) {
        callback(new Error('请选择结束时间'));
      } else {
        callback();
      }
    };
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
      formData: {
        id: '',
        title: '', // 广告标题
        coverPicFileImageUrl: null,
        coverPicFileImage: null,
        advertisingUrl: null, // h5链接
        date: '',
        week: [],
        timeType: '1', // 时段选择
        startTime: null,
        endTime: null,
        appointTime: [],
      }, // 请求参数
      launchPageAdsOption: {
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
            label: '轮播标题',
            prop: 'title',
          },
          {
            label: '轮播图片',
            prop: 'advertisingPicture',
            slot: true,
            width: 100,
          },
          {
            label: '跳转链接',
            prop: 'advertisingUrl',
            slot: true,
          },
          {
            label: '开始日期',
            prop: 'playingCreatDate',
          },
          {
            label: '结束日期',
            prop: 'playingEndDate',
          },
          {
            label: '出现时段',
            prop: 'chooseTime',
            slot: true,
          },
          {
            label: '最后更新时间',
            prop: 'lastupdateDate',
            width: '180',
            slot: true,
          },
        ],
      },
      rules: {
        title: [
          { required: true, message: '请输入广告标题', trigger: 'change' },
        ],
        coverPicFileImage: [
          { required: true, validator: coverPicFileImageRule },
        ],
        date: [
          { required: true, message: '请选择开始/结束日期', trigger: 'change' },
        ],
        week: [{ required: true, message: '请选择星期', trigger: 'change' }],
        appointTime: [{ required: true, validator: appointTimeRule }],
      },
      launchPageAdsData: [], // 页面数据
      openType: 'add',
    };
  },

  created() {
    this.launchPageAdsOnLoad();
  },
  mounted() { },
  methods: {
    moment,
    // 获取启动页图片路径
    changeImage(val) {
      this.formData.coverPicFileImage = val;
    },
    // 删除启动页图片
    delImageFile() {
      this.formData.coverPicFileImage = '';
    },
    // 新增
    addSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = new FormData();
          formData.append('title', this.formData.title);
          formData.append('advertisingUrl', this.formData.advertisingUrl);
          formData.append('playingTime', this.formData.date.join(','));
          formData.append('playingWeek', this.formData.week.sort().join(','));
          if (this.formData.timeType === '4') {
            formData.append(
              'specifiedTime',
              this.formData.startTime + ',' + this.formData.endTime
            );
          }
          formData.append('chooseTime', this.formData.timeType);
          formData.append(
            'advertisingPicture',
            this.formData.coverPicFileImage
          );
          if (this.openType === 'edit') {
            formData.append('Pid', this.formData.id);
          }
          addLaunchPageAds(formData).then(
            () => {
              this.$message({
                type: 'success',
                message: '操作成功!',
              });
              this.addDialogVisible = false;
              this.launchPageAdsOnLoad();
            },
            () => {
              this.addDialogVisible = false;
            }
          ).catch(() => {
            this.addDialogVisible = false;
          });
        }
      });
    },
    closedDialog() {
      this.$refs.formData.resetFields();
      this.$refs.startImageFile.setFile('');
    },
    opendDialog() {
      this.$nextTick(() => {
        this.$refs.startImageFile.setFile(
          this.openType === 'add' ? '' : this.formData.advertisingPicture
        );
      });
    },
    // 新建弹窗
    handleAdd(row, openType) {
      this.openType = openType;
      if (openType === 'edit') {
        this.$nextTick(() => {
          this.formData.title = row.title;
          this.formData.advertisingUrl =
            row.advertisingUrl === 'null' ? '' : row.advertisingUrl;
          this.formData.timeType = row.chooseTime;
          this.formData.id = row.id;
          this.formData.week = row.playingWeek.split(',');
          this.formData.date = [row.playingCreatDate, row.playingEndDate];
          if (row.chooseTime === '4') {
            this.formData.startTime = row.specifiedStartTime;
            this.formData.endTime = row.specifiedEndTime;
          }
          this.formData.advertisingPicture = row.advertisingPicture;
        });
      }
      this.addDialogVisible = true;
    },
    // 编辑更新操作
    rowUpdate() {
      this.handleAdd();
    },
    // 删除操作
    rowDel(row) {
      this.$confirm('确定删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const query = {
          id: row.id,
        };
        deleteLaunchPageAds(query).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.addDialogVisible = false;
          this.launchPageAdsOnLoad();
        }).catch(() => {
        });
      });
    },

    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },

    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.launchPageAdsOnLoad();
    },

    refreshChange() {
      this.page.currentPage = 1;
      this.launchPageAdsOnLoad();
    },

    // 初始化页面
    launchPageAdsOnLoad() {
      this.pageLoading = true;
      const parmas = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
      };
      getLaunchPageAdsList(parmas).then(
        res => {
          this.launchPageAdsData = res.data.returnObject.list;
          this.pageLoading = false;
        },
        () => {
          this.pageLoading = false;
        }
      ).catch(() => { });
    },
  },
};
</script>
<style lang="scss" scoped>
.laun-picker {
  width: 80%;
}
</style>
