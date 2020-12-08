<template>
  <basic-container>
    <div class="release-page">
      <el-row class="wrapper page">
        <el-col :span="24"
                class="warp-main">
          <div class="el-bar">
            <el-form inline
                     :model="ruleForm"
                     :rules="rules"
                     ref="ruleForm"
                     label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="资讯来源："
                            prop="source">
                <el-select size="small"
                           allow-create
                           clearable
                           filterable
                           maxlength="100"
                           v-model="ruleForm.source"
                           placeholder="请选择或者输入">
                  <el-option v-for="item in informationSource"
                             :key="item"
                             :label="item"
                             :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资讯类型："
                            prop="type"
                            class="release-type">
                <el-select size="small"
                           allow-create
                           clearable
                           filterable
                           maxlength="100"
                           v-model="ruleForm.type"
                           placeholder="请选择">
                  <el-option v-for="item in informationTypesArr"
                             :key="item.key"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属分类："
                            prop="category">
                <el-select size="small"
                           allow-create
                           clearable
                           filterable
                           maxlength="100"
                           v-model="ruleForm.category"
                           placeholder="请选择">
                  <el-option v-for="item in informationClassification"
                             :key="item.key"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <br />
              <el-form-item label="资讯标题："
                            prop="title">
                <el-input type="textarea"
                          class="release-text"
                          v-model="ruleForm.title"
                          placeholder="请输入标题,100字以内"
                          size="small"
                          maxlength="100"></el-input>
              </el-form-item>
              <br />
              <el-form-item label="资讯封面图：">
                <div class="cover-text">(网页端)</div>
                <upload :deleted="delWebImageFile"
                        ref="webImageFile"
                        :change="getCoverImageUpload"
                        :height="100"
                        :width="100" />
              </el-form-item>
              <el-form-item label="资讯封面图：">
                <div class="cover-text">(手机端)</div>
                <upload :deleted="delMobileImageFile"
                        ref="mobileImageFile"
                        :change="getMobileCoverImageUpload"
                        :height="100"
                        :width="100" />
              </el-form-item>
              <br />
              <el-form-item label="资讯附件："
                            class="release-file">
                <el-button type="primary"
                           plain
                           class="inline"
                           @click="$refs.annexesImage.click()">+ 点击上传</el-button>
                <span class="ml20 cover-text">(仅限JPG、PNG、JPEG、PDF、PPT、Excel、Word，最多九个附件)</span>
                <div>
                  <input type="file"
                         id="files"
                         ref="annexesImage"
                         class="none"
                         name="files"
                         accept=".png, .jpg, .jpeg, .pdf, .ppt, .xls, .xlsx, .doc, .docx"
                         placeholder="file"
                         multiple
                         @change="tirggerFile($event)" />
                </div>
                <ul class="upload-list">
                  <li v-for="(file, index) in fileList"
                      :key="file"
                      class="upload-list-li">
                    <a class="upload-list-li-name">
                      <i class="fa fa-file-text-o"
                         aria-hidden="true"></i>
                      {{ file.name }}
                      <el-button v-if="queryId"
                                 size="mini"
                                 @click="deleteFiles(index, file.name)"
                                 type="danger"
                                 icon="el-icon-delete"
                                 circle></el-button>
                      <el-button v-else
                                 size="mini"
                                 @click="deleFile(index)"
                                 type="danger"
                                 icon="el-icon-delete"
                                 circle></el-button>
                    </a>
                  </li>
                </ul>
              </el-form-item>
              <br />
              <el-form-item label="广告资讯：">
                <el-radio v-model="ruleForm.advertisement"
                          label="1">是</el-radio>
                <el-radio v-model="ruleForm.advertisement"
                          label="0">否</el-radio>
              </el-form-item>
              <br />
              <el-form-item label="资讯详情："
                            prop="content">
                <div class="release-detail">
                  <tinymce-text id="tinymce"
                                :height="600"
                                @release="release"
                                ref="tinymce"
                                v-model="ruleForm.content"></tinymce-text>
                </div>
              </el-form-item>
              <br />
              <el-form-item>
                <div v-if="queryId"
                     class="updateBtn">
                  <el-button type="success"
                             icon="el-icon-check"
                             @click="editConsultation">确认修改</el-button>
                  <el-button type="primary"
                             icon="el-icon-edit"
                             @click="cancelEditconsultation">取消修改</el-button>
                </div>
                <div v-else
                     class="releaseBtn">
                  <el-button type="success"
                             icon="el-icon-check"
                             @click="releaseConsultation('1')">确认发布</el-button>
                  <el-button type="primary"
                             icon="el-icon-edit"
                             @click="releaseConsultation('0')">保存草稿</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </basic-container>
</template>
<script>
import TinymceText from '@/components/tinymce/main';
import { dateFormat } from '@/util/date'
import upload from '@/components/upload';
import { getCategoryArr } from '@/api/information';
import {
  releaseInformation,
  getInformationDetail,
  editInformation,
  deleteAttachmentFile,
} from '@/api/information/release';

