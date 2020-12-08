<!----按钮组插件---->
<template>
  <el-radio-group @change="handleButtonChange"
                  v-model="currentValue">
    <el-radio-button :label="item.value"
                     v-for="item in groupArr"
                     :key="item.key">{{ item.textName }}</el-radio-button>
  </el-radio-group>
</template>

<script>
export default {
  name: '1',
  props: {
    groupArr: [],
  },
  data() {
    return {
      currentValue: 'today',
    }
  },
  created() {
  },
  methods: {
    handleButtonChange() {
      this.$emit('change', this.currentValue)
    },
    // 初始化
    initialAction() {
      this.currentValue = 'today'
    },
  },
};
</script>
