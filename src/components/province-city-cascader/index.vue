<!--省市组件-->
<template>
  <div class="provinceCity">
    <el-cascader v-model="value"
                 ref="cascader"
                 :options="options"
                 :props="props"
                 :clearable="isClearable"
                 :collapse-tags="isCollapseTags"
                 @change="handleChange"
                 @getCheckedNodes="getCheckedNodes">
    </el-cascader>
  </div>
</template>

<script>
import queryProvinceCityList from '@/api/provinceCity/tree'

export default {
  data() {
    return {
      value: [],
      options: [],
      props: {
        expandTrigger: 'hover',
        label: 'title',
        value: 'id',
        children: 'children',
      },
    }
  },
  props: {
    // 可清空
    isClearable: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'value',
  },
  methods: {
    getCheckedNodes() {
      return this.$refs.cascader.getCheckedNodes()
    },
    init() {
      // 获取省市数据列表
      queryProvinceCityList({}).then(res => {
        this.options = res.data.data
      })
    },
    handleChange(val) {
      this.$emit('input', val)
    },
  },
  mounted() {
    this.init()
  },
}
</script>
