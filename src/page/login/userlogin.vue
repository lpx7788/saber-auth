<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item v-if="tenantModes"
                  prop="tenantId">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.tenantId"
                auto-complete="off"
                :placeholder="$t('login.tenantId')">
        <i slot="prefix"
           class="icon-quanxian" />
      </el-input>
    </el-form-item>
    <el-form-item prop="username">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.username"
                auto-complete="off"
                :placeholder="$t('login.username')">
        <i slot="prefix"
           class="icon-yonghu" />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                :type="passwordType"
                v-model="loginForm.password"
                auto-complete="off"
                :placeholder="$t('login.password')">
        <i :class="
            passwordType
              ? 'el-icon-view el-input__icon'
              : 'icon-yincang el-icon-a el-input__icon'
          "
           slot="suffix"
           @click="showPassword" />
        <i slot="prefix"
           class="icon-mima" />
      </el-input>
    </el-form-item>
    <el-form-item v-if="this.website.captchaMode"
                  prop="code">
      <el-row :span="24">
        <el-col :span="16">
          <el-input size="small"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.code"
                    auto-complete="off"
                    :placeholder="$t('login.code')">
            <i slot="prefix"
               class="icon-yanzhengma" />
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <img :src="loginForm.image"
                 class="login-code-img"
                 @click="refreshCode" />
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleLogin"
                 class="login-submit">{{ $t("login.submit") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex';
import { info } from '@/api/system/tenant';
import { getCaptcha } from '@/api/user';
import { getTopUrl } from '@/util/util';

export default {
  name: 'userlogin',
  data() {
    return {
      tenantModes: this.website.tenantMode,
      loginForm: {
        // 租户ID 默认值 000000
        tenantId: '',
        // 用户名
        username: '',
        // 密码
        password: '',
        // 账号类型
        type: 'account',
        // 验证码的值
        code: '',
        // 验证码的索引
        key: '',
        // 预加载白色背景
        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      },
      loginRules: {
        tenantId: [
          { required: true, message: '请输入租户ID', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 1, message: '密码长度最少为6位', trigger: 'change' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
        ],
      },
      passwordType: 'password',
    };
  },
  created() {
    this.getTenant();
    this.refreshCode();
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['tagWel']),

  },
  props: [],
  methods: {
    refreshCode() {
      // 获取验证码请求
      if (this.website.captchaMode) {
        getCaptcha().then(res => {
          const returnData = res.data;
          this.loginForm.key = returnData.key;
          this.loginForm.image = returnData.image;
        }).catch(() => {
        });
      }
    },
    showPassword() {
      this.passwordType === '' ? this.passwordType = 'password' : this.passwordType = '';
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '登录中,请稍后。。。',
            spinner: 'el-icon-loading',
          });
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.$router.push({ path: this.tagWel.value });
            loading.close();
          }).catch(() => {
            loading.close();
            this.refreshCode();
          });
        }
      });
    },
    getTenant() {
      const domain = getTopUrl();
      // 临时指定域名，方便测试
      info(domain).then(res => {
        const returnData = res.data;
        if (returnData.success && returnData.data.tenantId) {
          this.tenantModes = false;
          this.loginForm.tenantId = returnData.data.tenantId;
          this.$parent.$refs.login.style.backgroundImage = `url(${returnData.data.backgroundUrl})`;
        }
      }).catch(() => {
      });
    },
  },
};
</script>

<style>
</style>
