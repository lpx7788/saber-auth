<!----日期选择插件---->
<template>
  <div class="datePicker">
    <el-date-picker class="d-picker"
                    @change="handleDataChange"
                    v-model="defaultTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="timePickerOptions"
                    :value-format="formatType"></el-date-picker>
  </div>
</template>
<script>
export default {
  name: 'datePicker',
  props: {
    formatType: {
      default: 'timestamp', // 返回时间格式
    },
    defaultTime: {
      default: '', // 初始日期
    },
  },
  data() {
    return {
      timePickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()]);
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
    };
  },
  created() { },
  methods: {
    // 获取当前时间
    handleDataChange(val) {
      this.$emit('input', val);
    },
    // 初始化
    initialAction() {
      this.defultData = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.datePicker {
  display: inline-flex !important;
}
</style>
