<template>
  <div class="social-container">
    <div @click="handleClick('github')">
      <span class="container bgc1">
        <i icon-class="github"
           class="iconfont icongithub"></i>
      </span>
      <p class="title">{{$t('login.github')}}</p>
    </div>
    <div @click="handleClick('gitee')">
      <span class="container bgc2">
        <i icon-class="gitee"
           class="iconfont icongitee2"></i>
      </span>
      <p class="title">{{$t('login.gitee')}}</p>
    </div>
    <div @click="handleClick('wechat_open')">
      <span class="container bgc3">
        <i icon-class="wechat"
           class="iconfont icon-weixin" />
      </span>
      <p class="title">{{$t('login.wechat')}}</p>
    </div>
    <div @click="handleClick('qq')">
      <span class="container bgc4">
        <i icon-class="qq"
           class="iconfont icon-qq" />
      </span>
      <p class="title">{{$t('login.qq')}}</p>
    </div>
  </div>
</template>

<script>
import website from '@/config/website';

export default {
  name: 'thirdLogin',
  methods: {
    handleClick(source) {
      window.location.href = `${website.authUrl}/${source}`;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.social-container {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .bgc1 {
    background: #61676d;
  }
  .bgc2 {
    background: #c35152;
  }
  .bgc3 {
    background: #8dc349;
  }
  .bgc4 {
    background: #6ba2d6;
  }
  .iconfont {
    color: #fff;
    font-size: 30px;
  }
  .container {
    $height: 50px;
    cursor: pointer;
    display: inline-block;
    width: $height;
    height: $height;
    line-height: $height;
    text-align: center;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .title {
    text-align: center;
  }
}
</style>
