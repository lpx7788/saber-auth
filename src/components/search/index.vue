<template>
  <div class="search">
    <el-input v-model="value1"
              :placeholder="placeholder"
              @change="handleChange"
              clearable></el-input>
    <el-button type="primary"
               icon="el-icon-search"
               @click="search">搜索</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    }
  },
  props: {
    value1: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  model: {
    prop: 'value',
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val)
    },
    search() {
      this.$emit('input', this.value)
    },
  },
  mounted() {

  },
}
</script>

<style lang="scss" scoped>
.search {
  display: inline-flex;
  align-items: flex-start;
  margin-right: 10px;
  width: 400px;
}
.el-input {
  margin-right: 10px;
}
</style>
