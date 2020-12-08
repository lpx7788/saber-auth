<template>
  <div class="login-container"
       ref="login"
       @keyup.enter.native="handleLogin">
    <top-color v-show="false" />
    <div class="login-weaper animated bounceInDown">
      <div class="login-left">
        <div class="login-time">
          {{time}}
        </div>
        <div class="login-svg">
          <svg width="140"
               height="140"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 200 200"
               xml:space="preserve"
               style="enable-background:new 0 0 35 25;fill: #fff;"
               version="1.1"
               class="logo">
            <g>
              <title>background</title>
              <rect fill="none"
                    id="canvas_background"
                    height="202"
                    width="202"
                    y="-1"
                    x="-1" />
            </g>
            <g>
              <title>Layer 1</title>
              <g stroke="null"
                 id="svg_1">
                <path stroke="null"
                      id="svg_2"
                      fill="#4d65fd;"
                      d="m59.055676,92.549558c13.156065,
                      3.374726 23.223038,3.972342 34.315303,
                      2.882586c14.760308,-3.480181 19.320975,
                      -17.225154 19.320975,-29.036682c0,
                      -19.404656 -9.798729,-36.887454 -28.336146,
                      -47.246126l-0.000001,0c-16.168077,
                      -14.15388 -125.814701,-23.66219 -47.564251,
                      -20.248337l-0.300202,0.998545l-0.711802,
                      -0.998545l-0.300201,0.332843l-0.711811,
                      -0.332843l0.300201,0l-1.312205,0l0,0l-1.012004,
                      0l0,0l-1.012008,0l0.300201,
                      0l-1.312204,0l0,0l-1.012004,0l0,0.332849l-1.012008,
                      -0.332849l0,0l-1.012004,0l0,0l-1.012004,
                      0l0,0l-1.012008,0l0,0l-1.012003,0l0,0l-1.012004,
                      0l0.512639,0l-1.524643,0l0,0l-1.012008,0l0,0l-1.012003,
                      0l0,0l-1.012004,0l0,0l-1.012008,0l0,0l-1.012004,0l0,
                      0l-1.012003,0l0,0l-1.012008,0l0,0l-1.012004,0l0,
                      0l-1.012004,0l0,0l-1.012012,0l0,0l-1.012004,0l0,
                      0l-1.012008,0c-5.060023,12.65521 -8.096038,26.154107 -8.096038,
                      39.652994l0,0.843686l0,0l0,0.843672l0,0l0,0.843686l0,0l0,0.843681l0,
                      0l0,0.843677l0,0l0,0.843686l0,0l0,0.843681l0,0l0,0.843676c0,0 0,0 0,
                      0.843682c0,0 0,0 0,0.843686c0,0 0,0 0,0.843676l0,0.843682c0,0 0,0 0,
                      0.843681c0,0 0,0 0,0.843677c0,0 0,0 0,0.843686l0,0l0,0.843681l0,0c0,
                      0 0,0 0,0.843676l0,0c0,0.843682 0,1.687368 0,
                      1.687368l0,0l0,0.843676l0,0c0,
                      0.843682 0,0.843682 0,1.687363l0,0l0,0.843676l0,
                      0c0,0.843686 0,1.687367 1.012003,
                      2.531043l0,0c5.805846,43.980002 42.504225,
                      71.712866 86.020453,86.055438c-27.324138,
                      -17.717293 -47.564247,-43.027719 -53.636278,
                      -72.556541c0,-1.687368 0,-3.374726 0,-5.062088c0,
                      -15.186254 14.168069,-26.997784 32.384166,
                      -26.997784s32.38417,11.811529 32.38417,26.997784c-3.455789,
                      21.601739 -24.288128,22.779381 -41.492212,23.623058z"
                      class="st0" />
                <path stroke="null"
                      id="svg_3"
                      d="m184.005227,17.029018l0,0l0,0l0,0c5.060027,
                      1.84661 10.120053,2.769915 16.192085,
                      2.769915c1.012005,0 2.024011,0 3.036016,
                      0l0,0c-5.060027,0 -9.108048,-4.616525 -9.108048,
                      -9.23305l0,-0.923305l0,0l0,-0.923305c0,
                      -4.616525 -4.048021,-8.309745 -9.108048,
                      -8.309745l0,0l0,0l0,0c-1.012005,0 -1.012005,
                      0 -1.012005,0c-22.264117,1.84661 -40.480213,
                      19.389404 -40.480213,40.625418c0,3.69322 1.012005,
                      8.309745 2.024011,12.002965c1.012005,1.84661 1.012005,
                      3.69322 3.036016,6.463135c5.060027,10.156355 8.096043,
                      21.236014 8.096043,33.238979c0,41.548723 -36.432192,
                      74.787702 -81.972431,74.787702c-31.372165,0 -58.696309,
                      -16.619489 -72.864383,-39.702114c6.072032,
                      41.548723 45.540239,72.941092 93.104489,
                      72.941092c51.612271,0 94.116495,-38.778809 94.116495,
                      -85.867362c0,-22.159319 -9.108048,-41.548723 -23.276122,
                      -56.321603l0,0c-4.048021,-4.616525 -6.072032,-10.156355 -6.072032,
                      -15.696184c-2.024011,-14.772879 10.120053,-25.852539 24.288128,-25.852539z"
                      class="st1" />
              </g>
            </g>
          </svg>
        </div>
        <p class="title">{{ $t('login.info') }}</p>
      </div>
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title">
            用户登录
          </h4>
          <userLogin v-if="activeName==='user'"></userLogin>
          <codeLogin v-else-if="activeName==='code'"></codeLogin>
          <thirdLogin v-else-if="activeName==='third'"></thirdLogin>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userLogin from './userlogin';
import codeLogin from './codelogin';
import thirdLogin from './thirdlogin';
import { mapGetters } from 'vuex';
import { dateFormat } from '@/util/date';
import { validatenull } from '@/util/validate';
import topColor from '@/page/index/top/top-color';
import { getQueryString, getTopUrl } from '@/util/util';

export default {
  name: 'login',
  components: {
    userLogin,
    codeLogin,
    thirdLogin,
    topColor,
  },
  data() {
    return {
      time: '',
      activeName: 'user',
      socialForm: {
        tenantId: '000000',
        source: '',
        code: '',
        state: '',
      },
    };
  },
  watch: {
    $route() {
      this.handleLogin();
    },
  },
  created() {
    this.handleLogin();
    this.getTime();
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['website', 'tagWel']),
  },
  props: [],
  methods: {
    getTime() {
      setInterval(() => {
        this.time = dateFormat(new Date());
      }, 1000);
    },
    handleLogin() {
      const topUrl = getTopUrl();
      const redirectUrl = '/oauth/redirect/';
      if (topUrl.includes(redirectUrl)) {
        let source = topUrl.split('?')[0];
        source = source.split(redirectUrl)[1];
        this.socialForm.source = source;
        this.socialForm.code = getQueryString('code');
        this.socialForm.state = getQueryString('state');
      }
      if (!validatenull(this.socialForm.source)
        && !validatenull(this.socialForm.code)
        && !validatenull(this.socialForm.state)) {
        const loading = this.$loading({
          lock: true,
          text: '第三方系统登录中,请稍后。。。',
          spinner: 'el-icon-loading',
        });
        this.$store.dispatch('LoginBySocial', this.socialForm).then(() => {
          window.location.href = topUrl.split(redirectUrl)[0];
          this.$router.push({ path: this.tagWel.value });
          loading.close();
        }).catch(() => {
          loading.close();
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/login.scss";
.logo-svg {
  width: 140px;
  height: 140px;
}
</style>
