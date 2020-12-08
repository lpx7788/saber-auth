<template>
  <div class="user-info-page">
    <basic-container>
      <avue-tabs :option="option"
                 v-model="form"
                 @change="handleChange"> </avue-tabs>
      <div v-if="curTab.prop==='info'"
           class="mt15">
        <avue-form ref="drawerForm"
                   :option="infoOption"
                   v-model="infoForm"
                   @submit="infoSubmit">
          <template slot="avatar"
                    slot-scope="{}">
            <upload :clearable="true"
                    ref="startImageFile"
                    :deleted="delImageFile"
                    :change="changeImage"
                    :height="150"
                    :width="150"
                    :isTip="true" />
          </template>
        </avue-form>
      </div>
      <div v-if="curTab.prop==='password'"
           class="mt15">
        <avue-form :option="passwordOption"
                   v-model="passwordForm"
                   @submit="passwordSubmit"></avue-form>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getUserInfo, updateInfo, updatePassword } from '@/api/system/user';
import md5 from 'js-md5';
import upload from '@/components/upload';
export default {
  components: {
    upload,
  },
  data() {
    return {
      prop: 'info',
      imgUrl: '',
      option: {
        column: [{
          label: '个人信息',
          prop: 'info',
        }, {
          label: '修改密码',
          prop: 'password',
        }],
      },
      passwordOption: {
        submitText: '修改',
        column: [{
          label: '原密码',
          span: 12,
          row: true,
          type: 'password',
          prop: 'oldPassword',
          rules: [{
            required: true,
            message: '请输入原密码',
            trigger: 'change',
          }],
        }, {
          label: '新密码',
          span: 12,
          row: true,
          type: 'password',
          prop: 'newPassword',
          rules: [{
            required: true,
            message: '请输入新密码',
            trigger: 'change',
          }],
        }, {
          label: '确认密码',
          span: 12,
          row: true,
          type: 'password',
          prop: 'newPassword1',
          rules: [{
            required: true,
            message: '请确认密码',
            trigger: 'change',
          }],
        }],
      },
      infoOption: {
        submitText: '修改',
        column: [
          {
            label: '头像',
            prop: 'avatar',
            formslot: true,
            row: true,
          },
          {
            label: '姓名',
            span: 12,
            row: true,
            prop: 'name',
          }, {
            label: '用户名',
            span: 12,
            row: true,
            prop: 'realName',
          }, {
            label: '手机号',
            span: 12,
            row: true,
            prop: 'phone',
          }, {
            label: '邮箱',
            prop: 'email',
            span: 12,
            row: true,
          }],
      },

      form: {},
      infoForm: {},
      passwordForm: {},
      curTab: {},
    };
  },
  created() {
    this.handleWitch();
    this.curTab = this.option.column[0]
  },
  methods: {
    delImageFile(){
      this.infoForm.avatar = '';
    },
    changeImage(val, url) {
      this.infoForm.avatar = url
    },
    infoSubmit(form, done) {
      updateInfo(this.infoForm).then(res => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '修改信息成功!',
          });
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg,
          });
        }
        done()
      }).catch(() => { })
    },
    passwordSubmit(form, done) {
      updatePassword(md5(this.passwordForm.oldPassword), md5(this.passwordForm.newPassword), md5(this.passwordForm.newPassword1)).then(res => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '修改密码成功!',
          });
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg,
          });
        }
        done();
      }).catch(() => { })
    },
    handleWitch() {
      if (this.prop === 'info') {
        getUserInfo().then(res => {
          const user = res.data.data;
          let avatar =user.avatar;
           avatar=avatar.replace(/amp;/g,'');
          this.$refs.startImageFile.setFile(avatar);
          this.infoForm = {
            id: user.id,
            avatar: avatar,
            name: user.name,
            realName: user.realName,
            phone: user.phone,
            email: user.email,
          }
        }).catch(() => { });
      }
    },
    handleChange(item) {
      this.curTab = item
      this.prop = item.prop;
      this.handleWitch();
    },
  },
};
</script>

<style lang="scss">
.user-info-page {
  .el-collapse-item:last-child {
    margin-top: 5px;
  }
}
</style>