export default {
  components: {
    'tinymce-text': TinymceText,
    upload,
  },
  props: {
    queryId: {
      type: String,
    },
  },
  data() {
    return {
      fileList: [], // 网页端资讯封面图片
      coverImageUrl: null, // 手机端资讯封面图片
      informationSource: [], // 资讯来源下拉选择框数组
      informationTypesArr: [
        {
          key: '1',
          value: '1',
          label: '要闻',
        },
        {
          key: '2',
          value: '2',
          label: '关注',
        },
        {
          key: '3',
          value: '3',
          label: '快讯',
        },
        {
          key: '4',
          value: '4',
          label: '精选',
        },
      ], // 资讯类型下拉选择框数组
      informationClassification: [
        {
          key: '1',
          value: '1',
          label: '有色',
        },
        {
          key: '2',
          value: '2',
          label: '黑色',
        },
        {
          key: '3',
          value: '3',
          label: '化工',
        },
        {
          key: '4',
          value: '4',
          label: '农产品',
        },
        {
          key: '5',
          value: '5',
          label: '其他',
        },
      ], // 资讯分类下拉选择框数组
      ruleForm: {
        title: '',
        type: '1',
        category: '1',
        coverImage: '', // 封面图片
        mobileCoverImage: '',
        content: '', // 资讯内容
        advertisement: '0', // 是否广告
      },
      rules: {
        title: [
          { required: true, message: '请输入标题,100字以内', trigger: 'blur' },
          { max: 100, message: '长度在100个字符以内', trigger: 'blur' },
        ],
        type: [{ required: true, message: '请选择资讯类型', trigger: 'blur' }],
        category: [
          { required: true, message: '请选择资讯分类', trigger: 'blur' },
        ],
        source: [
          { required: true, message: '请输入资讯来源', trigger: 'change' },
        ],
        content: [
          { required: true, message: '请输入资讯内容', trigger: 'blur' },
        ],
      },
      // 旧的资讯内容
      oldIndustryData: {
        title: '',
        source: '',
      },
      // 输入框的文本,标题和资讯来源
      zixunContent: `<head><title>#title#</title></head> <h1 style="text-align: center;"><span style="font-family: 宋体;">#title#</span></h1><div style="color: #999; padding-bottom: 8px; border-bottom: 1px dashed #d3d3d3;"> 
                    <p class="date-source" style="text-align: center;" data-sudaclick="share_1-0"><span style="font-family: 宋体; ont-size: 16px;"><span class="date">#time#</span>&nbsp;#source#</span></p></div>`,
    };
  },
  created() {
    // 获取资讯来源
    this.getIndustryCategory();
    // 获取详情信息
    if (this.queryId) {
      this.getDetail()
    }
  },

  methods: {
    // 获取发布详情
    getDetail() {
      const parmas = {
        industryId: this.queryId,
      };
      getInformationDetail(parmas).then(res => {
        this.ruleForm.content = res.data.returnObject.content;
        this.ruleForm = res.data.returnObject;
        this.ruleForm.coverImage = res.data.returnObject.coverPicUrl; // web端资讯
        this.ruleForm.mobileCoverImage =
          res.data.returnObject.mobileCoverPicUrl; // 手机端资讯
        this.fileList = res.data.returnObject.attachmentUrlList; // 资讯附件
        this.$refs.mobileImageFile.setFile(
          res.data.returnObject.mobileCoverPicUrl
        );
        this.$refs.webImageFile.setFile(res.data.returnObject.coverPicUrl);
        // 保存旧的资讯内容
        this.oldIndustryData.title = this.ruleForm.title;
        this.oldIndustryData.source = this.ruleForm.source;
      }).catch(() => { });
    },
    // 获取资讯来源
    getIndustryCategory() {
      getCategoryArr().then(res => {
        this.informationSource = res.data.returnObject;
      }).catch(() => { });
    },
    // 删除网页端资讯封面图片
    delWebImageFile() {
      this.ruleForm.coverImage = '';
    },
    // 删除手机端资讯封面图片
    delMobileImageFile() {
      this.ruleForm.mobileCoverImage = '';
    },
    // 上传网页端资讯封面图片
    async getCoverImageUpload(e) {
      this.ruleForm.coverImage = e;
    },
    // 上传手机端资讯封面图片
    async getMobileCoverImageUpload(e) {
      this.ruleForm.mobileCoverImage = e;
    },
    // 资讯附件
    async getAnnexesImageUpload(e) {
      const file = e.target.files[0];
      this.ruleForm.annexesImage = file;
    },
    // 确认发布
    releaseConsultation(displayNum) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$confirm(displayNum === '1' ? '确定发布?' : '保存草稿', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            // 资讯内容加上标题
            const nowDate = dateFormat(new Date(), 'yyyy-MM-dd hh:mm');
            const contentHeader = this.zixunContent
              .replace('#title#', this.ruleForm.title)
              .replace('#title#', this.ruleForm.title)
              .replace('#source#', this.ruleForm.source)
              .replace('#time#', nowDate);
            // 校验通过
            const releaseFormData = new FormData();
            this.contentHandler(releaseFormData);
            const contentStr = `${contentHeader}${this.ruleForm.content}`;
            releaseFormData.append('content', contentStr);
            releaseFormData.append('display', displayNum);

            // 手机端和网页端的封面图片必须同时有
            if (
              this.ruleForm.coverImage !== '' &&
              this.ruleForm.mobileCoverImage === ''
            ) {
              this.$message({
                showClose: true,
                message: '手机端封面图片不能为空',
                type: 'warning',
              });
              return false;
            }
            if (
              this.ruleForm.coverImage === '' &&
              this.ruleForm.mobileCoverImage !== ''
            ) {
              this.$message({
                showClose: true,
                message: '网页端封面图片不能为空',
                type: 'warning',
              });
              return false;
            }

            // 手机端资讯封面图片
            releaseFormData.append(
              'coverImage',
              this.ruleForm.coverImage ? this.ruleForm.coverImage : ''
            );
            releaseFormData.append(
              'mobileCoverImage',
              this.ruleForm.mobileCoverImage
                ? this.ruleForm.mobileCoverImage
                : ''
            );

            releaseInformation(releaseFormData).then(() => {
              this.$message({
                type: 'success',
                message: '操作成功!',
              });
              this.$router.push({
                path: './index',
              });
            }).catch(() => { });
          });
        }
      });
    },

    contentHandler(releaseFormData) {
      releaseFormData.append('title', this.ruleForm.title);
      releaseFormData.append('type', this.ruleForm.type);
      releaseFormData.append('category', this.ruleForm.category);
      releaseFormData.append('source', this.ruleForm.source);
      releaseFormData.append('advertisement', this.ruleForm.advertisement);
      for (let i = 0; i < this.fileList.length; i++) {
        if (i <= 8) {
          releaseFormData.append('file', this.fileList[i]);
        }
      }
    },
    // 确认修改
    editConsultation() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$confirm('确定修改?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              // 校验通过
              const releaseFormData = new FormData();
              releaseFormData.append('industryId', this.queryId);
              this.contentHandler(releaseFormData);
              let content_str = this.ruleForm.content;
              // 修改 加上头部标题
              content_str = `<head><title>${this.ruleForm.title}</title></head>${this.ruleForm.content}`
              releaseFormData.append('content', content_str);
              // 网页端资讯封面图片
              releaseFormData.append(
                'coverImage',
                this.ruleForm.coverImage ? this.ruleForm.coverImage : ''
              );
              // 手机端资讯封面图片
              releaseFormData.append(
                'mobileCoverImage',
                this.ruleForm.mobileCoverImage
                  ? this.ruleForm.mobileCoverImage
                  : ''
              );
              editInformation(releaseFormData).then(() => {
                this.$message({
                  type: 'success',
                  message: '操作成功!',
                });
                this.$router.push({
                  path: './index',
                });
              }
              ).catch(
                () => {
                });
            })
            .catch(() => { });
        }
      });
    },
    // 取消修改
    cancelEditconsultation() {
      this.$router.push({
        path: './index',
      });
    },
    // 资讯附件处理
    tirggerFile(event) {
      const _this = this;
      const list = event.target.files;
      for (var i = 0; i < list.length; i++) {
        if (_this.fileList.length >= 9) {
          this.$notify.warning('最多只能上传9个附件');
          return false;
        } else {
          // 最大10M
          if (list[i].size > 10 * 1024 * 1024) {
            this.$notify.warning('附件不能大于10M');
            return false;
          } else {
            // 判断文件是否重复
            for (let j = 0; j < this.fileList.length; j++) {
              if (list[i].name === this.fileList[j].name) {
                return false;
              }
            }
            _this.fileList.push(list[i]);
          }
        }
      }
    },
    // 删除资讯附件
    deleFile(i) {
      this.fileList.splice(i, 1);
    },
    deleteFiles(i, name) {
      this.$confirm('确定删除该附件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.fileList.splice(i, 1);
          const param = {
            industryId: this.queryId,
            fileName: name,
          };
          deleteAttachmentFile(param).then(() => {
            this.$notify.success('删除附件成功');
          }).catch(() => { });
        })
        .catch(() => { });
    },
  },
};
</script>
<style lang="scss">
.release-page {
  .release-type {
    margin-bottom: 22px;
  }
  .release-text {
    width: 450px;
  }
  .release-detail {
    width: 1000px;
  }
  .release-file {
    width: 100%;
  }
  .cover-text {
    font-size: 12px;
    color: #9d9fa2;
  }
  .releaseBtn,
  .updateBtn {
    margin-left: 100px;
  }
  .file-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    outline: none;
    background-color: transparent;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
  }
}
</style>
